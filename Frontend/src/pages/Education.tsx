import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, ArrowLeft, Play, Award, Heart, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const Education = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [completedVideos, setCompletedVideos] = useState<string[]>([]);
  const [currentlyWatching, setCurrentlyWatching] = useState<string | null>(null);

useEffect(() => {
  const fetchProgress = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/users/video-progress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const videoProgress = res.data.videoProgress || {};
      const completed = Object.keys(videoProgress).filter((key) => videoProgress[key] === true);
      setCompletedVideos(completed);
    } catch (err) {
      console.error("Failed to load progress", err);
    }
  };
  fetchProgress();
}, []);


 const markComplete = async (videoId: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  try {
    await axios.put("http://localhost:5000/api/users/video-progress", {
      videoId,
      completed: true,
    }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setCompletedVideos((prev) => [...prev, videoId]);
  } catch (err) {
    console.error("Error saving progress", err);
  }
};


  const startWatching = (videoId: string, videoTitle: string, url?: string) => {
    setCurrentlyWatching(videoId);
    toast({
      title: "Now Watching! 📻",
      description: `Started watching "${videoTitle}". Redirecting you now...`,
    });

    setTimeout(() => {
      if (url) window.open(url, "_blank");
      finishVideo(videoId, videoTitle);
    }, 1000);
  };

  const finishVideo = (videoId: string, videoTitle: string) => {
    if (!completedVideos.includes(videoId)) {
      markComplete(videoId);
      toast({
        title: "Video Completed! 🎉",
        description: `Great job! You've completed "${videoTitle}". Keep learning!`,
      });
    }
    setCurrentlyWatching(null);
  };

  const videoSections = [
    {
      title: "Getting Started",
      videos: [
        {
          id: "1",
          title: "What is Menstruation?",
          duration: "0:48",
          description: "A gentle introduction to periods and what they mean",
          url: "https://www.youtube.com/watch?v=zcvo9VLVHWc",
        },
        {
          id: "2",
          title: "Your First Period",
          duration: "2:30",
          description: "What to expect and how to prepare",
          url: "https://www.youtube.com/watch?v=SqnZnA3BpPY",
        },
        {
          id: "3",
          title: "Period Products Explained",
          duration: "2:48",
          description: "Pads, tampons, cups - what works for you?",
          url: "https://www.youtube.com/watch?v=UfK17D0eX5I",
        },
      ],
    },
    {
      title: "Managing Your Period",
      videos: [
        {
          id: "4",
          title: "Hygiene During Your Period",
          duration: "1:38",
          description: "Stay clean and comfortable",
          url: "https://www.youtube.com/watch?v=qFLElwY-SYE",
        },
        {
          id: "5",
          title: "Dealing with Cramps",
          duration: "1:44",
          description: "Natural ways to manage period pain",
          url: "https://www.youtube.com/watch?v=E1BGQoVaynU",
        },
        {
          id: "6",
          title: "Period Emergencies",
          duration: "5:36",
          description: "What to do when caught unprepared",
          url: "https://www.youtube.com/watch?v=PeL_XtBrOxw",
        },
      ],
    },
    {
      title: "Understanding Your Body",
      videos: [
        {
          id: "7",
          title: "Your Menstrual Cycle Explained",
          duration: "9:42",
          description: "The four phases of your cycle",
          url: "https://www.youtube.com/watch?v=3Lt9I5LrWZw",
        },
        {
          id: "8",
          title: "Tracking Your Period",
          duration: "4:09",
          description: "Why and how to track your cycle",
          url: "https://www.youtube.com/watch?v=W8uh0_btzOg",
        },
        {
          id: "9",
          title: "When to See a Doctor",
          duration: "2:55",
          description: "Signs that need medical attention",
          url: "https://www.youtube.com/watch?v=m_QWSwqvTXE",
        },
      ],
    },
  ];

  const totalVideos = videoSections.reduce((acc, section) => acc + section.videos.length, 0);
  const progressPercentage = (completedVideos.length / totalVideos) * 100;

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
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Menstruation 101
            </h1>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" /> Your Learning Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Videos Completed: {completedVideos.length}/{totalVideos}</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-3">
              <div className="bg-white h-3 rounded-full transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          {videoSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-800">{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.videos.map((video) => (
                    <Card
                      key={video.id}
                      className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        completedVideos.includes(video.id)
                          ? "border-green-300 bg-green-50"
                          : currentlyWatching === video.id
                          ? "border-blue-300 bg-blue-50"
                          : "border-rose-200 hover:border-rose-300"
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center ${
                              completedVideos.includes(video.id)
                                ? "bg-green-500"
                                : currentlyWatching === video.id
                                ? "bg-blue-500 animate-pulse"
                                : "bg-gradient-to-r from-rose-400 to-purple-400"
                            }`}
                          >
                            {completedVideos.includes(video.id) ? (
                              <Check className="w-5 h-5 text-white" />
                            ) : (
                              <Play className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <span className="text-sm text-gray-500">{video.duration}</span>
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{video.description}</p>
                        <Button
                          size="sm"
                          className={`w-full ${
                            completedVideos.includes(video.id)
                              ? "bg-green-500 hover:bg-green-600"
                              : currentlyWatching === video.id
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
                          }`}
                          onClick={() =>
                            !completedVideos.includes(video.id) &&
                            currentlyWatching !== video.id &&
                            startWatching(video.id, video.title, video.url)
                          }
                          disabled={
                            completedVideos.includes(video.id) ||
                            currentlyWatching === video.id
                          }
                        >
                          {completedVideos.includes(video.id)
                            ? "Completed ✓"
                            : currentlyWatching === video.id
                            ? "Watching..."
                            : "Watch Now"}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-0 shadow-lg bg-gradient-to-r from-rose-500 to-purple-500 text-white mt-8">
          <CardContent className="p-6 text-center">
            <Heart className="w-8 h-8 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">You're Doing Amazing! 🌸</h3>
            <p className="opacity-95">
              Learning about your body is a powerful step towards health and confidence.
              Take your time, and remember - every question is a good question!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Education;
