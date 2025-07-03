
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Facebook, MessageCircle, Users, Heart } from 'lucide-react';

const SocialMediaCTA = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-5 w-5" />,
      description: "Join our community of developers",
      members: "2,500+ members",
      color: "bg-blue-600 hover:bg-blue-700",
      href: "https://facebook.com/codingkiller"
    },
    {
      name: "Discord",
      icon: <MessageCircle className="h-5 w-5" />,
      description: "Chat with fellow coders",
      members: "1,200+ online",
      color: "bg-indigo-600 hover:bg-indigo-700",
      href: "https://discord.gg/codingkiller"
    },
    {
      name: "Community",
      icon: <Users className="h-5 w-5" />,
      description: "Get help and share knowledge",
      members: "5,000+ developers",
      color: "bg-green-600 hover:bg-green-700",
      href: "/community"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h2 className="text-3xl font-bold gradient-text">Join Our Community</h2>
          </div>
          <p className="text-xl text-gray-600">
            Connect with thousands of developers using AI to code smarter
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {socialLinks.map((social, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 text-center">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${social.color} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {social.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{social.name}</h3>
                <p className="text-gray-600 mb-2">{social.description}</p>
                <p className="text-sm text-primary font-medium mb-4">{social.members}</p>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  <Button className={`${social.color} w-full`}>
                    Join {social.name}
                  </Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Get instant support, share your projects, and learn from other developers
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
            <span>✨ Helpful Community</span>
            <span>🚀 Latest Updates</span>
            <span>💡 Tips & Tricks</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaCTA;
