import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  ArrowLeft,
  User,
  Calendar,
  Shield,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    age: "",
    lastPeriod: "",
    cycleLength: "",
    notificationSettings: {
      periodReminders: false,
      fertilityWindowReminders: false,
    },
    privacyMode: false,
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/login");

        const res = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data;
        setProfileData({
          name: data.name || "",
          email: data.email || "",
          age: data.age ? String(data.age) : "",
          lastPeriod: data.lastPeriodDate
            ? new Date(data.lastPeriodDate).toISOString().split("T")[0]
            : "",
          cycleLength: data.cycleLength ? String(data.cycleLength) : "",
          notificationSettings: {
            periodReminders: data.notificationSettings?.periodReminders || false,
            fertilityWindowReminders:
              data.notificationSettings?.fertilityWindowReminders || false,
          },
          privacyMode: data.privacyMode || false,
        });
      } catch (err) {
        console.error("Error fetching profile data:", err);
        toast({
          title: "Error",
          description: "Failed to load profile data.",
          variant: "destructive",
        });
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    fetchProfileData();
  }, [navigate, toast]);

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      await axios.put(
        "http://localhost:5000/api/users/me",
        {
          name: profileData.name,
          age: parseInt(profileData.age),
          lastPeriodDate: profileData.lastPeriod || null,
          cycleLength: profileData.cycleLength
            ? parseInt(profileData.cycleLength)
            : null,
          notificationSettings: profileData.notificationSettings,
          hasStartedMenstruating:
            !!profileData.lastPeriod && !!profileData.cycleLength,
          privacyMode: profileData.privacyMode,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Profile Updated! 🌸",
        description: "Your changes have been saved successfully.",
      });
    } catch (err) {
      console.error("Error saving profile:", err);
      toast({
        title: "Error",
        description: "Failed to save profile data.",
        variant: "destructive",
      });
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const maskSensitiveData = (text: string) =>
    profileData.privacyMode ? "*".repeat(text.length) : text;

  const maskEmail = (email: string) => {
    if (!profileData.privacyMode) return email;
    const [u, d] = email.split("@");
    return `${"*".repeat(u.length)}@${d}`;
  };

  const maskDate = (date: string) =>
    profileData.privacyMode ? "****-**-**" : date;

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
          <button className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              My Profile
            </h1>
          </button>
          <div className="w-20 text-sm text-teal-700 flex items-center justify-end">
            {profileData.privacyMode && (
              <>
                <EyeOff className="w-4 h-4 mr-1" />
                Private
              </>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Personal Info */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5 text-rose-500" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={maskSensitiveData(profileData.name)}
                  onChange={(e) =>
                    setProfileData({ ...profileData, name: e.target.value })
                  }
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={maskEmail(profileData.email)}
                  onChange={(e) =>
                    setProfileData({ ...profileData, email: e.target.value })
                  }
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label>Age</Label>
                <Input
                  value={maskSensitiveData(profileData.age)}
                  onChange={(e) =>
                    setProfileData({ ...profileData, age: e.target.value })
                  }
                  disabled={profileData.privacyMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Cycle Info */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <Calendar className="w-5 h-5 text-purple-500" />
                Cycle Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Last Period Start Date</Label>
                <Input
                  type="date"
                  value={maskDate(profileData.lastPeriod)}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      lastPeriod: e.target.value,
                    })
                  }
                  disabled={profileData.privacyMode}
                />
              </div>
              <div className="space-y-2">
                <Label>Average Cycle Length (days)</Label>
                <Input
                  type="number"
                  value={maskSensitiveData(profileData.cycleLength)}
                  onChange={(e) =>
                    setProfileData({
                      ...profileData,
                      cycleLength: e.target.value,
                    })
                  }
                  disabled={profileData.privacyMode}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Notifications */}
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
                  <Label>Period Reminders</Label>
                  <p className="text-sm text-gray-600">
                    Get reminders for your period
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={
                    profileData.notificationSettings.periodReminders
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      notificationSettings: {
                        ...profileData.notificationSettings,
                        periodReminders:
                          !profileData.notificationSettings.periodReminders,
                      },
                    })
                  }
                >
                  <Bell className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Fertility Window Reminders</Label>
                  <p className="text-sm text-gray-600">
                    Get reminders for fertility window
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={
                    profileData.notificationSettings.fertilityWindowReminders
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      notificationSettings: {
                        ...profileData.notificationSettings,
                        fertilityWindowReminders:
                          !profileData.notificationSettings
                            .fertilityWindowReminders,
                      },
                    })
                  }
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Privacy Mode</Label>
                  <p className="text-sm text-gray-600">
                    Hide sensitive information and disable editing
                  </p>
                </div>
                <Button
                  size="sm"
                  variant={profileData.privacyMode ? "default" : "outline"}
                  onClick={() =>
                    setProfileData({
                      ...profileData,
                      privacyMode: !profileData.privacyMode,
                    })
                  }
                >
                  {profileData.privacyMode ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
            <CardContent className="p-6 space-y-4">
              <Button
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                disabled={profileData.privacyMode}
              >
                {profileData.privacyMode
                  ? "Disable Privacy Mode to Save"
                  : "Save Changes"}
              </Button>
              <Button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
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
