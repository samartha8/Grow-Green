
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MessageCircle, Heart, Award, BookOpen, User, Apple, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentStreak, setCurrentStreak] = useState(7);
  
  // Simulated user data - in real app this would come from authentication
  const userName = "Sarah";
  
  const todayQuote = "You are stronger than you know and braver than you feel. Your body is doing something amazing! 🌸";
  
  const quickStats = [
    { label: "Days Until Next Period", value: "5", color: "from-rose-400 to-pink-400" },
    { label: "Current Cycle Day", value: "23", color: "from-purple-400 to-violet-400" },
    { label: "Tracking Streak", value: `${currentStreak}`, color: "from-teal-400 to-cyan-400" },
  ];

  const quickActions = [
    { 
      title: "Ask Chori", 
      icon: MessageCircle, 
      description: "Get instant support and answers",
      color: "from-rose-500 to-pink-500",
      onClick: () => navigate('/chatbot')
    },
    { 
      title: "Track Today", 
      icon: Calendar, 
      description: "Log your symptoms and mood",
      color: "from-purple-500 to-violet-500",
      onClick: () => navigate('/tracker')
    },
    { 
      title: "Learn More", 
      icon: BookOpen, 
      description: "Educational videos and tips",
      color: "from-teal-500 to-cyan-500",
      onClick: () => navigate('/education')
    },
    { 
      title: "Diet Tips", 
      icon: Apple, 
      description: "Nutrition for your cycle",
      color: "from-green-500 to-emerald-500",
      onClick: () => navigate('/diet-tips')
    },
    { 
      title: "Wellness Streaks", 
      icon: Trophy, 
      description: "Your achievements and badges",
      color: "from-yellow-500 to-orange-500",
      onClick: () => navigate('/wellness-streaks')
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              CHORI
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/profile')}
            className="border-rose-200 text-rose-700 hover:bg-rose-50"
          >
            <User className="w-4 h-4 mr-2" />
            Profile
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Hi {userName}! Welcome back! 🌸</h2>
          <p className="text-gray-600">Here's your wellness overview for today</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-lg">{stat.value}</span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Daily Quote */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5" />
              Daily Motivation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed opacity-95">{todayQuote}</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer bg-white/80 backdrop-blur-sm"
              onClick={action.onClick}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <action.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{action.title}</h3>
                <p className="text-sm text-gray-600">{action.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Wellness Streak */}
        <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              <Award className="w-5 h-5 text-yellow-500" />
              Wellness Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{currentStreak} Days Strong! 🔥</p>
                <p className="text-gray-600">Keep tracking to maintain your streak</p>
              </div>
              <Button 
                onClick={() => navigate('/tracker')}
                className="bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500"
              >
                Track Today
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
