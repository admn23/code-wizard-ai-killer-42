import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useUserData } from '@/hooks/useUserData';
import { Navbar1 } from '@/components/ui/navbar-1';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Bug, 
  FileText, 
  Wrench, 
  Zap, 
  TestTube,
  CreditCard,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, activities, loading: dataLoading } = useUserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  if (authLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
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
      href: "/tools/code-generator"
    },
    {
      icon: <Bug className="h-6 w-6" />,
      title: "Bug Fixer",
      description: "Fix bugs in your code",
      href: "/tools/bug-fixer"
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: "Code Explainer",
      description: "Understand complex code",
      href: "/tools/code-explainer"
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Code Refactor",
      description: "Improve code quality",
      href: "/tools/code-refactor"
    }
  ];

  const creditsRemaining = profile?.credits_remaining || 0;
  const planType = profile?.plan_type || 'Free';
  const maxCredits = planType === 'Pro' ? 500 : 5;
  const progressValue = (creditsRemaining / maxCredits) * 100;

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO 
        title="Dashboard"
        description="Access your AI coding tools dashboard. View credits, usage statistics, and manage your account."
        keywords="dashboard, ai tools, coding, credits, usage"
      />
      
      <Navbar1 />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">
            Welcome back, {profile?.full_name || user.user_metadata?.full_name || 'Developer'}!
          </h1>
          <p className="text-gray-600">Ready to code smarter with AI assistance?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Credit Balance */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Credits Remaining</CardTitle>
              <CreditCard className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary mb-2">{creditsRemaining}</div>
              <Progress value={progressValue} className="mb-2" />
              <p className="text-xs text-muted-foreground">{Math.round(progressValue)}% remaining</p>
            </CardContent>
          </Card>

          {/* Current Plan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <Calendar className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{planType} Plan</div>
              <Badge variant="secondary" className="mb-2">Active</Badge>
              <p className="text-xs text-muted-foreground">
                {planType === 'Pro' ? '500 credits/month' : '5 credits total'}
              </p>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <TrendingUp className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{profile?.tasks_this_month || 0}</div>
              <p className="text-xs text-muted-foreground">AI tasks completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Tools */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickTools.map((tool, index) => (
              <Link key={index} to={tool.href}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/10 hover:border-primary/30">
                  <CardHeader>
                    <div className="text-primary mb-2">
                      {tool.icon}
                    </div>
                    <CardTitle className="text-lg">{tool.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="p-6">
              {activities.length > 0 ? (
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{activity.tool_name}</p>
                        <p className="text-sm text-gray-600">
                          {activity.credits_used} credit{activity.credits_used !== 1 ? 's' : ''} used
                        </p>
                      </div>
                      <p className="text-sm text-gray-500">{formatTimeAgo(activity.created_at)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No recent activity</p>
                  <Link to="/tools">
                    <Button>Start Using AI Tools</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Upgrade CTA */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Need More Credits?</h3>
            <p className="text-gray-600 mb-4">
              {planType === 'Free' ? 'Upgrade to Pro for unlimited access' : 'Purchase additional credits'}
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/pricing">
                <Button className="bg-primary hover:bg-primary/90">
                  {planType === 'Free' ? 'Upgrade to Pro' : 'View Plans'}
                </Button>
              </Link>
              {planType === 'Pro' && (
                <Button variant="outline">
                  Buy Credits
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
