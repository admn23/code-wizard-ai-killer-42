import React from "react";
import { Navbar2 } from "@/components/ui/navbar-2";
import SEO from "@/components/SEO";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Code,
  Brain,
  Target,
  Users,
  Trophy,
  Zap,
  Shield,
  Globe,
  Lightbulb,
  Heart,
  Star,
  ChevronRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  MapPin,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react";

const About = () => {
  const teamMembers = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Former Senior Engineer at Google with 8+ years in AI/ML. Passionate about democratizing AI for developers.",
      skills: ["AI/ML", "Python", "Leadership"],
      social: {
        linkedin: "https://linkedin.com/in/alexjohnson",
        twitter: "https://twitter.com/alexjohnson",
        github: "https://github.com/alexjohnson",
      },
    },
    {
      name: "Sarah Chen",
      role: "CTO & Co-founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Ex-Microsoft Principal Engineer. Expert in large-scale distributed systems and AI model optimization.",
      skills: ["System Architecture", "AI Optimization", "Cloud"],
      social: {
        linkedin: "https://linkedin.com/in/sarahchen",
        twitter: "https://twitter.com/sarahchen",
        github: "https://github.com/sarahchen",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of AI Research",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "PhD in Computer Science from Stanford. Published 30+ papers on natural language processing and code generation.",
      skills: ["NLP", "Research", "Deep Learning"],
      social: {
        linkedin: "https://linkedin.com/in/marcusrodriguez",
        twitter: "https://twitter.com/marcusrodriguez",
        github: "https://github.com/marcusrodriguez",
      },
    },
    {
      name: "Emily Zhang",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
      bio: "Former Product Manager at Stripe. Specializes in developer tools and user experience design.",
      skills: ["Product Strategy", "UX Design", "Analytics"],
      social: {
        linkedin: "https://linkedin.com/in/emilyzhang",
        twitter: "https://twitter.com/emilyzhang",
        github: "https://github.com/emilyzhang",
      },
    },
  ];

  const milestones = [
    {
      year: "2023",
      title: "Company Founded",
      description:
        "Started with a vision to revolutionize how developers write code using AI",
      icon: <Lightbulb className="h-6 w-6" />,
    },
    {
      year: "2023",
      title: "Beta Launch",
      description:
        "Released beta version to 100 selected developers for testing and feedback",
      icon: <Code className="h-6 w-6" />,
    },
    {
      year: "2024",
      title: "Public Launch",
      description:
        "Officially launched to the public with 12 AI-powered developer tools",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      year: "2024",
      title: "10K+ Users",
      description:
        "Reached 10,000+ active developers using our platform monthly",
      icon: <Users className="h-6 w-6" />,
    },
    {
      year: "2024",
      title: "Series A Funding",
      description:
        "Raised $5M Series A to accelerate AI research and expand our team",
      icon: <TrendingUp className="h-6 w-6" />,
    },
    {
      year: "2025",
      title: "Global Expansion",
      description:
        "Expanding to serve developers worldwide with multilingual support",
      icon: <Globe className="h-6 w-6" />,
    },
  ];

  const values = [
    {
      title: "Developer-First",
      description:
        "Every feature we build is designed with developers' needs and workflows in mind.",
      icon: <Code className="h-8 w-8" />,
      color: "bg-blue-500",
    },
    {
      title: "AI Innovation",
      description:
        "We push the boundaries of AI to create smarter, more intuitive coding experiences.",
      icon: <Brain className="h-8 w-8" />,
      color: "bg-purple-500",
    },
    {
      title: "Quality & Reliability",
      description:
        "We ensure our AI generates production-ready, secure, and optimized code.",
      icon: <Shield className="h-8 w-8" />,
      color: "bg-green-500",
    },
    {
      title: "Community Driven",
      description:
        "We listen to our community and build features that solve real developer problems.",
      icon: <Heart className="h-8 w-8" />,
      color: "bg-red-500",
    },
  ];

  const stats = [
    {
      label: "Lines of Code Generated",
      value: "10M+",
      icon: <Code className="h-6 w-6" />,
    },
    {
      label: "Active Developers",
      value: "15K+",
      icon: <Users className="h-6 w-6" />,
    },
    {
      label: "Programming Languages",
      value: "25+",
      icon: <Globe className="h-6 w-6" />,
    },
    {
      label: "AI Tools Available",
      value: "12",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      label: "Average Time Saved",
      value: "40%",
      icon: <Clock className="h-6 w-6" />,
    },
    {
      label: "Customer Satisfaction",
      value: "98%",
      icon: <Star className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO
        title="About Us"
        description="Learn about Coding Killer's mission to revolutionize software development with AI-powered tools. Meet our team of experts and discover our journey."
        keywords="about coding killer, AI development tools, software development, programming assistance, developer tools"
        canonical="/about"
      />

      <Navbar2 />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Revolutionizing</span>
              <br />
              <span className="text-gray-900">Software Development</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              At Coding Killer, we're on a mission to empower every developer
              with AI-powered tools that enhance creativity, boost productivity,
              and eliminate repetitive tasks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-lg px-8 py-4"
                >
                  Join Our Mission
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/tools">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  Explore Our Tools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 gradient-text">
              Our Story
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-xl mb-6">
                Coding Killer was born out of frustration with repetitive
                programming tasks and the time-consuming nature of modern
                software development. Our founders, experienced engineers from
                top tech companies, recognized that AI could transform how
                developers work.
              </p>
              <p className="text-lg mb-6">
                In 2023, we started with a simple question: "What if AI could
                understand developer intent and generate production-ready code?"
                This led us to develop cutting-edge natural language processing
                models specifically trained on millions of code repositories and
                best practices.
              </p>
              <p className="text-lg mb-6">
                Today, we're proud to serve thousands of developers worldwide,
                helping them write better code faster, debug complex issues, and
                learn new technologies through AI-powered assistance. Our
                platform has generated over 10 million lines of code and saved
                developers countless hours.
              </p>
              <p className="text-lg">
                We believe that AI should augment human creativity, not replace
                it. Our tools are designed to handle the mundane so developers
                can focus on solving interesting problems and building amazing
                products.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}
                  >
                    {value.icon}
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 gradient-text">
            Our Journey
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-primary/30"></div>

              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white shadow-lg z-10"></div>

                  {/* Content */}
                  <div
                    className={`w-full md:w-5/12 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} ml-16 md:ml-0`}
                  >
                    <Card className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            {milestone.icon}
                          </div>
                          <Badge variant="secondary">{milestone.year}</Badge>
                        </div>
                        <CardTitle className="text-xl">
                          {milestone.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600">
                          {milestone.description}
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're a diverse team of engineers, researchers, and designers
              passionate about making AI accessible to every developer.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl transition-all duration-300 group"
              >
                <CardHeader>
                  <div className="relative mx-auto mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-primary font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>

                  <div className="flex flex-wrap gap-1 mb-4 justify-center">
                    {member.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="text-xs"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex justify-center gap-3">
                    <a
                      href={member.social.linkedin}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <Twitter className="h-4 w-4" />
                    </a>
                    <a
                      href={member.social.github}
                      className="text-gray-400 hover:text-gray-900 transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold gradient-text mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions about our AI tools or want to partner with us? We'd
              love to hear from you.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-gray-600">hello@codingkiller.com</p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Visit Us</h3>
                <p className="text-gray-600">San Francisco, CA</p>
              </div>

              <div className="text-center">
                <div className="p-4 bg-white rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center shadow-lg">
                  <Github className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Open Source</h3>
                <p className="text-gray-600">github.com/codingkiller</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@codingkiller.com">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Send us a Message
                  <Mail className="h-5 w-5 ml-2" />
                </Button>
              </a>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Development Workflow?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
            Join thousands of developers who are already using AI to write
            better code faster. Start your journey with Coding Killer today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 py-4"
              >
                Get Started Free
                <ChevronRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>
            <Link to="/tools">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-primary"
              >
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img
                  src="https://i.postimg.cc/mkqZncXQ/Chat-GPT-Image-Jul-2-2025-04-29-00-PM-min.png"
                  alt="Coding Killer Logo"
                  className="w-8 h-8 rounded object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png";
                  }}
                />
                <span className="text-xl font-bold">Coding Killer</span>
              </div>
              <p className="text-gray-400">
                AI-powered coding assistant for developers
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-white">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="hover:text-white">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:hello@codingkiller.com"
                    className="hover:text-white"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Coding Killer. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
