
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Code, Users, Zap, Award } from 'lucide-react';

const SuccessShowcase = () => {
  const stats = [
    {
      icon: <Code className="h-8 w-8" />,
      number: "1.2M+",
      label: "Lines of Code Generated",
      color: "text-blue-600"
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "5,000+",
      label: "Happy Developers",
      color: "text-green-600"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      number: "50,000+",
      label: "AI Tasks Completed",
      color: "text-yellow-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "99.9%",
      label: "Success Rate",
      color: "text-purple-600"
    }
  ];

  const codeExample = `// AI Generated React Component
import React from 'react';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (text) => {
    setTodos([...todos, { 
      id: Date.now(), 
      text, 
      completed: false 
    }]);
  };

  return (
    <div className="todo-app">
      <h1>My Todo List</h1>
      {/* Component implementation */}
    </div>
  );
};`;

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 gradient-text">Success Stories</h2>
          <p className="text-xl text-gray-600">
            Trusted by developers worldwide to deliver exceptional results
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${stat.color} mb-4 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2 gradient-text">
                  {stat.number}
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Code Example */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">See AI in Action</h3>
            <p className="text-gray-600 mb-6">
              Watch how our AI generates clean, functional code from simple descriptions. 
              From React components to complex algorithms, our AI delivers production-ready code in seconds.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Instant code generation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Best practices included</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-gray-600">Multiple frameworks supported</span>
              </div>
            </div>
            <Link to="/signup" className="mt-6 inline-block">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Try It Now
              </Button>
            </Link>
          </div>

          <div className="relative">
            <div className="bg-gray-900 rounded-lg p-6 text-green-400 font-mono text-sm overflow-x-auto">
              <div className="flex items-center gap-2 mb-4 text-white">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="ml-2 text-gray-400">Generated in 2.3 seconds</span>
              </div>
              <pre className="whitespace-pre-wrap">{codeExample}</pre>
            </div>
            <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
              ✨ AI Generated
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessShowcase;
