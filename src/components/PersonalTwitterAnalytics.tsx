import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TweetEmbed } from './ui/tweet-embed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
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
        const response = await fetch('/twitter_analytics.csv');
        const text = await response.text();
        
        // Parse CSV - simple split approach
        const lines = text.trim().split('\n');
        const data: AnalyticsData[] = [];
        
        // Parse data rows (skip header)
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          // Split by comma, handling quoted values
          const values: string[] = [];
          let currentValue = '';
          let insideQuotes = false;
          
          for (let j = 0; j < line.length; j++) {
            const char = line[j];
            
            if (char === '"') {
              insideQuotes = !insideQuotes;
            } else if (char === ',' && !insideQuotes) {
              values.push(currentValue.trim());
              currentValue = '';
            } else {
              currentValue += char;
            }
          }
          values.push(currentValue.trim());
          
          if (values.length >= 12) {
            data.push({
              date: values[0],
              impressions: parseInt(values[1]) || 0,
              likes: parseInt(values[2]) || 0,
              engagements: parseInt(values[3]) || 0,
              bookmarks: parseInt(values[4]) || 0,
              shares: parseInt(values[5]) || 0,
              newFollows: parseInt(values[6]) || 0,
              unfollows: parseInt(values[7]) || 0,
              replies: parseInt(values[8]) || 0,
              reposts: parseInt(values[9]) || 0,
              profileVisits: parseInt(values[10]) || 0,
              createPost: parseInt(values[11]) || 0,
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
    'https://x.com/Not_A_De_Gen/status/1980200790644953487',
    'https://x.com/Not_A_De_Gen/status/1979597816960876580',
    'https://x.com/Not_A_De_Gen/status/1979121316616704202',
    'https://x.com/Not_A_De_Gen/status/1978028884378460391',
    'https://x.com/Not_A_De_Gen/status/1977707525999894604',
    'https://x.com/Not_A_De_Gen/status/1977666183529713666',
    'https://x.com/Not_A_De_Gen/status/1977296799694979104',
    'https://x.com/Not_A_De_Gen/status/1976637330871226390',
    'https://x.com/Not_A_De_Gen/status/1976553246022930831',
    'https://x.com/Not_A_De_Gen/status/1975832907471098024',
    'https://x.com/Not_A_De_Gen/status/1975550688316039516',
    'https://x.com/Not_A_De_Gen/status/1975498027629519010',
    'https://x.com/Not_A_De_Gen/status/1975294657858097244',
    'https://x.com/Not_A_De_Gen/status/1974188594651652350',
    'https://x.com/Not_A_De_Gen/status/1974038994603110860',
    'https://x.com/Not_A_De_Gen/status/1973393010311438410',
    'https://x.com/Not_A_De_Gen/status/1973130333567455432',
    'https://x.com/Not_A_De_Gen/status/1973114786947760618',
    'https://x.com/Not_A_De_Gen/status/1972564808118468829',
    'https://x.com/Not_A_De_Gen/status/1971920337446097317',
    'https://x.com/Not_A_De_Gen/status/1971548144006463875',
    'https://x.com/Not_A_De_Gen/status/1970961077782409724',
    'https://x.com/Not_A_De_Gen/status/1969390872979783796',
    'https://x.com/Not_A_De_Gen/status/1968645277583065509',
    'https://x.com/Not_A_De_Gen/status/1968605874374541325',
    'https://x.com/Not_A_De_Gen/status/1968357099815186513',
    'https://x.com/Not_A_De_Gen/status/1967563312616403022',
    'https://x.com/Not_A_De_Gen/status/1967216357864591374',
    'https://x.com/Not_A_De_Gen/status/1966487123516924286',
    'https://x.com/Not_A_De_Gen/status/1966428465366028783',
    'https://x.com/Not_A_De_Gen/status/1966239519948357752',
    'https://x.com/Not_A_De_Gen/status/1965131867797311621',
    'https://x.com/Not_A_De_Gen/status/1965043312303423559',
    'https://x.com/Not_A_De_Gen/status/1962479703291531583',
    'https://x.com/Not_A_De_Gen/status/1961004125715673581',
    'https://x.com/Not_A_De_Gen/status/1960099979969667136',
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
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="posts">Best Posts</TabsTrigger>
        </TabsList>

        <TabsContent value="analytics" className="space-y-6">
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
                  Last 4 weeks
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
          </div>
        </TabsContent>

        <TabsContent value="posts" className="space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-foreground">Twitter Timeline</h2>
            <p className="text-muted-foreground">Recent posts from @Not_A_De_Gen</p>
          </div>

          <ScrollArea className="h-[800px] w-full rounded-lg border border-border bg-card p-4">
            <div className="space-y-6 max-w-2xl mx-auto">
              {topTweets.map((tweetUrl, index) => (
                <div key={index} className="w-full">
                  <TweetEmbed tweetUrl={tweetUrl} className="w-full" />
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PersonalTwitterAnalytics;
