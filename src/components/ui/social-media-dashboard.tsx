import React from 'react';
import { TweetEmbed } from './tweet-embed';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { TrendingUp, Users, Heart, MessageCircle, Repeat2, Eye, Target, BarChart3 } from 'lucide-react';

interface CampaignData {
  title: string;
  tweetUrl: string;
  description: string;
  stats: {
    views: string;
    likes: string;
    retweets: string;
    replies: string;
    engagement: string;
    reach: string;
  };
}

interface SocialMediaDashboardProps {
  campaigns: CampaignData[];
}

export function SocialMediaDashboard({ campaigns }: SocialMediaDashboardProps) {
  const mainCampaign = campaigns[0];
  const otherCampaigns = campaigns.slice(1);

  return (
    <div className="space-y-8">
      {/* Main Campaign Section */}
      {mainCampaign && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-primary" />
            <h3 className="text-xl font-semibold text-foreground">Featured Campaign</h3>
            <Badge variant="secondary" className="ml-auto">Live</Badge>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tweet Embed */}
            <div className="space-y-3">
              <h4 className="font-medium text-foreground">{mainCampaign.title}</h4>
              <p className="text-sm text-muted-foreground">{mainCampaign.description}</p>
              <TweetEmbed 
                tweetUrl={mainCampaign.tweetUrl} 
                className="max-w-full"
              />
            </div>
            
            {/* Stats Grid */}
            <div className="space-y-4">
              <h4 className="font-medium text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Campaign Analytics
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <StatCard
                  icon={<Eye className="w-4 h-4" />}
                  label="Views"
                  value={mainCampaign.stats.views}
                  trend="+12%"
                />
                <StatCard
                  icon={<Heart className="w-4 h-4" />}
                  label="Likes"
                  value={mainCampaign.stats.likes}
                  trend="+24%"
                />
                <StatCard
                  icon={<Repeat2 className="w-4 h-4" />}
                  label="Retweets"
                  value={mainCampaign.stats.retweets}
                  trend="+18%"
                />
                <StatCard
                  icon={<MessageCircle className="w-4 h-4" />}
                  label="Replies"
                  value={mainCampaign.stats.replies}
                  trend="+8%"
                />
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-1 gap-3 mt-4">
                <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="text-sm font-medium">Engagement Rate</span>
                      </div>
                      <span className="text-lg font-bold text-primary">{mainCampaign.stats.engagement}</span>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-r from-secondary/10 to-secondary/5 border-secondary/20">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-secondary" />
                        <span className="text-sm font-medium">Total Reach</span>
                      </div>
                      <span className="text-lg font-bold text-secondary">{mainCampaign.stats.reach}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Campaigns */}
      {otherCampaigns.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">Campaign Portfolio</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherCampaigns.map((campaign, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{campaign.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{campaign.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <TweetEmbed 
                    tweetUrl={campaign.tweetUrl}
                    className="w-full"
                  />
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2 bg-muted/50 rounded">
                      <div className="text-xs text-muted-foreground">Views</div>
                      <div className="font-semibold text-sm">{campaign.stats.views}</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <div className="text-xs text-muted-foreground">Likes</div>
                      <div className="font-semibold text-sm">{campaign.stats.likes}</div>
                    </div>
                    <div className="p-2 bg-muted/50 rounded">
                      <div className="text-xs text-muted-foreground">Engagement</div>
                      <div className="font-semibold text-sm">{campaign.stats.engagement}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
}

function StatCard({ icon, label, value, trend }: StatCardProps) {
  const isPositive = trend.startsWith('+');
  
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="text-muted-foreground">{icon}</div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        </div>
        <div className="flex items-end justify-between">
          <span className="text-xl font-bold text-foreground">{value}</span>
          <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
            {trend}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
