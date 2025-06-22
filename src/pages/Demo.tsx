
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, ArrowLeft, Heart, Calendar, MessageCircle, BookOpen, Award, Apple } from "lucide-react";

const Demo = () => {
  const navigate = useNavigate();
  const [currentDemo, setCurrentDemo] = useState(0);

  const demoFeatures = [
    {
      title: "AI Chatbot - Ask Chori",
      description: "Get instant support and answers to all your period questions",
      icon: MessageCircle,
      color: "from-rose-500 to-pink-500",
      preview: "Try asking: 'What helps with cramps?' or 'Is my cycle normal?'"
    },
    {
      title: "Period Tracker",
      description: "Track your cycle, symptoms, and mood with personalized insights",
      icon: Calendar,
      color: "from-purple-500 to-violet-500",
      preview: "Log your flow, symptoms, and mood to get accurate predictions"
    },
    {
      title: "Menstruation 101",
      description: "Learn about periods through beginner-friendly educational videos",
      icon: BookOpen,
      color: "from-teal-500 to-cyan-500",
      preview: "Watch videos about 'What is Menstruation?' and 'Managing Your First Period'"
    },
    {
      title: "Diet Tips",
      description: "Discover foods that help reduce cramps and boost your energy",
      icon: Apple,
      color: "from-green-500 to-emerald-500",
      preview: "Learn about cramp-fighting foods like dark chocolate and leafy greens"
    },
    {
      title: "Wellness Streaks",
      description: "Stay motivated with gamified badges and achievement tracking",
      icon: Award,
      color: "from-yellow-500 to-orange-500",
      preview: "Earn badges like 'Week Warrior' and 'Hydration Hero'"
    }
  ];

  const nextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demoFeatures.length);
  };

  const prevDemo = () => {
    setCurrentDemo((prev) => (prev - 1 + demoFeatures.length) % demoFeatures.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-rose-700 hover:bg-rose-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <Play className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              CHORI Demo
            </h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Welcome Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white mb-8">
          <CardContent className="p-8 text-center">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">Welcome to CHORI Demo! 🌸</h2>
            <p className="text-lg opacity-95">
              Discover how CHORI supports your menstrual wellness journey with compassion, 
              education, and smart tracking features.
            </p>
          </CardContent>
        </Card>

        {/* Feature Demo */}
        <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
              <Button 
                variant="outline" 
                onClick={prevDemo}
                className="border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                Previous
              </Button>
              <span className="text-sm text-gray-600">
                {currentDemo + 1} of {demoFeatures.length}
              </span>
              <Button 
                variant="outline" 
                onClick={nextDemo}
                className="border-rose-200 text-rose-700 hover:bg-rose-50"
              >
                Next
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="text-center">
              <div className={`w-20 h-20 bg-gradient-to-r ${demoFeatures[currentDemo].color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                {React.createElement(demoFeatures[currentDemo].icon, { className: "w-10 h-10 text-white" })}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {demoFeatures[currentDemo].title}
              </h3>
              
              <p className="text-lg text-gray-600 mb-6">
                {demoFeatures[currentDemo].description}
              </p>
              
              <Card className="bg-gray-50 border-2 border-dashed border-gray-300 mb-6">
                <CardContent className="p-6">
                  <p className="text-gray-700 italic">
                    💡 {demoFeatures[currentDemo].preview}
                  </p>
                </CardContent>
              </Card>
              
              <Button 
                className={`bg-gradient-to-r ${demoFeatures[currentDemo].color} hover:opacity-90 text-white px-8 py-3 text-lg`}
                onClick={() => {
                  if (currentDemo === 0) navigate('/chatbot');
                  else if (currentDemo === 1) navigate('/tracker');
                  else if (currentDemo === 2) navigate('/education');
                  else if (currentDemo === 3) navigate('/diet-tips');
                  else if (currentDemo === 4) navigate('/wellness-streaks');
                }}
              >
                Try This Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feature Overview */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800 text-center">All CHORI Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4">
              {demoFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <Button
                    key={index}
                    variant={index === currentDemo ? "default" : "outline"}
                    onClick={() => setCurrentDemo(index)}
                    className={`p-4 h-auto flex flex-col items-center gap-2 ${
                      index === currentDemo 
                        ? `bg-gradient-to-r ${feature.color} text-white` 
                        : "border-rose-200 hover:bg-rose-50"
                    }`}
                  >
                    <IconComponent className="w-6 h-6" />
                    <span className="text-xs text-center">{feature.title}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Call to Action */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-lg mb-6 opacity-95">
              Join thousands of people who trust CHORI for compassionate period care and support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                onClick={() => navigate('/signup')}
                className="bg-white text-teal-600 hover:bg-gray-50 px-8 py-3 text-lg font-semibold"
              >
                Sign Up Free
              </Button>
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/login')}
                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
              >
                Log In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;
