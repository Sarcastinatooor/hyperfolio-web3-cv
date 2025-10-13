import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TweetEmbed } from './ui/tweet-embed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from 'recharts';
import { TrendingUp, Users, Heart, MessageCircle, Eye, Calendar } from 'lucide-react';

interface AnalyticsData {
  date: string;
  impressions: number;
  likes: number;
  engagements: number;
  bookmarks: number;
  shares: number;
  newFollows: number;
  unfollows: number;
  replies: number;
  reposts: number;
  profileVisits: number;
  createPost: number;
}

const PersonalTwitterAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        const response = await fetch('/src/data/twitter_analytics.csv');
        const text = await response.text();
        
        // Parse CSV
        const lines = text.split('\n');
        const headers = lines[0].split(',');
        
        const data: AnalyticsData[] = [];
        
        // Parse data rows (skip header)
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue;
          
          const values = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
          const cleanValues = values.map(v => v.replace(/^"|"$/g, '').trim());
          
          if (cleanValues.length >= 13) {
            data.push({
              date: cleanValues[0],
              impressions: parseInt(cleanValues[1]) || 0,
              likes: parseInt(cleanValues[2]) || 0,
              engagements: parseInt(cleanValues[3]) || 0,
              bookmarks: parseInt(cleanValues[4]) || 0,
              shares: parseInt(cleanValues[5]) || 0,
              newFollows: parseInt(cleanValues[6]) || 0,
              unfollows: parseInt(cleanValues[7]) || 0,
              replies: parseInt(cleanValues[8]) || 0,
              reposts: parseInt(cleanValues[9]) || 0,
              profileVisits: parseInt(cleanValues[10]) || 0,
              createPost: parseInt(cleanValues[11]) || 0,
            });
          }
        }
        
        // Get last 4 weeks (28 days)
        const last4Weeks = data.slice(0, 28).reverse();
        setAnalyticsData(last4Weeks);
        setLoading(false);
      } catch (error) {
        console.error('Error loading CSV:', error);
        setLoading(false);
      }
    };

    loadCSVData();
  }, []);

  // Calculate totals
  const totals = analyticsData.reduce((acc, day) => ({
    impressions: acc.impressions + day.impressions,
    likes: acc.likes + day.likes,
    engagements: acc.engagements + day.engagements,
    newFollows: acc.newFollows + day.newFollows,
    profileVisits: acc.profileVisits + day.profileVisits,
    replies: acc.replies + day.replies,
    reposts: acc.reposts + day.reposts,
    createPost: acc.createPost + day.createPost,
  }), {
    impressions: 0,
    likes: 0,
    engagements: 0,
    newFollows: 0,
    profileVisits: 0,
    replies: 0,
    reposts: 0,
    createPost: 0,
  });

  const engagementRate = totals.impressions > 0 
    ? ((totals.engagements / totals.impressions) * 100).toFixed(2)
    : '0.00';

  // Top performing tweets from @Not_A_De_Gen
  const topTweets = [
    'https://x.com/Not_A_De_Gen/status/1844346447556907343',
    'https://x.com/Not_A_De_Gen/status/1844329656932192283',
    'https://x.com/Not_A_De_Gen/status/1843895636453884315',
    'https://x.com/Not_A_De_Gen/status/1843887086091194803',
  ];

  // Format chart data
  const chartData = analyticsData.map(d => ({
    date: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    impressions: d.impressions,
    engagements: d.engagements,
    likes: d.likes,
    profileVisits: d.profileVisits,
  }));

  const chartConfig = {
    impressions: {
      label: "Impressions",
      color: "hsl(var(--primary))",
    },
    engagements: {
      label: "Engagements",
      color: "hsl(var(--secondary))",
    },
    likes: {
      label: "Likes",
      color: "hsl(var(--accent))",
    },
  };

  if (loading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="p-6">
          <div className="text-center text-gray-400">Loading analytics...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="analytics" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-gray-800">
          <TabsTrigger value="analytics">Twitter Analytics</TabsTrigger>
          <TabsTrigger value="posts">Best Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-foreground">Personal Twitter Analytics</h2>
            <p className="text-muted-foreground">Last 4 weeks performance (Sep 16 - Oct 13, 2025)</p>
          </div>

          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Impressions</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-2">
                  {(totals.impressions / 1000).toFixed(1)}K
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.createPost} posts created
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium text-muted-foreground">Total Likes</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-2">
                  {totals.likes}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Avg {(totals.likes / totals.createPost).toFixed(1)} per post
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-muted-foreground">Engagement Rate</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-2">
                  {engagementRate}%
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.engagements} total engagements
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">New Followers</span>
                </div>
                <div className="text-2xl font-bold text-foreground mt-2">
                  {totals.newFollows}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {totals.profileVisits} profile visits
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Timeline */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Engagement Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="impressions" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="engagements" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--secondary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Daily Performance */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Daily Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="likes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Detailed Metrics */}
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Detailed Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Replies</p>
                  <p className="text-2xl font-bold text-foreground">{totals.replies}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Reposts</p>
                  <p className="text-2xl font-bold text-foreground">{totals.reposts}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Profile Visits</p>
                  <p className="text-2xl font-bold text-foreground">{totals.profileVisits}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Posts Created</p>
                  <p className="text-2xl font-bold text-foreground">{totals.createPost}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-foreground">Best Performing Posts</h2>
            <p className="text-muted-foreground">Top posts from @Not_A_De_Gen</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {topTweets.map((tweetUrl, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-white">Post #{index + 1}</CardTitle>
                    <Badge variant="secondary">Top Performer</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <TweetEmbed tweetUrl={tweetUrl} className="w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalTwitterAnalytics;
