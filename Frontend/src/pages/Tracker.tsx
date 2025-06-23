import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  ArrowLeft,
  Droplets,
  Heart,
  Moon,
  Sun,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Tracker = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate] = useState(today);
  const [flowIntensity, setFlowIntensity] = useState("none");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [mood, setMood] = useState("");
  const [isTracked, setIsTracked] = useState(false);
  const [trackingHistory, setTrackingHistory] = useState<any[]>([]);
  const [predictions, setPredictions] = useState<any>(null);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast({
            title: "Authentication Error",
            description: "Please log in to continue.",
            variant: "destructive",
          });
          navigate("/login");
          return;
        }

        const historyRes = await axios.get(
          "http://localhost:5000/api/tracker/history",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrackingHistory(historyRes.data);

        try {
          const predictionsRes = await axios.get(
            "http://localhost:5000/api/tracker/predictions",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setPredictions(predictionsRes.data);
        } catch (predError) {
          console.error("Predictions error:", predError);
          toast({
            title: "Predictions Unavailable",
            description:
              predError.response?.data?.message ||
              "Complete onboarding or track more days.",
            variant: "destructive",
          });
          setPredictions(null);
        }
      } catch (error) {
        console.error("Tracking fetch error:", error);
        toast({
          title: "Error",
          description: "Failed to fetch tracking data.",
          variant: "destructive",
        });
      }
    };

    fetchTrackingData();
  }, [navigate, toast]);

  const flowOptions = [
    { value: "none", label: "No Flow", color: "bg-gray-200" },
    { value: "light", label: "Light", color: "bg-rose-200" },
    { value: "medium", label: "Medium", color: "bg-rose-400" },
    { value: "heavy", label: "Heavy", color: "bg-rose-600" },
  ];

  const symptomOptions = [
    "Cramps", "Headache", "Bloating", "Mood Swings", "Fatigue",
    "Back Pain", "Breast Tenderness", "Nausea", "Acne", "Food Cravings",
  ];

  const moodOptions = [
    { value: "great", icon: Sun, label: "Great", color: "text-yellow-500" },
    { value: "good", icon: Heart, label: "Good", color: "text-green-500" },
    { value: "okay", icon: Moon, label: "Okay", color: "text-blue-500" },
    { value: "low", icon: Droplets, label: "Low", color: "text-purple-500" },
  ];

  const toggleSymptom = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast({
          title: "Error",
          description: "Please log in to continue.",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      const normalizedToday = new Date();
      normalizedToday.setHours(0, 0, 0, 0);

      const alreadyTrackedToday = trackingHistory.some((entry) => {
        const entryDate = new Date(entry.date);
        entryDate.setHours(0, 0, 0, 0);
        return entryDate.getTime() === normalizedToday.getTime();
      });

      if (alreadyTrackedToday) {
        toast({
          title: "Already Tracked Today",
          description: "You have already saved tracking data for today.",
          variant: "default",
        });
        setIsTracked(true);
        return;
      }

      await axios.post(
        "http://localhost:5000/api/tracker/daily",
        {
          date: today,
          flowIntensity,
          symptoms,
          mood,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setIsTracked(true);
      toast({
        title: "Day Tracked Successfully! 🌸",
        description: "Thanks for checking in today!",
      });

      const refreshed = await axios.get(
        "http://localhost:5000/api/tracker/history",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTrackingHistory(refreshed.data);

    } catch (error: any) {
      console.error("Save error:", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Tracking failed.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
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
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Date Picker (read-only) */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Track Your Day</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="date"
                value={today}
                readOnly
                className="w-full p-3 border border-rose-200 rounded-lg bg-gray-100 text-gray-700 cursor-not-allowed"
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
                    className={
                      flowIntensity === option.value
                        ? "bg-rose-500 hover:bg-rose-600"
                        : ""
                    }
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
                    className={
                      symptoms.includes(symptom)
                        ? "bg-purple-500 hover:bg-purple-600"
                        : ""
                    }
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
                    className={`flex flex-col items-center p-4 h-20 ${
                      mood === option.value ? "bg-teal-500 hover:bg-teal-600" : ""
                    }`}
                  >
                    <option.icon
                      className={`w-6 h-6 mb-1 ${
                        mood === option.value ? "text-white" : option.color
                      }`}
                    />
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
