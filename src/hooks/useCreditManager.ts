import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useCreditManager = () => {
  const { user } = useAuth();
  const { profile } = useUserData();
  const [isDeducting, setIsDeducting] = useState(false);

  const checkCredits = (requiredCredits: number): boolean => {
    const currentCredits = profile?.credits_remaining || 0;
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
      // Update credits in profiles table
      const newCredits = (profile.credits_remaining || 0) - creditsToDeduct;
      const newTasksCount = (profile.tasks_this_month || 0) + 1;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          credits_remaining: newCredits,
          tasks_this_month: newTasksCount,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (profileError) {
        console.error("Error updating profile:", profileError);
        toast.error("Failed to deduct credits");
        return false;
      }

      // Update credits in user_credits table
      const { error: creditsError } = await supabase
        .from("user_credits")
        .update({
          credits_remaining: newCredits,
          last_updated: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (creditsError) {
        console.error("Error updating user credits:", creditsError);
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
        console.error("Error logging activity:", activityError);
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
      console.error("Error in credit deduction:", error);
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
    currentCredits: profile?.credits_remaining || 0,
  };
};
