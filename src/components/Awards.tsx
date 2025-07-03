
import { Card, CardContent } from '@/components/ui/card';
import { Award, Star, Trophy, Medal } from 'lucide-react';

const Awards = () => {
  const achievements = [
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "ProductHunt Featured",
      description: "Featured on ProductHunt as Product of the Day",
      date: "Dec 2023",
      color: "text-orange-600"
    },
    {
      icon: <Medal className="h-8 w-8" />,
      title: "Bangladesh Innovation Grant",
      description: "Winner of the Digital Innovation Grant Program",
      date: "Nov 2023", 
      color: "text-green-600"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Developer's Choice",
      description: "Rated #1 AI Coding Tool by Bangladeshi Developers",
      date: "Oct 2023",
      color: "text-blue-600"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Tech Excellence Award",
      description: "Best AI Application at BASIS SoftExpo 2023",
      date: "Sep 2023",
      color: "text-purple-600"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 gradient-text">Awards & Recognition</h2>
          <p className="text-xl text-gray-600">
            Recognized for excellence in AI-powered development tools
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`${achievement.color} mb-4 flex justify-center`}>
                  {achievement.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <p className="text-primary font-medium text-sm">{achievement.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 italic">
            "Coding Killer is transforming how developers work with AI in Bangladesh and beyond"
          </p>
          <p className="text-primary font-medium mt-2">- Tech Review BD</p>
        </div>
      </div>
    </section>
  );
};

export default Awards;
