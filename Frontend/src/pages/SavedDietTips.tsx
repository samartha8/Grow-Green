import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, BookmarkCheck, Trash2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const SavedDietTips = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedTips, setSavedTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTips = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/saved-diet-tips", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSavedTips(res.data || []);
      } catch (err) {
        console.error("Error fetching tips:", err);
        toast({ title: "Error", description: "Failed to load saved tips", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTips();
  }, []);

  const removeTip = async (tipName: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/user/saved-diet-tips/${encodeURIComponent(tipName)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSavedTips((prev) => prev.filter((tip) => tip.name !== tipName));
      toast({ title: "Tip Removed", description: `${tipName} has been removed.` });
    } catch (err) {
      toast({ title: "Error", description: "Unable to remove tip.", variant: "destructive" });
    }
  };

  const categories = Array.from(new Set(savedTips.map((tip) => tip.category)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Button variant="ghost" onClick={() => navigate("/profile")} className="text-rose-700 hover:bg-rose-50">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Profile
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
              <BookmarkCheck className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              My Saved Diet Tips
            </h1>
          </div>
          <Button
            variant="outline"
            onClick={() => navigate("/diet-tips")}
            className="border-green-200 text-green-700 hover:bg-green-50"
          >
            Find More Tips
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Saved Diet Tips</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center text-gray-500">Loading...</p>
            ) : savedTips.length === 0 ? (
              <div className="text-center py-12">
                <BookmarkCheck className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Saved Tips Yet</h3>
                <p className="text-gray-600 mb-4">
                  Start saving diet tips to build your personal wellness library!
                </p>
                <Button
                  onClick={() => navigate("/diet-tips")}
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                >
                  Explore Diet Tips
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {categories.map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-500" /> {category}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {savedTips
                        .filter((tip) => tip.category === category)
                        .map((tip, index) => (
                          <Card key={index} className="border-2 border-green-100 hover:border-green-300 transition-all duration-300">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Heart className="w-4 h-4 text-green-600" />
                                  <h4 className="font-semibold text-gray-800">{tip.name}</h4>
                                </div>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => removeTip(tip.name)}
                                  className="text-red-500 hover:bg-red-50"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{tip.benefit}</p>
                              <p className="text-xs text-green-600 italic">{tip.tips}</p>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SavedDietTips;
