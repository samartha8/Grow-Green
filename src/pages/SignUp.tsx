
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    lastPeriodDate: "",
    cycleLength: "28",
    hasStartedMenstruating: ""
  });

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Welcome to CHORI! 🌸",
      description: "Your account has been created successfully.",
    });
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => step === 1 ? navigate('/') : setStep(1)}
          className="mb-6 text-rose-700 hover:bg-rose-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {step === 1 ? 'Back to Home' : 'Back'}
        </Button>

        <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center justify-center gap-2 mb-4 hover:opacity-80 transition-opacity mx-auto"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
                CHORI
              </span>
            </button>
            <CardTitle className="text-2xl text-gray-800">
              {step === 1 ? 'Create Your Account' : 'Period Information'}
            </CardTitle>
            <p className="text-gray-600">
              {step === 1 ? 'Join your compassionate wellness companion' : 'Help us personalize your experience'}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 ? (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold py-2"
                >
                  Continue to Period Information
                </Button>
              </form>
            ) : (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="bg-rose-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-rose-600" />
                    <h3 className="font-semibold text-rose-800">Period Tracking Setup</h3>
                  </div>
                  <p className="text-sm text-rose-700">
                    This information helps us provide personalized tracking and predictions. All data is kept private and secure.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700">Have you started menstruating?</Label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasStarted"
                        value="yes"
                        checked={formData.hasStartedMenstruating === "yes"}
                        onChange={(e) => setFormData({...formData, hasStartedMenstruating: e.target.value})}
                        className="text-rose-500"
                        required
                      />
                      <span className="text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="hasStarted"
                        value="no"
                        checked={formData.hasStartedMenstruating === "no"}
                        onChange={(e) => setFormData({...formData, hasStartedMenstruating: e.target.value})}
                        className="text-rose-500"
                        required
                      />
                      <span className="text-gray-700">Not yet</span>
                    </label>
                  </div>
                </div>

                {formData.hasStartedMenstruating === "yes" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="lastPeriod" className="text-gray-700">Last Period Start Date</Label>
                      <Input
                        id="lastPeriod"
                        type="date"
                        value={formData.lastPeriodDate}
                        onChange={(e) => setFormData({...formData, lastPeriodDate: e.target.value})}
                        className="border-rose-200 focus:border-rose-400"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        This helps us predict your next period and provide better tracking
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cycleLength" className="text-gray-700">Average Cycle Length (days)</Label>
                      <Input
                        id="cycleLength"
                        type="number"
                        min="21"
                        max="35"
                        placeholder="28"
                        value={formData.cycleLength}
                        onChange={(e) => setFormData({...formData, cycleLength: e.target.value})}
                        className="border-rose-200 focus:border-rose-400"
                        required
                      />
                      <p className="text-xs text-gray-500">
                        Most cycles are between 21-35 days. Don't worry if you're not sure, you can update this later.
                      </p>
                    </div>
                  </>
                )}

                {formData.hasStartedMenstruating === "no" && (
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-purple-700">
                      No worries! CHORI will help you prepare for your first period with educational resources and support. 
                      You can update your tracking information once your period starts.
                    </p>
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-white font-semibold py-2"
                >
                  Complete Registration
                </Button>
              </form>
            )}

            <div className="text-center pt-4">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate('/login')}
                  className="text-rose-600 hover:text-rose-700 font-semibold"
                >
                  Log In
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
