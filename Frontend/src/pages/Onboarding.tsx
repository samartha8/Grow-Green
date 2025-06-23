import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Heart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastPeriodDate || !cycleLength) {
      toast({
        title: "Missing Information",
        description:
          "Please provide both your last period start date and average cycle length.",
        variant: "destructive",
      });
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      await axios.put(
        "http://localhost:5000/api/users/me",
        { lastPeriod: lastPeriodDate, cycleLength: parseInt(cycleLength) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast({
        title: "Perfect! 🌸",
        description: "Your cycle tracking is now set up. Welcome to CHORI!",
      });
      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Update Failed",
        description:
          err.response?.data?.message ||
          "An error occurred while updating period info.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl text-gray-800">
              Let's Set Up Your Tracking
            </CardTitle>
            <p className="text-gray-600">
              This helps us provide accurate cycle predictions and reminders
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-teal-800 mb-1">
                    Your Privacy Matters
                  </h3>
                  <p className="text-sm text-teal-700">
                    This information is encrypted and never shared. You can
                    delete it anytime.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="lastPeriod"
                  className="text-lg font-semibold text-gray-800"
                >
                  When did your last period start?
                </Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  required
                  className="text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="cycleLength"
                  className="text-lg font-semibold text-gray-800"
                >
                  What is your average cycle length (in days)?
                </Label>
                <Input
                  id="cycleLength"
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(e.target.value)}
                  placeholder="e.g., 28"
                  required
                  className="text-gray-800"
                />
                <p className="text-sm text-gray-600 mb-3">
                  This helps us predict your next period and provide
                  personalized insights.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold py-3 text-lg"
              >
                Enter Your Last Period Date
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                Don't remember exactly? That's okay! You can{" "}
                <button
                  onClick={() => navigate("/dashboard")}
                  className="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  skip for now
                </button>{" "}
                and add it later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
