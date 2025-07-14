import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TweetEmbed } from './ui/tweet-embed';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, TrendingUp, Users, Heart, MessageCircle, Repeat2, Eye, Filter } from 'lucide-react';
import { Button } from './ui/button';

interface TwitterAnalyticsDashboardProps {
  startDate?: string;
}

interface CampaignData {
  id: string;
  name: string;
  date: string;
  category: 'giveaway' | 'product' | 'partnership' | 'educational';
  tweetUrl: string;
  metrics: {
    views: number;
    likes: number;
    retweets: number;
    replies: number;
    engagement: number;
    tvlImpact: string;
  };
}

interface EngagementDataPoint {
  month: string;
  followers: number;
  engagement: number;
  tweets: number;
  avgViews: number;
}

const TwitterAnalyticsDashboard: React.FC<TwitterAnalyticsDashboardProps> = ({ startDate = "2024-01" }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  // Mock comprehensive campaign data
  const campaigns: CampaignData[] = [
    {
      id: '1',
      name: 'ARB Incentive Giveaway',
      date: '2024-05-27',
      category: 'giveaway',
      tweetUrl: 'https://x.com/BrahmaFi/status/1798777910297497717',
      metrics: {
        views: 45000,
        likes: 1200,
        retweets: 480,
        replies: 156,
        engagement: 4.1,
        tvlImpact: '$8M+'
      }
    },
    {
      id: '2',
      name: 'Vault Strategy Launch',
      date: '2024-04-15',
      category: 'product',
      tweetUrl: 'https://x.com/BrahmaFi/status/1779486320842154111',
      metrics: {
        views: 32000,
        likes: 890,
        retweets: 320,
        replies: 89,
        engagement: 4.0,
        tvlImpact: '$5.2M'
      }
    },
    {
      id: '3',
      name: 'Partnership Announcement',
      date: '2024-03-22',
      category: 'partnership',
      tweetUrl: 'https://x.com/BrahmaFi/status/1771234567890123456',
      metrics: {
        views: 28000,
        likes: 756,
        retweets: 280,
        replies: 67,
        engagement: 3.9,
        tvlImpact: '$3.8M'
      }
    },
    {
      id: '4',
      name: 'DeFi Education Series',
      date: '2024-02-10',
      category: 'educational',
      tweetUrl: 'https://x.com/BrahmaFi/status/1756789012345678901',
      metrics: {
        views: 18000,
        likes: 445,
        retweets: 156,
        replies: 78,
        engagement: 3.8,
        tvlImpact: '$1.5M'
      }
    }
  ];

  // Mock engagement timeline data
  const engagementData: EngagementDataPoint[] = [
    { month: 'Jan 2024', followers: 12500, engagement: 3.2, tweets: 45, avgViews: 8500 },
    { month: 'Feb 2024', followers: 14200, engagement: 3.5, tweets: 52, avgViews: 12000 },
    { month: 'Mar 2024', followers: 16800, engagement: 3.8, tweets: 48, avgViews: 15500 },
    { month: 'Apr 2024', followers: 19500, engagement: 4.0, tweets: 55, avgViews: 18500 },
    { month: 'May 2024', followers: 23400, engagement: 4.1, tweets: 62, avgViews: 25000 },
    { month: 'Jun 2024', followers: 27800, engagement: 4.3, tweets: 58, avgViews: 28500 },
    { month: 'Jul 2024', followers: 31200, engagement: 4.5, tweets: 64, avgViews: 32000 }
  ];

  // Campaign category distribution
  const categoryData = [
    { name: 'Giveaways', value: 35, count: 8, color: 'hsl(var(--primary))' },
    { name: 'Product', value: 30, count: 7, color: 'hsl(var(--secondary))' },
    { name: 'Partnerships', value: 20, count: 5, color: 'hsl(var(--accent))' },
    { name: 'Educational', value: 15, count: 4, color: 'hsl(var(--muted))' }
  ];

  const filteredCampaigns = campaigns.filter(campaign => 
    selectedCategory === 'all' || campaign.category === selectedCategory
  );

  const topCampaigns = [...filteredCampaigns]
    .sort((a, b) => b.metrics.views - a.metrics.views)
    .slice(0, 3);

  const totalViews = filteredCampaigns.reduce((sum, c) => sum + c.metrics.views, 0);
  const totalEngagement = filteredCampaigns.reduce((sum, c) => sum + c.metrics.likes + c.metrics.retweets + c.metrics.replies, 0);
  const avgEngagementRate = filteredCampaigns.reduce((sum, c) => sum + c.metrics.engagement, 0) / filteredCampaigns.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">BrahmaFi Twitter Analytics</h2>
          <p className="text-muted-foreground">Social media performance during tenure</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
          >
            All Campaigns
          </Button>
          <Button
            variant={selectedCategory === 'giveaway' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('giveaway')}
          >
            Giveaways
          </Button>
          <Button
            variant={selectedCategory === 'product' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('product')}
          >
            Product
          </Button>
          <Button
            variant={selectedCategory === 'partnership' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('partnership')}
          >
            Partnerships
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Total Views</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {(totalViews / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +23% from previous period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Heart className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium text-muted-foreground">Total Engagement</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {(totalEngagement / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              +18% engagement growth
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Avg Engagement Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {avgEngagementRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Above industry average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium text-muted-foreground">Follower Growth</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              +18.7K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              149% growth during tenure
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Campaigns */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {topCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{campaign.name}</h3>
                    <p className="text-sm text-muted-foreground">{campaign.date}</p>
                  </div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'}>
                    #{index + 1}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <span>{(campaign.metrics.views / 1000).toFixed(1)}K views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <span>{campaign.metrics.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Repeat2 className="h-4 w-4 text-green-500" />
                    <span>{campaign.metrics.retweets}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4 text-blue-500" />
                    <span>{campaign.metrics.replies}</span>
                  </div>
                </div>

                <div className="bg-muted/20 p-3 rounded-lg">
                  <div className="text-sm font-medium text-foreground">TVL Impact</div>
                  <div className="text-lg font-bold text-primary">{campaign.metrics.tvlImpact}</div>
                  <div className="text-xs text-muted-foreground">Engagement Rate: {campaign.metrics.engagement}%</div>
                </div>

                <TweetEmbed 
                  tweetUrl={campaign.tweetUrl} 
                  className="w-full"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwitterAnalyticsDashboard;