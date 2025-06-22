import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Apple, ArrowLeft, Heart, Zap, Shield, BookmarkCheck, ChefHat, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const DietTips = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [savedTips, setSavedTips] = useState<string[]>([]);
  const [currentDay, setCurrentDay] = useState(0);

  // Get current day of week for dynamic diet plan
  useEffect(() => {
    const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
    setCurrentDay(today);
  }, []);

  const dailyDietPlans = [
    {
      day: "Sunday",
      theme: "Self-Care Sunday",
      color: "from-purple-400 to-pink-400",
      foods: [
        { name: "Chamomile Tea", benefit: "Calming and soothing", tips: "Perfect for relaxation" },
        { name: "Dark Chocolate", benefit: "Mood booster & magnesium", tips: "70% cocoa for best benefits" },
        { name: "Yogurt with Berries", benefit: "Probiotics and antioxidants", tips: "Add honey for sweetness" },
        { name: "Herbal Smoothie", benefit: "Nutrient-packed", tips: "Blend spinach, banana, and almond milk" }
      ]
    },
    {
      day: "Monday",
      theme: "Energy Monday",
      color: "from-yellow-400 to-orange-400",
      foods: [
        { name: "Banana", benefit: "Quick energy and potassium", tips: "Great pre-workout snack" },
        { name: "Oatmeal", benefit: "Sustained energy release", tips: "Top with nuts and fruits" },
        { name: "Green Tea", benefit: "Gentle caffeine boost", tips: "Rich in antioxidants" },
        { name: "Quinoa Salad", benefit: "Complete protein", tips: "Mix with vegetables" }
      ]
    },
    {
      day: "Tuesday",
      theme: "Iron-Rich Tuesday",
      color: "from-red-400 to-rose-400",
      foods: [
        { name: "Spinach", benefit: "High in iron and folate", tips: "Add to smoothies or salads" },
        { name: "Lean Red Meat", benefit: "Heme iron absorption", tips: "Pair with vitamin C foods" },
        { name: "Lentils", benefit: "Plant-based iron", tips: "Cook with turmeric" },
        { name: "Pumpkin Seeds", benefit: "Iron and magnesium", tips: "Sprinkle on yogurt or salad" }
      ]
    },
    {
      day: "Wednesday",
      theme: "Hydration Wednesday",
      color: "from-blue-400 to-cyan-400",
      foods: [
        { name: "Cucumber Water", benefit: "Hydrating and refreshing", tips: "Add mint for flavor" },
        { name: "Watermelon", benefit: "High water content", tips: "Perfect summer hydrator" },
        { name: "Coconut Water", benefit: "Natural electrolytes", tips: "Post-workout drink" },
        { name: "Herbal Teas", benefit: "Hydration with benefits", tips: "Try peppermint or ginger" }
      ]
    },
    {
      day: "Thursday",
      theme: "Anti-Inflammatory Thursday",
      color: "from-green-400 to-teal-400",
      foods: [
        { name: "Salmon", benefit: "Omega-3 fatty acids", tips: "Grill with herbs" },
        { name: "Turmeric", benefit: "Powerful anti-inflammatory", tips: "Add to golden milk" },
        { name: "Ginger", benefit: "Reduces inflammation", tips: "Fresh ginger tea" },
        { name: "Berries", benefit: "Antioxidants", tips: "Mix different varieties" }
      ]
    },
    {
      day: "Friday",
      theme: "Feel-Good Friday",
      color: "from-pink-400 to-purple-400",
      foods: [
        { name: "Avocado", benefit: "Healthy fats for mood", tips: "Perfect for toast" },
        { name: "Dark Leafy Greens", benefit: "Folate for mental health", tips: "Kale and broccoli" },
        { name: "Walnuts", benefit: "Brain-healthy omega-3s", tips: "Add to oatmeal" },
        { name: "Sweet Potato", benefit: "Complex carbs for serotonin", tips: "Roast with cinnamon" }
      ]
    },
    {
      day: "Saturday",
      theme: "Strength Saturday",
      color: "from-orange-400 to-red-400",
      foods: [
        { name: "Greek Yogurt", benefit: "Protein for muscle recovery", tips: "Add nuts and seeds" },
        { name: "Eggs", benefit: "Complete protein source", tips: "Try different preparations" },
        { name: "Chickpeas", benefit: "Plant protein and fiber", tips: "Make hummus or roast them" },
        { name: "Almonds", benefit: "Protein and healthy fats", tips: "Small handful as snack" }
      ]
    }
  ];

  const todaysPlan = dailyDietPlans[currentDay];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const quickRecipes = [
    {
      name: "Period Power Smoothie",
      ingredients: ["1 banana", "1 cup spinach", "1/2 cup berries", "1 tbsp almond butter", "1 cup oat milk"],
      instructions: "Blend all ingredients until smooth. Rich in iron and natural energy!",
      time: "5 mins"
    },
    {
      name: "Comfort Bowl",
      ingredients: ["1 cup quinoa", "Roasted sweet potato", "Steamed broccoli", "Avocado slices", "Tahini dressing"],
      instructions: "Combine cooked quinoa with roasted vegetables. Drizzle with tahini dressing.",
      time: "25 mins"
    },
    {
      name: "Anti-Cramp Tea Blend",
      ingredients: ["Fresh ginger", "Chamomile tea bag", "Honey", "Lemon slice"],
      instructions: "Steep ginger and chamomile in hot water for 5 minutes. Add honey and lemon.",
      time: "8 mins"
    }
  ];

  const toggleSaveTip = (tip: string) => {
    const isAlreadySaved = savedTips.includes(tip);
    setSavedTips(prev => 
      isAlreadySaved
        ? prev.filter(t => t !== tip)
        : [...prev, tip]
    );

    toast({
      title: isAlreadySaved ? "Tip Removed" : "Tip Saved! 📚",
      description: isAlreadySaved 
        ? "Tip removed from your saved list"
        : "You can view all saved tips in your Profile section",
    });
  };

  const handleTryRecipe = (recipeName: string) => {
    toast({
      title: "Recipe Added to Your Collection! 👩‍🍳",
      description: `${recipeName} has been saved to your Profile. You can access it anytime from the Recipe Collection section.`,
    });
  };

  const changeDay = (dayIndex: number) => {
    setCurrentDay(dayIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
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
              <Apple className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              Daily Diet Plan
            </h1>
          </div>
          <Button 
            variant="outline" 
            onClick={() => navigate('/profile')}
            className="border-rose-200 text-rose-700 hover:bg-rose-50"
          >
            <BookmarkCheck className="w-4 h-4 mr-2" />
            View Saved ({savedTips.length})
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Day Selector */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
              <Calendar className="w-5 h-5" />
              Choose Your Day
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {dayNames.map((day, index) => (
                <Button
                  key={day}
                  variant={index === currentDay ? "default" : "outline"}
                  onClick={() => changeDay(index)}
                  className={`text-xs p-2 ${
                    index === currentDay 
                      ? `bg-gradient-to-r ${dailyDietPlans[index].color} text-white` 
                      : "border-rose-200 hover:bg-rose-50"
                  }`}
                >
                  {day.slice(0, 3)}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Today's Diet Plan */}
        <Card className={`border-0 shadow-lg bg-gradient-to-r ${todaysPlan.color} text-white mb-8`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Heart className="w-6 h-6" />
              {todaysPlan.theme} - {todaysPlan.day}
            </CardTitle>
            <p className="opacity-90">Special foods curated for your wellness today</p>
          </CardHeader>
        </Card>

        {/* Daily Foods */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Today's Recommended Foods</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {todaysPlan.foods.map((food, foodIndex) => (
                <Card 
                  key={foodIndex} 
                  className="border-2 border-rose-100 hover:border-rose-300 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">{food.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{food.benefit}</p>
                    <p className="text-xs text-rose-600 mb-3 italic">{food.tips}</p>
                    <Button
                      size="sm"
                      variant={savedTips.includes(food.name) ? "default" : "outline"}
                      onClick={() => toggleSaveTip(food.name)}
                      className={`w-full ${savedTips.includes(food.name) ? "bg-rose-500 hover:bg-rose-600" : ""}`}
                    >
                      {savedTips.includes(food.name) ? "Saved!" : "Save Tip"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Recipes */}
        <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Quick & Easy Recipes</CardTitle>
            <p className="text-gray-600">Simple recipes to nourish your body during your cycle</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {quickRecipes.map((recipe, index) => (
                <Card key={index} className="border-2 border-purple-100 hover:border-purple-300 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-800">{recipe.name}</h3>
                      <span className="text-sm text-purple-600 bg-purple-100 px-2 py-1 rounded">{recipe.time}</span>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Ingredients:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {recipe.ingredients.map((ingredient, i) => (
                          <li key={i}>• {ingredient}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-700 mb-2">Instructions:</h4>
                      <p className="text-sm text-gray-600">{recipe.instructions}</p>
                    </div>
                    
                    <Button
                      size="sm"
                      onClick={() => handleTryRecipe(recipe.name)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      <ChefHat className="w-4 h-4 mr-2" />
                      Save Recipe
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hydration Reminder */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-teal-500 to-cyan-500 text-white mt-8">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Apple className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Don't Forget to Hydrate! 💧</h3>
            <p className="opacity-95">
              Drink plenty of water throughout your cycle. Add lemon, cucumber, or mint for variety. 
              Proper hydration helps reduce bloating and keeps you feeling your best!
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DietTips;
