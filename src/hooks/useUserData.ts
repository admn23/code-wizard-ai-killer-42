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

export const useUserData = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Fetch user profile
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profileError) {
        // Check if it's just that no profile exists yet
        if (profileError.code === "PGRST116") {
          console.log("No profile found for user, will create one");
          setProfile(null);
        } else {
          console.error("Error fetching profile:", {
            message: profileError.message,
            details: profileError.details,
            hint: profileError.hint,
            code: profileError.code,
          });
        }
      } else if (profileData) {
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
        console.error("Error fetching activities:", {
          message: activitiesError.message,
          details: activitiesError.details,
          hint: activitiesError.hint,
          code: activitiesError.code,
        });
        // Set empty array if there's an error
        setActivities([]);
      } else {
        setActivities(activitiesData || []);
      }
    } catch (error) {
      console.error("Error refetching user data:", error);
      setProfile(null);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setActivities([]);
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        setLoading(true);

        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          // Check if it's just that no profile exists yet
          if (profileError.code === "PGRST116") {
            console.log("No profile found for user, will create one");
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
              console.error("Error creating profile:", {
                message: createError.message,
                details: createError.details,
                hint: createError.hint,
                code: createError.code,
              });
            } else {
              setProfile(newProfile);
            }
          } else {
            console.error("Error fetching profile:", {
              message: profileError.message,
              details: profileError.details,
              hint: profileError.hint,
              code: profileError.code,
            });
          }
        } else if (profileData) {
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
          console.error("Error fetching activities:", {
            message: activitiesError.message,
            details: activitiesError.details,
            hint: activitiesError.hint,
            code: activitiesError.code,
          });
          // Set empty array if there's an error
          setActivities([]);
        } else {
          setActivities(activitiesData || []);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
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
          console.log("Profile updated:", payload);
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
          console.log("New activity:", payload);
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
      supabase.removeChannel(profileChannel);
      supabase.removeChannel(activitiesChannel);
    };
  }, [user]);

  return { profile, activities, loading, refetch };
};
