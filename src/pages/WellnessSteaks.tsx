
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, ArrowLeft, Trophy, Star, Flame, Heart, Calendar, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WellnessStreaks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [streaks, setStreaks] = useState({
    tracking: 3,
    hydration: 2,
    selfCare: 4,
    education: 1
  });

  const achievements = [
    { 
      id: "first-track", 
      title: "First Steps", 
      description: "Tracked your first day", 
      icon: Star, 
      unlocked: true,
      color: "from-yellow-400 to-orange-400"
    },
    { 
      id: "week-warrior", 
      title: "Week Warrior", 
      description: "7-day tracking streak", 
      icon: Trophy, 
      unlocked: streaks.tracking >= 7,
      color: "from-purple-400 to-pink-400"
    },
    { 
      id: "hydration-hero", 
      title: "Hydration Hero", 
      description: "Stayed hydrated for 5 days", 
      icon: Droplets, 
      unlocked: streaks.hydration >= 5,
      color: "from-blue-400 to-cyan-400"
    },
    { 
      id: "self-care-star", 
      title: "Self-Care Star", 
      description: "Practiced self-care for 7 days", 
      icon: Heart, 
      unlocked: streaks.selfCare >= 7,
      color: "from-rose-400 to-pink-400"
    },
    { 
      id: "knowledge-seeker", 
      title: "Knowledge Seeker", 
      description: "Completed 5 educational videos", 
      icon: Award, 
      unlocked: streaks.education >= 5,
      color: "from-green-400 to-teal-400"
    },
    { 
      id: "month-master", 
      title: "Month Master", 
      description: "30-day tracking streak", 
      icon: Calendar, 
      unlocked: streaks.tracking >= 30,
      color: "from-indigo-400 to-purple-400"
    }
  ];

  const currentChallenges = [
    {
      title: "Daily Tracker Challenge",
      description: "Track your period for 7 consecutive days",
      progress: streaks.tracking,
      target: 7,
      reward: "Week Warrior Badge",
      color: "from-rose-500 to-purple-500",
      type: "tracking"
    },
    {
      title: "Hydration Challenge",
      description: "Log 8 glasses of water daily for 5 days",
      progress: streaks.hydration,
      target: 5,
      reward: "Hydration Hero Badge",
      color: "from-blue-500 to-cyan-500",
      type: "hydration"
    },
    {
      title: "Learning Journey",
      description: "Complete 5 educational videos",
      progress: streaks.education,
      target: 5,
      reward: "Knowledge Seeker Badge",
      color: "from-green-500 to-teal-500",
      type: "education"
    }
  ];

  const logProgress = (type: string, challengeTitle: string, target: number) => {
    const currentProgress = streaks[type as keyof typeof streaks];
    
    if (currentProgress >= target) {
      toast({
        title: "Challenge Already Completed! 🎉",
        description: `You've already completed the ${challengeTitle}!`,
      });
      return;
    }

    setStreaks(prev => ({
      ...prev,
      [type]: Math.min(prev[type as keyof typeof prev] + 1, target)
    }));

    const newProgress = currentProgress + 1;
    
    if (newProgress >= target) {
      toast({
        title: "Challenge Completed! 🏆",
        description: `Congratulations! You've completed the ${challengeTitle} and earned a new badge!`,
      });
    } else {
      toast({
        title: "Progress Logged! ✨",
        description: `Great job! You're now ${newProgress}/${target} towards completing ${challengeTitle}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/dashboard')}
            className="text-rose-700 hover:bg-rose-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <Award className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Wellness Streaks
            </h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Current Streaks */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Flame className="w-8 h-8" />
              Your Current Streaks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{streaks.tracking}</div>
                <div className="text-sm opacity-90">Days Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{streaks.hydration}</div>
                <div className="text-sm opacity-90">Hydration Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{streaks.selfCare}</div>
                <div className="text-sm opacity-90">Self-Care Days</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">{streaks.education}</div>
                <div className="text-sm opacity-90">Videos Watched</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Your Achievements</CardTitle>
            <p className="text-gray-600">Celebrate your wellness journey milestones!</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`border-2 transition-all duration-300 ${
                    achievement.unlocked 
                      ? "border-green-300 bg-green-50 shadow-lg" 
                      : "border-gray-200 bg-gray-50 opacity-60"
                  }`}
                >
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                      achievement.unlocked 
                        ? `bg-gradient-to-r ${achievement.color}` 
                        : "bg-gray-300"
                    }`}>
                      <achievement.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">{achievement.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                    <div className={`text-xs font-medium px-3 py-1 rounded-full ${
                      achievement.unlocked 
                        ? "bg-green-200 text-green-800" 
                        : "bg-gray-200 text-gray-600"
                    }`}>
                      {achievement.unlocked ? "Unlocked!" : "Locked"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Challenges */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Active Challenges</CardTitle>
            <p className="text-gray-600">Complete these challenges to earn new badges!</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {currentChallenges.map((challenge, index) => (
                <Card key={index} className="border-2 border-purple-100">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">{challenge.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{challenge.progress}/{challenge.target}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className={`h-3 rounded-full bg-gradient-to-r ${challenge.color} transition-all duration-300`}
                          style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded mb-3">
                      Reward: {challenge.reward}
                    </div>
                    
                    <Button 
                      size="sm" 
                      className={`w-full bg-gradient-to-r ${challenge.color} hover:opacity-90 ${
                        challenge.progress >= challenge.target ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                      onClick={() => logProgress(challenge.type, challenge.title, challenge.target)}
                      disabled={challenge.progress >= challenge.target}
                    >
                      {challenge.progress >= challenge.target ? 'Completed!' : 'Log Progress'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivation Message */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white">
          <CardContent className="p-6 text-center">
            <Trophy className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">You're Amazing! 🌟</h3>
            <p className="text-lg opacity-95">
              Every day you track, every lesson you learn, and every moment you care for yourself 
              is a victory worth celebrating. Keep up the incredible work!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessStreaks;
