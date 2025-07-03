import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useUserData } from "@/hooks/useUserData";
import { useCreditManager } from "@/hooks/useCreditManager";
import { Navbar2 } from "@/components/ui/navbar-2";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Code,
  Bug,
  FileText,
  Wrench,
  Zap,
  TestTube,
  CreditCard,
  Calendar,
  TrendingUp,
  Activity,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, activities, loading: dataLoading, refetch } = useUserData();
  const { currentCredits } = useCreditManager();
  const navigate = useNavigate();
  const [realTimeStats, setRealTimeStats] = useState({
    isLive: true,
    lastUpdate: new Date(),
  });

  // Debug logging
  useEffect(() => {
    console.log("Dashboard - User state:", {
      user: user ? { id: user.id, email: user.email } : null,
      authLoading,
      profile,
      dataLoading,
    });
  }, [user, authLoading, profile, dataLoading]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Real-time data subscription
  useEffect(() => {
    if (!user) return;

    // Subscribe to profile changes
    const profileSubscription = supabase
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
          refetch();
          setRealTimeStats({
            isLive: true,
            lastUpdate: new Date(),
          });
        },
      )
      .subscribe();

    // Subscribe to activity changes
    const activitySubscription = supabase
      .channel("activity-changes")
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
          refetch();
          setRealTimeStats({
            isLive: true,
            lastUpdate: new Date(),
          });
        },
      )
      .subscribe();

    return () => {
      profileSubscription.unsubscribe();
      activitySubscription.unsubscribe();
    };
  }, [user, refetch]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Navbar2 />
        <div className="min-h-screen flex items-center justify-center">
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickTools = [
    {
      icon: <Code className="h-6 w-6" />,
      title: "Code Generator",
      description: "Generate code from description",
      href: "/tools/code-generator",
      color: "bg-blue-500",
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Bug Fixer",
      description: "Fix bugs in your code",
      href: "/tools/bug-fixer",
      color: "bg-red-500",
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Code Explainer",
      description: "Understand complex code",
      href: "/tools/code-explainer",
      color: "bg-green-500",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Code Refactor",
      description: "Improve code quality",
      href: "/tools/code-refactor",
      color: "bg-purple-500",
    },
  ];

  const creditsRemaining = currentCredits || profile?.credits_remaining || 0;
  const planType = profile?.plan_type || "Free";
  const maxCredits =
    planType === "Pro" ? 500 : planType === "Enterprise" ? 1500 : 5;
  const progressValue = (creditsRemaining / maxCredits) * 100;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24)
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO
        title="Dashboard"
        description="Your AI coding assistant dashboard. Track your usage, credits, and access powerful AI tools."
        canonical="/dashboard"
      />

      <Navbar2 />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back,{" "}
            {profile?.full_name || user.user_metadata?.full_name || "Developer"}
            !
          </h1>
          <p className="text-gray-600">
            Ready to code smarter with AI assistance?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {/* Credit Balance */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Credits Remaining
              </CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <div className="text-2xl font-bold text-primary">
                  {creditsRemaining}
                </div>
                {realTimeStats.isLive && (
                  <div className="flex items-center gap-1 text-xs text-green-500">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Live
                  </div>
                )}
              </div>
              <Progress value={progressValue} className="mb-2" />
              <p className="text-xs text-muted-foreground">
                {Math.round(progressValue)}% remaining
              </p>
            </CardContent>
          </Card>

          {/* Current Plan */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Current Plan
              </CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{planType}</div>
              <Badge variant="secondary" className="mb-2">
                Active
              </Badge>
              <p className="text-xs text-muted-foreground">
                {maxCredits} credits/month
              </p>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">
                {profile?.tasks_this_month || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                AI tasks completed
              </p>
            </CardContent>
          </Card>

          {/* Activity Status */}
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl font-bold text-green-500">Active</div>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <p className="text-xs text-muted-foreground">
                Last update: {realTimeStats.lastUpdate.toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Access Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <Link key={index} to={tool.href}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/10 hover:border-primary/30 bg-white">
                  <CardHeader className="pb-3">
                    <div
                      className={`w-10 h-10 rounded-lg ${tool.color} flex items-center justify-center text-white mb-3`}
                    >
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity - Real-time data */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              {activities && activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between py-3 border-b last:border-b-0"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Code className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{activity.tool_name}</p>
                          <p className="text-sm text-gray-600">
                            {activity.credits_used} credit
                            {activity.credits_used !== 1 ? "s" : ""} used
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">
                          {formatTimeAgo(activity.created_at)}
                        </p>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse ml-auto mt-1"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 mb-4">No recent activity</p>
                  <p className="text-sm text-gray-400 mb-6">
                    Start using AI tools to see your activity here
                  </p>
                  <Link to="/tools">
                    <Button className="bg-primary hover:bg-primary/90">
                      Explore AI Tools
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        {planType === "Free" && (
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6 text-center">
              <h3 className="text-xl font-bold mb-2">
                Ready to Unlock More Power?
              </h3>
              <p className="text-gray-600 mb-4">
                Upgrade to Pro for 500 credits per month and priority processing
              </p>
              <div className="flex gap-4 justify-center">
                <Link to="/pricing">
                  <Button className="bg-primary hover:bg-primary/90">
                    Upgrade to Pro
                  </Button>
                </Link>
                <Link to="/tools">
                  <Button variant="outline">Explore Tools</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
