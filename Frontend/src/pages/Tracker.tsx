import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowLeft, Droplets, Heart, Moon, Sun, TrendingUp, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Tracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [isTracked, setIsTracked] = useState(false);

  const flowOptions = [
    { value: "none", label: "No Flow", color: "bg-gray-200" },
    { value: "light", label: "Light", color: "bg-rose-200" },
    { value: "medium", label: "Medium", color: "bg-rose-400" },
    { value: "heavy", label: "Heavy", color: "bg-rose-600" }
  ];

  const symptomOptions = [
    "Cramps", "Headache", "Bloating", "Mood Swings", "Fatigue", 
    "Back Pain", "Breast Tenderness", "Nausea", "Acne", "Food Cravings"
  ];

  const moodOptions = [
    { value: "great", icon: Sun, label: "Great", color: "text-yellow-500" },
    { value: "good", icon: Heart, label: "Good", color: "text-green-500" },
    { value: "okay", icon: Moon, label: "Okay", color: "text-blue-500" },
    { value: "low", icon: Droplets, label: "Low", color: "text-purple-500" }
  ];

  const toggleSymptom = (symptom: string) => {
    setSymptoms(prev => 
      prev.includes(symptom) 
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = () => {
    setIsTracked(true);
    toast({
      title: "Day Tracked Successfully! 🌸",
      description: "Your data helps us provide better cycle predictions and health insights.",
    });
  };

  if (isTracked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
        {/* Header */}
        <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
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
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                Tracking Complete!
              </h1>
            </div>
            <div className="w-20"></div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white mb-8">
            <CardContent className="p-8 text-center">
              <Award className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Great Job! 🎉</h2>
              <p className="text-lg opacity-95 mb-6">
                You've successfully tracked your day. This data helps us provide better insights and predictions for your cycle.
              </p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  What Happens Next?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>• Your data is saved securely in your profile</li>
                  <li>• We'll use it to predict your next cycle</li>
                  <li>• You'll get personalized health insights</li>
                  <li>• Track consistently for better accuracy</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-800">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Benefits of Tracking
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-700">
                  <li>• Better understanding of your cycle patterns</li>
                  <li>• Early detection of irregularities</li>
                  <li>• Personalized health recommendations</li>
                  <li>• Improved wellness planning</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/dashboard')}
              className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
            >
              View Dashboard
            </Button>
            <Button 
              onClick={() => navigate('/wellness-streaks')}
              variant="outline"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              Check Achievements
            </Button>
            <Button 
              onClick={() => setIsTracked(false)}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Track Another Day
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
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
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Period Tracker
            </h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Date Selection */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Track Your Day</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-rose-200 rounded-lg focus:border-rose-400 focus:outline-none"
              />
            </CardContent>
          </Card>

          {/* Flow Intensity */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Droplets className="w-5 h-5 text-rose-500" />
                Flow Intensity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {flowOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={flowIntensity === option.value ? "default" : "outline"}
                    onClick={() => setFlowIntensity(option.value)}
                    className={`${flowIntensity === option.value ? "bg-rose-500 hover:bg-rose-600" : ""}`}
                  >
                    <div className={`w-3 h-3 rounded-full ${option.color} mr-2`} />
                    {option.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Symptoms */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-800">Symptoms</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {symptomOptions.map((symptom) => (
                  <Button
                    key={symptom}
                    variant={symptoms.includes(symptom) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleSymptom(symptom)}
                    className={`${symptoms.includes(symptom) ? "bg-purple-500 hover:bg-purple-600" : ""}`}
                  >
                    {symptom}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mood */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle className="text-gray-800">How are you feeling?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {moodOptions.map((option) => (
                  <Button
                    key={option.value}
                    variant={mood === option.value ? "default" : "outline"}
                    onClick={() => setMood(option.value)}
                    className={`flex flex-col items-center p-4 h-20 ${mood === option.value ? "bg-teal-500 hover:bg-teal-600" : ""}`}
                  >
                    <option.icon className={`w-6 h-6 mb-1 ${mood === option.value ? "text-white" : option.color}`} />
                    <span className="text-sm">{option.label}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm md:col-span-2">
            <CardContent className="p-6">
              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-lg py-3"
              >
                Save Today's Data
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Tracker;
