import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Shield, BookOpen, MessageCircle, Calendar, Award, Mail, Phone, MapPin } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const features = [
    {
      icon: MessageCircle,
      title: "Ask Chori",
      description: "24/7 AI chatbot for period questions and support"
    },
    {
      icon: Calendar,
      title: "Period Tracker",
      description: "Personalized cycle tracking with predictions"
    },
    {
      icon: Heart,
      title: "Daily Motivation",
      description: "Positive quotes to boost your confidence"
    },
    {
      icon: BookOpen,
      title: "Menstruation 101",
      description: "Educational videos and resources"
    },
    {
      icon: Award,
      title: "Wellness Streaks",
      description: "Gamified rewards for healthy habits"
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is secure and confidential"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-teal-50">
      {/* Header */}
      <header className="px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-rose-100">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text text-transparent">
              CHORI
            </h1>
          </button>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="border-rose-200 text-rose-700 hover:bg-rose-50"
            >
              Log In
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Your Compassionate
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent block">
              Menstrual Wellness Companion
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            CHORI empowers you with AI support, period tracking, education, and motivation—all in a safe, 
            judgment-free space designed especially for first-time menstruators.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate('/signup')}
              className="bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-lg px-8 py-3"
            >
              Get Started Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate('/demo')}
              className="border-rose-200 text-rose-700 hover:bg-rose-50 text-lg px-8 py-3"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-16 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Everything You Need in One Safe Space
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Privacy Section */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl p-8 text-white">
            <Shield className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h3 className="text-2xl font-bold mb-4">Your Privacy is Sacred</h3>
            <p className="text-lg leading-relaxed opacity-95">
              Your menstrual health data is personal. We use secure encryption, never share your information, 
              and offer anonymous profiles with optional PIN/biometric locks for complete peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16 bg-gradient-to-r from-rose-500 to-purple-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Start Your Wellness Journey?</h3>
          <p className="text-xl mb-8 opacity-95">
            Join thousands who trust CHORI for compassionate period care and support.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/signup')}
            className="bg-white text-rose-600 hover:bg-gray-50 text-lg px-8 py-3 font-semibold"
          >
            Sign Up to Get Started
          </Button>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">CHORI</span>
              </button>
              <p className="text-gray-400 text-sm mb-4">
                Care, Health, and Openness for Reproductive Insight
              </p>
              <p className="text-gray-400 text-sm">
                Empowering first-time menstruators with compassionate AI support and comprehensive wellness tools.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => navigate('/signup')} className="text-gray-400 hover:text-white transition-colors">Get Started</button></li>
                <li><button onClick={() => navigate('/demo')} className="text-gray-400 hover:text-white transition-colors">Watch Demo</button></li>
                <li><button onClick={() => navigate('/login')} className="text-gray-400 hover:text-white transition-colors">Login</button></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-gray-400">Period Tracking</li>
                <li className="text-gray-400">AI Chatbot Support</li>
                <li className="text-gray-400">Educational Resources</li>
                <li className="text-gray-400">Wellness Streaks</li>
              </ul>
            </div>

            {/* Contact & Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-400">
                  <Mail className="w-3 h-3" />
                  support@chori.app
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Phone className="w-3 h-3" />
                  24/7 AI Support
                </li>
                <li className="flex items-center gap-2 text-gray-400">
                  <Shield className="w-3 h-3" />
                  Privacy Guaranteed
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 CHORI. All rights reserved. Made with 💝 for menstrual wellness.
              </p>
              <div className="flex gap-6 text-sm">
                <button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button>
                <button className="text-gray-400 hover:text-white transition-colors">Terms of Service</button>
                <button className="text-gray-400 hover:text-white transition-colors">Cookie Policy</button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
