
import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastPeriodDate) {
      toast({
        title: "Date Required",
        description: "Please enter your last period start date to help us track your cycle.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Perfect! 🌸",
      description: "Your cycle tracking is now set up. Welcome to CHORI!",
    });
    navigate('/dashboard');
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
            <CardTitle className="text-2xl text-gray-800">Let's Set Up Your Tracking</CardTitle>
            <p className="text-gray-600">This helps us provide accurate cycle predictions and reminders</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-100">
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-teal-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-teal-800 mb-1">Your Privacy Matters</h3>
                  <p className="text-sm text-teal-700">
                    This information is encrypted and never shared. You can delete it anytime.
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod" className="text-lg font-semibold text-gray-800">
                  When did your last period start?
                </Label>
                <p className="text-sm text-gray-600 mb-3">
                  This helps us predict your next period and provide personalized insights.
                </p>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => setLastPeriodDate(e.target.value)}
                  className="border-rose-200 focus:border-rose-400 text-lg p-3"
                  required
                />
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
                  onClick={() => navigate('/dashboard')}
                  className="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  skip for now
                </button>
                {" "}and add it later.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
