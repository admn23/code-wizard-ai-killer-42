import React, { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DatabaseTest = () => {
  const { user } = useAuth();
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const runTests = async () => {
      const results: string[] = [];

      if (!user) {
        results.push("❌ No user logged in");
        setTestResults(results);
        return;
      }

      results.push(`✅ User logged in: ${user.email} (ID: ${user.id})`);

      // Test current session
      try {
        const { data: session } = await supabase.auth.getSession();
        if (session.session) {
          results.push("✅ Valid auth session exists");
        } else {
          results.push("❌ No valid auth session");
        }
      } catch (error) {
        results.push(`❌ Session check failed: ${String(error)}`);
      }

      // Test basic Supabase connectivity
      try {
        const { error } = await supabase.from("profiles").select("id").limit(1);
        if (error) {
          results.push(
            `❌ Supabase access error: ${error.message} (${error.code})`,
          );
        } else {
          results.push("✅ Supabase tables accessible");
        }
      } catch (error) {
        results.push(`❌ Supabase connection failed: ${String(error)}`);
      }

      // Test profile query
      try {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          if (profileError.code === "PGRST116") {
            results.push("❌ No profile found - will be created automatically");
          } else {
            results.push(
              `❌ Profile error: ${profileError.message} (${profileError.code})`,
            );
            results.push(
              `Full error: ${JSON.stringify(profileError, null, 2)}`,
            );
          }
        } else {
          results.push(
            `✅ Profile exists: Plan=${profile.plan_type}, Credits=${profile.credits_remaining}`,
          );
        }
      } catch (error) {
        results.push(`❌ Profile query failed: ${String(error)}`);
      }

      // Test activities query
      try {
        const { data: activities, error: activitiesError } = await supabase
          .from("user_activities")
          .select("id, tool_name, created_at")
          .eq("user_id", user.id)
          .limit(3);

        if (activitiesError) {
          results.push(
            `❌ Activities error: ${activitiesError.message} (${activitiesError.code})`,
          );
          results.push(
            `Full error: ${JSON.stringify(activitiesError, null, 2)}`,
          );
        } else {
          results.push(
            `✅ Activities query successful: ${activities?.length || 0} records`,
          );
        }
      } catch (error) {
        results.push(`❌ Activities query failed: ${String(error)}`);
      }

      setTestResults(results);
    };

    if (user) {
      runTests();
    }
  }, [user]);

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Database Connection Test</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {testResults.map((result, index) => (
            <div key={index} className="text-sm font-mono">
              {result}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DatabaseTest;
