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

      // Test 1: Check if we can access Supabase
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("count")
          .limit(1);
        if (error) {
          results.push(`❌ Supabase connection error: ${error.message}`);
        } else {
          results.push("✅ Supabase connection working");
        }
      } catch (error) {
        results.push(`❌ Supabase connection failed: ${error}`);
      }

      // Test 2: Check if user profile exists
      try {
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profileError) {
          if (profileError.code === "PGRST116") {
            results.push("❌ No profile found (PGRST116 - no rows)");
          } else {
            results.push(
              `❌ Profile error: ${profileError.message} (Code: ${profileError.code})`,
            );
          }
        } else {
          results.push(`✅ Profile found: ${JSON.stringify(profile, null, 2)}`);
        }
      } catch (error) {
        results.push(`❌ Profile check failed: ${error}`);
      }

      // Test 3: Check if user_activities table is accessible
      try {
        const { data: activities, error: activitiesError } = await supabase
          .from("user_activities")
          .select("*")
          .eq("user_id", user.id)
          .limit(1);

        if (activitiesError) {
          results.push(
            `❌ Activities error: ${activitiesError.message} (Code: ${activitiesError.code})`,
          );
        } else {
          results.push(
            `✅ Activities accessible: ${activities?.length || 0} records`,
          );
        }
      } catch (error) {
        results.push(`❌ Activities check failed: ${error}`);
      }

      // Test 4: Check if user_credits table is accessible
      try {
        const { data: credits, error: creditsError } = await supabase
          .from("user_credits")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (creditsError) {
          if (creditsError.code === "PGRST116") {
            results.push("❌ No user_credits found (PGRST116 - no rows)");
          } else {
            results.push(
              `❌ Credits error: ${creditsError.message} (Code: ${creditsError.code})`,
            );
          }
        } else {
          results.push(`✅ Credits found: ${JSON.stringify(credits, null, 2)}`);
        }
      } catch (error) {
        results.push(`❌ Credits check failed: ${error}`);
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
