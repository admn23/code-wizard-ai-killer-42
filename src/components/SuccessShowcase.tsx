import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Code, Users, Zap, Award } from "lucide-react";

const SuccessShowcase = () => {
  const stats = [
    {
      icon: <Code className="h-8 w-8" />,
      number: "1.2M+",
      label: "Lines of Code Generated",
      color: "text-blue-600",
    },
    {
      icon: <Users className="h-8 w-8" />,
      number: "5,000+",
      label: "Happy Developers",
      color: "text-green-600",
    },
    {
      icon: <Zap className="h-8 w-8" />,
      number: "50,000+",
      label: "AI Tasks Completed",
      color: "text-yellow-600",
    },
    {
      icon: <Award className="h-8 w-8" />,
      number: "99.9%",
      label: "Success Rate",
      color: "text-purple-600",
    },
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
          <h2 className="text-4xl font-bold mb-4 gradient-text">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by developers worldwide to deliver exceptional results
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
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
      </div>
    </section>
  );
};

export default SuccessShowcase;
