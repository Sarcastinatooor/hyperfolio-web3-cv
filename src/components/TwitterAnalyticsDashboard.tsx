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
  tweetUrl?: string;
  tweetUrls?: string[];
  highlights?: string[];
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
      name: 'Berama Hotel | Honey Boxes',
      date: '2024-11-15',
      category: 'giveaway',
      tweetUrl: 'https://x.com/BrahmaFi/status/1887762395948622221',
      highlights: [
        'TVL: $9.36M | Txn Volume: $15.3M+ | Transactions: 13K (8K relayed)',
        'New Accounts on Berachain: 754 onboarded through campaign',
        'Activated & engaged Bera Maxis as early adopters and amplifiers',
        'Onboarded power users via partner protocols through coordinated efforts',
        'Drove KARMA leaderboard action by pushing top scorers to deploy on Berachain'
      ],
      metrics: {
        views: 58000,
        likes: 1650,
        retweets: 640,
        replies: 210,
        engagement: 4.4,
        tvlImpact: '$15M+'
      }
    },
    {
      id: '2',
      name: 'Imprint NFT Mint',
      date: '2024-10-15',
      category: 'partnership',
      tweetUrl: 'https://x.com/BrahmaFi/status/1925552926183051392',
      highlights: [
        '160K+ Imprints minted across the campaign duration',
        '$30M+ TVL impact driven via cross-ecosystem participation',
        'Partnered with top Berachain NFT projects — THJ, Bullas, Mibera, HoneyCast & Steddy Teddy\'s — to activate and reward their communities',
        'Led KOL distribution strategy, onboarding and coordinating 30+ key influencers for maximum reach'
      ],
      metrics: {
        views: 75000,
        likes: 2100,
        retweets: 850,
        replies: 280,
        engagement: 4.8,
        tvlImpact: '$30M+'
      }
    },
    {
      id: '3',
      name: 'Morpho Agent',
      date: '2024-12-15',
      category: 'partnership',
      tweetUrl: 'https://x.com/BrahmaFi/status/1881387071774048390',
      highlights: [
        'Scaled TVL from ~$1.1M to ~$9.5M (+760%), Agents from ~353 to ~3,103 (+779%), and driving ~$21M in Agentic volume',
        'Collaborated with Morpho & Base to activate power users for early Agent testing',
        'Onboarded Top Karma scorers to spark competition on the leaderboard',
        'Launched targeted quests to boost engagement and UGC around Morpho Agent'
      ],
      metrics: {
        views: 65000,
        likes: 1850,
        retweets: 720,
        replies: 230,
        engagement: 4.6,
        tvlImpact: '$25M+'
      }
    },
    {
      id: '4',
      name: 'Accelerate On-Chain',
      date: '2024-08-15',
      category: 'giveaway',
      tweetUrl: 'https://x.com/BrahmaFi/status/1824130653568504284',
      highlights: [
        'Grew Brahma Accounts from 5K+ to 12K+ during campaign window',
        'Drove $20M+ TVL growth through targeted Brahma feature activations',
        '2K+ active Karma scorers into the campaign leaderboard',
        'Enabled structured Karma distribution to incentivize CT contributors and KOLs'
      ],
      metrics: {
        views: 52000,
        likes: 1450,
        retweets: 580,
        replies: 180,
        engagement: 4.3,
        tvlImpact: '$20M+'
      }
    },
    {
      id: '5',
      name: 'ARB Incentive Giveaway',
      date: '2024-05-27',
      category: 'giveaway',
      tweetUrl: 'https://x.com/BrahmaFi/status/1798777910297497717',
      highlights: [
        'Drove $8M+ in TVL via targeted campaign and incentive design.',
        'Activated protocol-native maxis to amplify narrative and onchain participation.',
        'Ran DeBank whale campaign targeting Aave and Pendle LPs.',
        'Scaled campaign with 4 top Arbitrum protocols post initial epoch success.'
      ],
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
      id: '6',
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
      id: '6',
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
      id: '7',
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
    .slice(0, 5);

  // Real Twitter Analytics Data
  const totalImpressions = 2200000; // 2.2M
  const engagementRate = 8; // 8%
  const profileVisits = 11600; // 11.6K
  const newFollows = 59200; // 59.2K
  const totalReplies = 2900; // 2.9K
  const totalLikes = 26600; // 26.6K
  const totalReposts = 22100; // 22.1K
  const totalBookmarks = 1900; // 1.9K
  
  const totalEngagement = totalLikes + totalReposts + totalReplies;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Brahma Twitter Stats</h2>
          <p className="text-muted-foreground">Social media performance during tenure</p>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Impressions</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {(totalImpressions / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Total reach during tenure
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Engagement Rate</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {engagementRate}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Above industry average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Follower Growth</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-2">
              {(newFollows / 1000).toFixed(1)}K
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              New followers gained
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
          <div className="flex overflow-x-auto gap-4 pb-4">
            {topCampaigns.map((campaign, index) => (
              <div key={campaign.id} className="flex-shrink-0 w-96 bg-card border rounded-lg p-4 space-y-4 shadow-sm hover:shadow-md transition-shadow">
                {/* Campaign Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-sm leading-tight">{campaign.name}</h3>
                  </div>
                  <Badge variant={index === 0 ? 'default' : 'secondary'} className="text-xs">
                    #{index + 1}
                  </Badge>
                </div>

                {/* Extended Tweet Preview */}
                {campaign.tweetUrl && (
                  <div className="bg-muted/10 border rounded p-3">
                    <div className="text-xs text-muted-foreground mb-2">Tweet Preview</div>
                    <TweetEmbed 
                      tweetUrl={campaign.tweetUrl} 
                      className="w-full h-72"
                    />
                  </div>
                )}

                {/* Full Core Contributions */}
                {campaign.highlights && (
                  <div className="bg-muted/10 rounded p-3">
                    <div className="text-xs font-medium text-foreground mb-3">Core Contributions</div>
                    <ul className="space-y-2">
                      {campaign.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-primary font-bold mt-0.5 text-xs">•</span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TwitterAnalyticsDashboard;