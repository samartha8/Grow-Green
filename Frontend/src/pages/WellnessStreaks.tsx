import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, ArrowLeft, Trophy, Star, Droplets, Heart, Calendar, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WellnessStreaks = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [streaks, setStreaks] = useState({
    tracking: 3,
    hydration: 2,
    education: 1,
  });

  const challenges = [
    {
      title: "Daily Tracker Challenge",
      description: "Track your period for 7 consecutive days",
      progress: streaks.tracking,
      target: 7,
      type: "tracking",
      color: "from-pink-500 to-purple-500",
      reward: "Week Warrior Badge",
    },
    {
      title: "Hydration Challenge",
      description: "Log 8 glasses of water daily for 5 days",
      progress: streaks.hydration,
      target: 5,
      type: "hydration",
      color: "from-blue-500 to-cyan-500",
      reward: "Hydration Hero Badge",
    },
    {
      title: "Learning Journey",
      description: "Complete 5 educational videos",
      progress: streaks.education,
      target: 5,
      type: "education",
      color: "from-green-500 to-teal-500",
      reward: "Knowledge Seeker Badge",
    },
  ];

  const logProgress = (type: string, title: string, target: number) => {
    const current = streaks[type as keyof typeof streaks];
    if (current >= target) {
      toast({ title: "Already Completed", description: `${title} is already done.` });
      return;
    }

    const newCount = Math.min(current + 1, target);
    setStreaks((prev) => ({ ...prev, [type]: newCount }));

    toast({
      title: newCount === target ? "Challenge Completed 🎉" : "Progress Logged!",
      description:
        newCount === target
          ? `You completed the ${title}!`
          : `Progress: ${newCount}/${target} in ${title}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="text-rose-700 hover:bg-rose-50">
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
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Active Challenges</CardTitle>
            <p className="text-gray-600">Complete these challenges to earn new badges!</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {challenges.map((c, i) => (
                <div key={i} className="border border-purple-200 rounded-lg p-6 shadow-sm bg-white">
                  <h3 className="font-semibold text-gray-800 mb-1">{c.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{c.description}</p>
                  <div className="text-sm flex justify-between mb-1">
                    <span>Progress</span>
                    <span>{c.progress}/{c.target}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${c.color}`}
                      style={{ width: `${(c.progress / c.target) * 100}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded mb-3">
                    Reward: {c.reward}
                  </div>
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${c.color} text-white ${
                      c.progress >= c.target ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={() => logProgress(c.type, c.title, c.target)}
                    disabled={c.progress >= c.target}
                  >
                    {c.progress >= c.target ? "Completed!" : "Log Progress"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white mt-8">
          <CardContent className="p-6 text-center">
            <Trophy className="w-10 h-10 mx-auto mb-3" />
            <h3 className="text-xl font-bold mb-2">You're doing great!</h3>
            <p className="opacity-95">Every day counts. Keep building your streaks and unlock amazing badges!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WellnessStreaks;
