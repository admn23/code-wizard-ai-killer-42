import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  id: string;
  full_name: string | null;
  email: string | null;
  plan_type: string | null;
  credits_remaining: number | null;
  tasks_this_month: number | null;
  created_at: string;
  updated_at: string;
}

interface UserActivity {
  id: string;
  tool_name: string;
  input_data: string | null;
  output_data: string | null;
  credits_used: number | null;
  created_at: string;
}

// Utility function to safely log errors
const logError = (context: string, error: any) => {
  console.log("🔍 DEBUG - logError called with:", context, typeof error, error);

  try {
    if (error && typeof error === "object") {
      // Create a safe serializable object
      const safeError: any = {};

      // Copy basic properties
      if (error.message) safeError.message = error.message;
      if (error.code) safeError.code = error.code;
      if (error.details) safeError.details = error.details;
      if (error.hint) safeError.hint = error.hint;
      if (error.statusCode) safeError.statusCode = error.statusCode;
      if (error.status) safeError.status = error.status;

      // Get all enumerable properties
      Object.keys(error).forEach((key) => {
        try {
          const value = error[key];
          if (
            value !== undefined &&
            value !== null &&
            typeof value !== "function"
          ) {
            safeError[key] = value;
          }
        } catch (e) {
          safeError[key] = `[Error accessing property: ${e}]`;
        }
      });

      // Get non-enumerable properties
      Object.getOwnPropertyNames(error).forEach((key) => {
        try {
          if (!safeError.hasOwnProperty(key)) {
            const value = error[key];
            if (
              value !== undefined &&
              value !== null &&
              typeof value !== "function"
            ) {
              safeError[key] = value;
            }
          }
        } catch (e) {
          safeError[key] = `[Error accessing property: ${e}]`;
        }
      });

      console.error("🚨", context);
      console.error("   📝 Error Message:", safeError.message || "No message");
      console.error("   🔢 Error Code:", safeError.code || "No code");
      console.error("   📋 Details:", safeError.details || "No details");
      console.error("   💡 Hint:", safeError.hint || "No hint");
      console.error(
        "   🌐 Status:",
        safeError.status || safeError.statusCode || "No status",
      );
      console.error("   📦 Full Error Object:", safeError);

      // Try different serialization methods
      try {
        console.error(
          "   🔧 JSON Serialized:",
          JSON.stringify(safeError, null, 2),
        );
      } catch (e) {
        console.error("   ❌ JSON serialization failed:", e);
        console.error("   📄 toString():", error.toString());
      }
    } else {
      console.error("🚨", context, "Non-object error:", String(error));
    }
  } catch (logErr) {
    console.error("🚨", context, "CRITICAL: Error logging failed completely");
    console.error("   Original error (string):", String(error));
    console.error("   Logging error:", String(logErr));

    // Last resort - try to get some information
    try {
      console.error("   Error constructor:", error?.constructor?.name);
      console.error("   Error keys:", Object.keys(error || {}));
    } catch (e) {
      console.error("   Cannot access error properties at all");
    }
  }
};

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!user) {
      console.log("Refetch called but no user logged in");
      return;
    }

    console.log("Refetching user data for user:", user.id);
    setLoading(true);

    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        if (profileError.code === "PGRST116") {
          console.log(
            "No profile found for user during refetch, setting to null",
          );
          setProfile(null);
        } else {
          logError("Error fetching profile (refetch):", profileError);
          setProfile(null);
        }
      } else if (profileData) {
        console.log("Profile fetched successfully:", profileData);
        setProfile(profileData);
      }

      // Fetch recent activities
      const { data: activitiesData, error: activitiesError } = await supabase
        .from("user_activities")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (activitiesError) {
        logError("Error fetching activities (refetch):", activitiesError);
        setActivities([]);
      } else {
        console.log(
          "Activities fetched successfully:",
          activitiesData?.length || 0,
          "records",
        );
        setActivities(activitiesData || []);
      }
    } catch (error) {
      logError("Error refetching user data:", error);
      setProfile(null);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("No user logged in, resetting state");
      setProfile(null);
      setActivities([]);
      setLoading(false);
      return;
    }

    console.log("User logged in, fetching data for:", user.id, user.email);

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        console.log("Fetching profile for user:", user.id);
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          if (profileError.code === "PGRST116") {
            console.log("No profile found, attempting to create one");
            // Create a basic profile for the user
            const { data: newProfile, error: createError } = await supabase
              .from("profiles")
              .insert({
                id: user.id,
                email: user.email,
                full_name: user.user_metadata?.full_name || null,
                plan_type: "Free",
                credits_remaining: 5,
                tasks_this_month: 0,
              })
              .select()
              .single();

            if (createError) {
              logError("Error creating profile:", createError);
              setProfile(null);
            } else {
              console.log("Profile created successfully:", newProfile);
              setProfile(newProfile);
            }
          } else {
            logError("Error fetching profile:", profileError);
            setProfile(null);
          }
        } else if (profileData) {
          console.log("Profile found:", profileData);
          setProfile(profileData);
        }

        // Fetch recent activities
        console.log("Fetching activities for user:", user.id);
        const { data: activitiesData, error: activitiesError } = await supabase
          .from("user_activities")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(10);

        if (activitiesError) {
          logError("Error fetching activities:", activitiesError);
          setActivities([]);
        } else {
          console.log(
            "Activities found:",
            activitiesData?.length || 0,
            "records",
          );
          setActivities(activitiesData || []);
        }
      } catch (error) {
        logError("Error fetching user data:", error);
        setProfile(null);
        setActivities([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();

    // Set up real-time subscription for profile changes
    const profileChannel = supabase
      .channel("profile-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${user.id}`,
        },
        (payload) => {
          console.log("Profile updated via realtime:", payload);
          if (payload.eventType === "UPDATE" && payload.new) {
            setProfile(payload.new as UserProfile);
          }
        },
      )
      .subscribe();

    // Set up real-time subscription for activities
    const activitiesChannel = supabase
      .channel("activities-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "user_activities",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log("New activity via realtime:", payload);
          if (payload.new) {
            setActivities((prev) => [
              payload.new as UserActivity,
              ...prev.slice(0, 9),
            ]);
          }
        },
      )
      .subscribe();

    return () => {
      console.log("Cleaning up realtime subscriptions");
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, [user]);

  return { profile, activities, loading, refetch };
};
