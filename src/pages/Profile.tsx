import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ArrowLeft, User, Calendar, Shield, Bell, BookmarkCheck, ChefHat, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    name: "Sarah",
    email: "sarah@example.com",
    age: "16",
    lastPeriod: "2024-06-05",
    cycleLength: "28",
    notifications: true,
    privacyMode: false
  });

  // Simulated saved diet tips organized by day
  const [savedTipsByDay] = useState([
    {
      day: "Monday",
      tips: [
        { name: "Dark Chocolate", benefit: "Mood booster & magnesium source", category: "Comfort Foods" },
        { name: "Leafy Greens", benefit: "High in iron and folate", category: "Iron-Rich Foods" }
      ]
    },
    {
      day: "Tuesday", 
      tips: [
        { name: "Ginger Tea", benefit: "Reduces inflammation and nausea", category: "Anti-Inflammatory" }
      ]
    },
    {
      day: "Wednesday",
      tips: [
        { name: "Bananas", benefit: "Quick energy and potassium", category: "Energy Foods" },
        { name: "Greek Yogurt", benefit: "Protein for muscle recovery", category: "Protein Sources" }
      ]
    },
    {
      day: "Thursday",
      tips: [
        { name: "Salmon", benefit: "Omega-3 fatty acids for inflammation", category: "Anti-Inflammatory" }
      ]
    },
    {
      day: "Friday",
      tips: [
        { name: "Avocado", benefit: "Healthy fats and fiber", category: "Healthy Fats" }
      ]
    },
    {
      day: "Saturday",
      tips: [
        { name: "Berries", benefit: "Antioxidants and vitamins", category: "Antioxidants" }
      ]
    },
    {
      day: "Sunday",
      tips: [
        { name: "Nuts & Seeds", benefit: "Healthy fats and protein", category: "Protein Sources" }
      ]
    }
  ]);

  const [savedRecipes] = useState([
    "Period Power Smoothie",
    "Anti-Cramp Tea Blend"
  ]);

  const getTotalSavedTips = () => {
    return savedTipsByDay.reduce((total, day) => total + day.tips.length, 0);
  };

  const getCurrentDayTips = () => {
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const currentDay = savedTipsByDay.find(day => day.day === today);
    return currentDay || { day: today, tips: [] };
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated! 🌸",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You've been logged out safely. Take care! 💝",
    });
    navigate('/');
  };

  const maskSensitiveData = (data: string) => {
    if (!profileData.privacyMode) return data;
    return "*".repeat(data.length);
  };

  const maskEmail = (email: string) => {
    if (!profileData.privacyMode) return email;
    const [username, domain] = email.split('@');
    return `${"*".repeat(username.length)}@${domain}`;
  };

  const maskDate = (date: string) => {
    if (!profileData.privacyMode) return date;
    return "****-**-**";
  };

  const currentDayTips = getCurrentDayTips();

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
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
          </button>
          <div className="flex items-center gap-2">
            {profileData.privacyMode && (
              <div className="flex items-center gap-1 text-teal-600 text-sm">
                <EyeOff className="w-4 h-4" />
                <span>Privacy Mode On</span>
              </div>
            )}
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Information */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-rose-500" />
                Personal Information
                {profileData.privacyMode && (
                  <div className="ml-auto flex items-center gap-1 text-teal-600 text-xs">
                    <Shield className="w-3 h-3" />
                    Protected
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={maskSensitiveData(profileData.name)}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="border-rose-200 focus:border-rose-400"
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={maskEmail(profileData.email)}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="border-rose-200 focus:border-rose-400"
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={maskSensitiveData(profileData.age)}
                  onChange={(e) => setProfileData({...profileData, age: e.target.value})}
                  className="border-rose-200 focus:border-rose-400"
                  disabled={profileData.privacyMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cycle Information */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-purple-500" />
                Cycle Information
                {profileData.privacyMode && (
                  <div className="ml-auto flex items-center gap-1 text-teal-600 text-xs">
                    <Shield className="w-3 h-3" />
                    Protected
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="lastPeriod">Last Period Start Date</Label>
                <Input
                  id="lastPeriod"
                  type="date"
                  value={maskDate(profileData.lastPeriod)}
                  onChange={(e) => setProfileData({...profileData, lastPeriod: e.target.value})}
                  className="border-rose-200 focus:border-rose-400"
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cycleLength">Average Cycle Length (days)</Label>
                <Input
                  id="cycleLength"
                  value={maskSensitiveData(profileData.cycleLength)}
                  onChange={(e) => setProfileData({...profileData, cycleLength: e.target.value})}
                  className="border-rose-200 focus:border-rose-400"
                  disabled={profileData.privacyMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Daily Diet Tips */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <BookmarkCheck className="w-5 h-5 text-green-500" />
                Today's Diet Tips ({currentDayTips.tips.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-3">
                <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                  {currentDayTips.day}
                </span>
              </div>
              {currentDayTips.tips.length > 0 ? (
                <div className="space-y-2">
                  {currentDayTips.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <h4 className="font-medium text-gray-800">{tip.name}</h4>
                        <p className="text-sm text-gray-600">{tip.benefit}</p>
                        <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded mt-1 inline-block">
                          {tip.category}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-green-100">
                    <p className="text-xs text-gray-500 mb-2">
                      Total saved tips: {getTotalSavedTips()} across all days
                    </p>
                    <Button 
                      onClick={() => navigate('/saved-diet-tips')}
                      variant="outline"
                      className="w-full border-green-200 text-green-700 hover:bg-green-50"
                    >
                      View All Weekly Tips
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-2">No tips saved for {currentDayTips.day} yet</p>
                  <Button 
                    onClick={() => navigate('/diet-tips')}
                    variant="outline"
                    className="border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Add Some Tips
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recipe Collection */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <ChefHat className="w-5 h-5 text-purple-500" />
                Recipe Collection ({savedRecipes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedRecipes.length > 0 ? (
                <div className="space-y-2">
                  {savedRecipes.map((recipe, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700">{recipe}</span>
                    </div>
                  ))}
                  <Button 
                    onClick={() => navigate('/diet-tips')}
                    variant="outline"
                    className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    Find More Recipes
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No saved recipes yet. Try some from Diet Tips!</p>
              )}
            </CardContent>
          </Card>

          {/* Privacy & Settings */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Shield className="w-5 h-5 text-teal-500" />
                Privacy & Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications</Label>
                  <p className="text-sm text-gray-600">Get period reminders</p>
                </div>
                <Button
                  variant={profileData.notifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProfileData({...profileData, notifications: !profileData.notifications})}
                  className={profileData.notifications ? "bg-rose-500 hover:bg-rose-600" : ""}
                >
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Privacy Mode</Label>
                  <p className="text-sm text-gray-600">Hide sensitive information and disable editing</p>
                </div>
                <Button
                  variant={profileData.privacyMode ? "default" : "outline"}
                  size="sm"
                  onClick={() => setProfileData({...profileData, privacyMode: !profileData.privacyMode})}
                  className={profileData.privacyMode ? "bg-teal-500 hover:bg-teal-600" : ""}
                >
                  {profileData.privacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
              {profileData.privacyMode && (
                <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                  <p className="text-sm text-teal-700">
                    <Shield className="w-4 h-4 inline mr-1" />
                    Privacy mode is active. Personal data is masked and editing is disabled for enhanced privacy.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <Button 
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                disabled={profileData.privacyMode}
              >
                {profileData.privacyMode ? "Disable Privacy Mode to Save" : "Save Changes"}
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Log Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
