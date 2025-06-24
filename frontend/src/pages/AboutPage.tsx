import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Rocket, Brain, Smile, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-200 to-blue-300 flex flex-col items-center py-12 px-4 relative">

      <div className="absolute top-4 left-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => (window.location.href = "/")}
          className="flex items-center space-x-2 text-blue-800 hover:text-blue-900"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </div>

      <h1 className="text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">Welcome to AI Learning Platform!</h1>
      <p className="text-xl text-blue-800 mb-10 text-center max-w-2xl animate-fade-in delay-200">
        Your personal 24/7 tutor – discover, ask and learn anything you want in a fun and easy way!
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-in delay-400">
        <Card className="bg-white shadow-2xl rounded-3xl p-8 border border-blue-200 hover:scale-105 transition-transform duration-300 max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center text-center">
            <Rocket className="h-12 w-12 text-blue-700 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Limitless Topics</h2>
            <p className="text-gray-700">
              Science, Technology, Math, Literature and more – all in one place, tailored for your curiosity.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-2xl rounded-3xl p-8 border border-blue-200 hover:scale-105 transition-transform duration-300 max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center text-center">
            <Brain className="h-12 w-12 text-blue-700 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Smart AI Lessons</h2>
            <p className="text-gray-700">
              Get personalized explanations instantly, designed to make learning clear and exciting.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-2xl rounded-3xl p-8 border border-blue-200 hover:scale-105 transition-transform duration-300 max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center text-center">
            <BookOpen className="h-12 w-12 text-blue-700 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Your Learning History</h2>
            <p className="text-gray-700">
              Easily track your progress, revisit past lessons and see how much you’ve grown.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-2xl rounded-3xl p-8 border border-blue-200 hover:scale-105 transition-transform duration-300 max-w-2xl mx-auto">
          <CardContent className="flex flex-col items-center text-center">
            <Smile className="h-12 w-12 text-blue-700 mb-4" />
            <h2 className="text-2xl font-semibold text-blue-700 mb-2">Fun & Easy</h2>
            <p className="text-gray-700">
              Learning has never been this enjoyable – made for curious minds of all ages!
            </p>
          </CardContent>
        </Card>
      </div>

      <Button
        size="lg"
        className="bg-blue-600 text-white font-bold rounded-full px-8 py-3 hover:bg-blue-700 transition-colors duration-300 animate-fade-in delay-600"
        onClick={() => (window.location.href = "/register")}
      >
        Get Started for Free
      </Button>
    </div>
  );
};

export default AboutPage;
