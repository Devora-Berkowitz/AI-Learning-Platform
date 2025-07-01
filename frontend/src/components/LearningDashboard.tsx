import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { User, Category, SubCategory, Prompt } from '@/types/types';
import { useToast } from '@/hooks/use-toast';
import { getCategories, getSubCategories, sendPrompt, getUserHistory } from '@/api/api';
import { BookOpen, History, User as UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const LearningDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [userPrompts, setUserPrompts] = useState<Prompt[]>([]);
  const [activeTab, setActiveTab] = useState<'learn' | 'history'>('learn');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('learning_platform_current_user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    const parsedUser: User = JSON.parse(storedUser);
    setUser(parsedUser);

    const fetchInitialData = async () => {
      const categoriesData = await getCategories();
      setCategories(categoriesData);
      const historyData = await getUserHistory(parsedUser.id);
      setUserPrompts(historyData);
    };
    fetchInitialData();
  }, [navigate]);

  const handleCategoryChange = async (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory('');
    const subCategoriesData = await getSubCategories(categoryId);
    setSubCategories(subCategoriesData);
  };

  const handleSubCategoryChange = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedCategory || !selectedSubCategory || !prompt.trim()) {
      toast({
        title: "Error",
        description: "Please select category, subcategory, and enter a prompt",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const res = await sendPrompt(selectedCategory, selectedSubCategory, prompt);
      setResponse(res.response);
      setUserPrompts(prev => [res, ...prev]);
      toast({
        title: "Lesson Generated!",
        description: "Your AI-powered lesson is ready",
      });
    } catch {
      toast({
        title: "Error",
        description: "Failed to generate lesson. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <div className="w-full flex justify-between items-center border-b border-gray-300 pb-3 mb-6">
          <Link to="/" className="text-blue-600 hover:underline">
            Home
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">AI Learning Platform</h1>
          <div className="flex items-center space-x-2 text-gray-600">
            <UserIcon className="h-5 w-5" />
            <span>{user.name}</span>
          </div>
        </div>
        <div className="flex space-x-4 mb-6">
          <Button
            onClick={() => setActiveTab('learn')}
            variant={activeTab === 'learn' ? 'default' : 'outline'}>
            <BookOpen className="h-4 w-4" /> Learn
          </Button>
          <Button
            onClick={() => setActiveTab('history')}
            variant={activeTab === 'history' ? 'default' : 'outline'}>
            <History className="h-4 w-4" /> Learning History
          </Button>
        </div>

        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Learning</CardTitle>
                <CardDescription>Select a topic and generate lesson</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedSubCategory}
                    onValueChange={handleSubCategoryChange}
                    disabled={!selectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                      {subCategories.map(s => (
                        <SelectItem key={s.id} value={s.id.toString()}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Textarea
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    placeholder="Enter your prompt..."
                    rows={3}
                  />
                  <Button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700">
                    {isGenerating ? 'Generating...' : 'Generate Lesson'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {response && (
              <Card>
                <CardHeader>
                  <CardTitle>Your AI-Generated Lesson</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-gray-700">{response}</div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Your Learning History</h2>
            {userPrompts.map(p => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.prompt}</CardTitle>
                  {/* שינינו מ-CardDescription ל-div עם קלאסים דומים */}
                  <div className="flex space-x-2 items-center text-sm text-gray-500 mt-1">
                    <Badge>{p.category_name}</Badge>
                    <Badge>{p.sub_category_name}</Badge>
                    <span className="text-xs">{formatDate(p.created_at)}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap max-h-40 overflow-y-auto text-gray-700">{p.response}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningDashboard;
