import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, Brain, Zap } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem('learning_platform_current_user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg">
                <Brain className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Learning Platform</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Learn Anything with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> AI-Powered</span>
              <br />
              Personalized Lessons
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Select your topic, ask questions, and receive instant, comprehensive lessons
              tailored to your learning style. From science to technology, history to literature.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                onClick={() => {
                  const storedUser = localStorage.getItem('learning_platform_current_user');
                  if (storedUser) {
                    navigate('/learning');
                  } else {
                    navigate('/login');
                  }
                }}
              >
                Start Learning Now
              </Button>
              {user?.role === 'admin' && (
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                  onClick={() => navigate("/admin")}
                >
                  <Users className="h-5 w-5 mr-2" />
                  Admin Dashboard
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Get started with AI-powered learning in three simple steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Choose Your Topic</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Browse through categories like Science, Technology, Mathematics, History, and Literature.
                  Select the specific subcategory you want to explore.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl">Ask AI Anything</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Submit your learning prompt or question. Our AI will analyze your request
                  and generate a comprehensive, personalized lesson just for you.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl">Learn & Track</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Receive instant, detailed lessons and track your learning progress.
                  Access your complete learning history anytime, anywhere.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of learners who are already using AI to accelerate their education
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="text-lg px-8 py-3 bg-white text-blue-600 hover:bg-gray-100"
            onClick={() => navigate('/about')}
          >
            Learn More About Us
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 AI Learning Platform. Powered by OpenAI and built with modern web technologies.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;


