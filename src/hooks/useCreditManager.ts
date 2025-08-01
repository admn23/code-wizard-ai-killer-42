import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

// Enhanced utility function to safely log errors
const logError = (context: string, error: any) => {
  console.log("💳 CREDIT MANAGER - Logging error:", context);

  try {
    if (error && typeof error === "object") {
      // Extract all possible error properties
      const errorDetails = {
        message: error.message || "No message provided",
        code: error.code || "No error code",
        details: error.details || "No additional details",
        hint: error.hint || "No hint provided",
        status: error.status || error.statusCode || "No status code",
        name: error.name || "Unknown error type",
      };

      console.error("🚨 CREDIT ERROR:", context);
      console.error("📋 Error Details:", errorDetails);

      // Also log the raw error for debugging
      console.error("🔍 Raw Error Object:", error);

      // Try to stringify it safely
      try {
        const serialized = JSON.stringify(
          error,
          Object.getOwnPropertyNames(error),
          2,
        );
        console.error("📄 Serialized Error:", serialized);
      } catch (e) {
        console.error("❌ Cannot serialize error object");
      }
    } else {
      console.error(
        "🚨 CREDIT ERROR:",
        context,
        "Non-object error:",
        String(error),
      );
    }
  } catch (logErr) {
    console.error(
      "🚨 CREDIT ERROR:",
      context,
      "Critical: Error logging completely failed",
    );
    console.error("Original error (forced string):", String(error));
    console.error("Logging failure:", String(logErr));
  }
};

// Local storage key for credits
const CREDITS_STORAGE_KEY = "coding_killer_credits";

// Get credits from localStorage
const getLocalCredits = (userId: string): number => {
  try {
    const stored = localStorage.getItem(`${CREDITS_STORAGE_KEY}_${userId}`);
    return stored ? parseInt(stored, 10) : 5; // Default 5 credits
  } catch {
    return 5;
  }
};

// Set credits in localStorage
const setLocalCredits = (userId: string, credits: number): void => {
  try {
    localStorage.setItem(
      `${CREDITS_STORAGE_KEY}_${userId}`,
      credits.toString(),
    );
  } catch (error) {
    console.warn("Could not save credits to localStorage:", error);
  }
};

export const useCreditManager = () => {
  const { user } = useAuth();
  const { profile } = useUserData();
  const [isDeducting, setIsDeducting] = useState(false);
  const [localCredits, setLocalCreditsState] = useState<number | null>(null);

  // Initialize local credits when user changes
  React.useEffect(() => {
    if (user) {
      const credits = getLocalCredits(user.id);
      setLocalCreditsState(credits);
    } else {
      setLocalCreditsState(null);
    }
  }, [user]);

  const checkCredits = (requiredCredits: number): boolean => {
    // Use database credits if available, otherwise use local credits
    const currentCredits = profile?.credits_remaining ?? localCredits ?? 0;
    return currentCredits >= requiredCredits;
  };

  const deductCredits = async (
    toolName: string,
    creditsToDeduct: number,
    inputData?: string,
    outputData?: string,
  ): Promise<boolean> => {
    if (!user || !profile) {
      toast.error("Please log in to use this tool");
      return false;
    }

    if (!checkCredits(creditsToDeduct)) {
      toast.error(
        `Insufficient credits! You need ${creditsToDeduct} credits but only have ${profile.credits_remaining || 0}`,
      );
      return false;
    }

    setIsDeducting(true);

    try {
      // Calculate new credits - use profile credits if available, otherwise local credits
      const currentCredits = profile?.credits_remaining ?? localCredits ?? 0;
      const newCredits = currentCredits - creditsToDeduct;
      const newTasksCount = (profile?.tasks_this_month || 0) + 1;

      // Always update local credits as a fallback
      if (user) {
        setLocalCredits(user.id, newCredits);
        setLocalCreditsState(newCredits);
      }

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          credits_remaining: newCredits,
          tasks_this_month: newTasksCount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        if (profileError.code === "42501") {
          console.log(
            "Permission denied for profile update - credits may not be synced with database",
          );
          toast.warning("Credits deducted locally - may not sync with server");
          // Continue with local credit tracking
        } else {
          logError("Error updating profile:", profileError);
          toast.error("Failed to deduct credits");
          return false;
        }
      }

      // Update or create credits in user_credits table
      const { data: existingCredits } = await supabase
        .from("user_credits")
        .select("id")
        .eq("user_id", user.id)
        .single();

      if (existingCredits) {
        const { error: creditsError } = await supabase
          .from("user_credits")
          .update({
            credits_remaining: newCredits,
            last_updated: new Date().toISOString(),
          })
          .eq("user_id", user.id);

        if (creditsError) {
          if (creditsError.code === "42501") {
            console.log(
              "Permission denied for user_credits update - this is expected",
            );
          } else {
            logError("Error updating user credits:", creditsError);
          }
        }
      } else {
        // Create new user_credits entry
        const { error: createCreditsError } = await supabase
          .from("user_credits")
          .insert({
            user_id: user.id,
            credits_remaining: newCredits,
            plan_type: profile.plan_type || "Free",
            last_updated: new Date().toISOString(),
          });

        if (createCreditsError) {
          if (createCreditsError.code === "42501") {
            console.log(
              "Permission denied for creating user_credits - this is expected",
            );
          } else {
            logError("Error creating user credits:", createCreditsError);
          }
        }
      }

      // Log activity
      const { error: activityError } = await supabase
        .from("user_activities")
        .insert({
          user_id: user.id,
          tool_name: toolName,
          credits_used: creditsToDeduct,
          input_data: inputData,
          output_data: outputData,
        });

      if (activityError) {
        if (activityError.code === "42501") {
          console.log(
            "Permission denied for logging activity - this is expected",
          );
        } else {
          logError("Error logging activity:", activityError);
        }
      }

      toast.success(`${creditsToDeduct} credits deducted successfully`);

      // Trigger a custom event for real-time UI updates
      window.dispatchEvent(
        new CustomEvent("creditsUpdated", {
          detail: { newCredits, toolName, creditsUsed: creditsToDeduct },
        }),
      );

      return true;
    } catch (error) {
      logError("Error in credit deduction:", error);
      toast.error("Failed to deduct credits");
      return false;
    } finally {
      setIsDeducting(false);
    }
  };

  return {
    checkCredits,
    deductCredits,
    isDeducting,
    currentCredits: profile?.credits_remaining ?? localCredits ?? 0,
  };
};
