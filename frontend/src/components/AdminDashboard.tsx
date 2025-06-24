import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { User, Prompt } from '@/types/types';
import { getUsers, getAllPrompts } from '@/api/api';
import { Search, Users, BookOpen, ArrowLeft } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'prompts'>('users');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await getUsers();
        const promptsData = await getAllPrompts();
        setUsers(usersData ?? []);
        setPrompts(promptsData ?? []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (user.idNumber || '').includes(searchTerm)
  );

  const filteredPrompts = prompts.filter(prompt =>
    (prompt.prompt?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (prompt.category_name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (prompt.sub_category_name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const getUserPromptCount = (userId: string) =>
    prompts.filter(p => p.user_id === userId).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 ml-[-6rem]">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <Users className="h-8 w-8 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>
        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-3xl font-bold text-gray-900">{users.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Lessons</p>
                  <p className="text-3xl font-bold text-gray-900">{prompts.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Lessons/User</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {users.length > 0 ? (prompts.length / users.length).toFixed(1) : '0'}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search bar */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search users, prompts, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <Button
            variant={activeTab === 'users' ? 'default' : 'outline'}
            onClick={() => setActiveTab('users')}
            className="flex items-center space-x-2"
          >
            <Users className="h-4 w-4" />
            <span>Users ({filteredUsers.length})</span>
          </Button>
          <Button
            variant={activeTab === 'prompts' ? 'default' : 'outline'}
            onClick={() => setActiveTab('prompts')}
            className="flex items-center space-x-2"
          >
            <BookOpen className="h-4 w-4" />
            <span>All Prompts ({filteredPrompts.length})</span>
          </Button>
        </div>

        {/* Users list */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {filteredUsers.map(user => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{user.name}</h3>
                      <p className="text-gray-600">ID: {user.id}</p>
                      <p className="text-gray-600">Phone: {user.phone}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">
                        {getUserPromptCount(user.id)} lessons
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Prompts list */}
        {activeTab === 'prompts' && (
          <div className="space-y-4">
            {filteredPrompts.map(prompt => (
              <Card key={prompt.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{prompt.prompt}</CardTitle>
                      <CardDescription className="flex flex-col mt-2 space-y-1">
                        <span><strong>User Name:</strong> {prompt.user_name}</span>
                        <span><strong>User ID:</strong> {prompt.user_id}</span>
                        <span><strong>User Phone:</strong> {prompt.user_phone}</span>
                        <span><strong>Category:</strong> {prompt.category_name}</span>
                        <span><strong>Subcategory:</strong> {prompt.sub_category_name}</span>
                        <span className="text-xs text-gray-500">{formatDate(prompt.created_at)}</span>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-gray-700 leading-relaxed max-h-32 overflow-y-auto">
                    {prompt.response}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
