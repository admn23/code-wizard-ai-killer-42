
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Code, Users, Zap, Award } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Ashikur Rahman",
      role: "Founder & CEO",
      description: "Passionate about AI and making coding accessible to everyone"
    }
  ];

  const stack = [
    { name: "OpenAI", description: "Powering our AI capabilities" },
    { name: "Supabase", description: "Backend and database" },
    { name: "React & Vite", description: "Modern frontend development" },
    { name: "Tailwind CSS", description: "Beautiful, responsive design" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gradient-text">
            We build AI tools to help developers ship faster
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Our mission is to make coding effortless and accessible to everyone, 
            from beginners to expert developers.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              We believe code should be effortless. Every developer deserves access to powerful AI tools 
              that can help them write better code faster, debug issues instantly, and learn new concepts 
              seamlessly. That's why we built Coding Killer - to democratize AI-powered development tools 
              and make them accessible to developers everywhere.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center gradient-text">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p>
                Coding Killer was born from a simple observation: developers spend too much time on 
                repetitive tasks and not enough time on creative problem-solving. As a developer myself, 
                I experienced the frustration of debugging obscure errors, writing boilerplate code, 
                and trying to understand complex algorithms.
              </p>
              <p>
                In 2024, with the rapid advancement of AI technology, we saw an opportunity to change 
                this. We started building AI-powered tools that could understand code, explain complex 
                concepts, fix bugs automatically, and generate high-quality code from simple descriptions.
              </p>
              <p>
                Today, Coding Killer serves thousands of developers worldwide, helping them write better 
                code faster and learn new technologies more effectively. We're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Meet the Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center gradient-text">Powered By</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stack.map((tech, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-primary mb-2">
                    <Code className="h-8 w-8 mx-auto" />
                  </div>
                  <CardTitle className="text-lg">{tech.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{tech.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-hero-gradient text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Building with AI?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already coding smarter with our AI tools
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Building Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Coding Killer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
