import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const ErrorTest = () => {
  const { user } = useAuth();
  const [testStatus, setTestStatus] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    const testErrors = async () => {
      setTestStatus("Testing error handling...");

      // Test 1: Force a profile error
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", "non-existent-id")
          .single();

        if (error) {
          console.log("✅ Test profile error handled correctly:");
          console.error("Error fetching profile:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
            fullError: JSON.stringify(error, null, 2),
          });
        }
      } catch (err) {
        console.log("❌ Unexpected error in test:", err);
      }

      // Test 2: Force an activities error
      try {
        const { data, error } = await supabase
          .from("user_activities")
          .select("*")
          .eq("user_id", "non-existent-id")
          .limit(1);

        if (error) {
          console.log("✅ Test activities error handled correctly:");
          console.error("Error fetching activities:", {
            message: error.message,
            code: error.code,
            details: error.details,
            hint: error.hint,
            fullError: JSON.stringify(error, null, 2),
          });
        }
      } catch (err) {
        console.log("❌ Unexpected error in test:", err);
      }

      setTestStatus("Error tests completed - check console");
    };

    testErrors();
  }, [user]);

  if (!user) return null;

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded p-4 mb-4">
      <h3 className="font-bold text-yellow-800">Error Testing Component</h3>
      <p className="text-yellow-700 text-sm">{testStatus}</p>
      <p className="text-xs text-yellow-600 mt-1">
        Check browser console for detailed error logs
      </p>
    </div>
  );
};

export default ErrorTest;
