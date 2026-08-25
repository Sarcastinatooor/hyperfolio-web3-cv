import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Eye,
  Heart,
  MessageCircle,
  MousePointer2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { AdvancedStats } from "@/components/ui/advanced-stats";
import { BlurRevealDeck, type DeckItem } from "@/components/ui/blur-reveal-deck";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TweetEmbed } from "@/components/ui/tweet-embed";

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

interface PostAnalytics {
  id: string;
  date: string;
  text: string;
  link: string;
  impressions: number;
  likes: number;
  engagements: number;
  bookmarks: number;
  replies: number;
  reposts: number;
  profileVisits: number;
}

const parseCsv = (text: string) => {
  const rows: string[][] = [];
  let row: string[] = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(value.trim());
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value || row.length) {
    row.push(value.trim());
    if (row.some(Boolean)) rows.push(row);
  }

  return rows;
};

const toNumber = (value?: string) => Number.parseInt(value || "0", 10) || 0;

const compactNumber = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const fullNumber = new Intl.NumberFormat("en-US");

const PersonalTwitterAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);
  const [posts, setPosts] = useState<PostAnalytics[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        const [overviewResponse, contentResponse] = await Promise.all([
          fetch("/twitter_analytics.csv"),
          fetch("/twitter_content_analytics.csv"),
        ]);

        if (!overviewResponse.ok || !contentResponse.ok) {
          throw new Error("The X analytics export could not be loaded.");
        }

        const [overviewText, contentText] = await Promise.all([
          overviewResponse.text(),
          contentResponse.text(),
        ]);

        const overviewRows = parseCsv(overviewText).slice(1);
        const nextAnalytics = overviewRows
          .filter((values) => values.length >= 12)
          .map((values) => ({
            date: values[0],
            impressions: toNumber(values[1]),
            likes: toNumber(values[2]),
            engagements: toNumber(values[3]),
            bookmarks: toNumber(values[4]),
            shares: toNumber(values[5]),
            newFollows: toNumber(values[6]),
            unfollows: toNumber(values[7]),
            replies: toNumber(values[8]),
            reposts: toNumber(values[9]),
            profileVisits: toNumber(values[10]),
            createPost: toNumber(values[11]),
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const contentRows = parseCsv(contentText).slice(1);
        const topPosts = contentRows
          .filter((values) => values.length >= 13 && values[3]?.includes("/status/"))
          .map((values) => ({
            id: values[0],
            date: values[1],
            text: values[2],
            link: values[3],
            impressions: toNumber(values[4]),
            likes: toNumber(values[5]),
            engagements: toNumber(values[6]),
            bookmarks: toNumber(values[7]),
            replies: toNumber(values[10]),
            reposts: toNumber(values[11]),
            profileVisits: toNumber(values[12]),
          }))
          .filter((post) => post.impressions > 0)
          .sort((a, b) => b.impressions - a.impressions)
          .slice(0, 6);

        setAnalyticsData(nextAnalytics);
        setPosts(topPosts);
        setSelectedPostId(topPosts[0]?.id || "");
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : "Analytics unavailable.");
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, []);

  const totals = useMemo(
    () =>
      analyticsData.reduce(
        (acc, day) => ({
          impressions: acc.impressions + day.impressions,
          likes: acc.likes + day.likes,
          engagements: acc.engagements + day.engagements,
          newFollows: acc.newFollows + day.newFollows,
          profileVisits: acc.profileVisits + day.profileVisits,
          replies: acc.replies + day.replies,
          reposts: acc.reposts + day.reposts,
          createPost: acc.createPost + day.createPost,
        }),
        {
          impressions: 0,
          likes: 0,
          engagements: 0,
          newFollows: 0,
          profileVisits: 0,
          replies: 0,
          reposts: 0,
          createPost: 0,
        },
      ),
    [analyticsData],
  );

  const chartData = useMemo(
    () =>
      analyticsData.map((day) => ({
        date: new Date(day.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        impressions: day.impressions,
        engagements: day.engagements,
      })),
    [analyticsData],
  );

  const selectedPost = posts.find((post) => post.id === selectedPostId) || posts[0];
  const latestDate = analyticsData.at(-1)?.date;
  const earliestDate = analyticsData[0]?.date;
  const engagementRate = totals.impressions
    ? (totals.engagements / totals.impressions) * 100
    : 0;

  const metricCards = [
    {
      label: "Impressions",
      value: compactNumber.format(totals.impressions),
      detail: `${totals.createPost} original posts`,
      icon: Eye,
    },
    {
      label: "Engagement rate",
      value: `${engagementRate.toFixed(2)}%`,
      detail: `${compactNumber.format(totals.engagements)} engagements`,
      icon: TrendingUp,
    },
    {
      label: "Profile visits",
      value: compactNumber.format(totals.profileVisits),
      detail: "High-intent profile actions",
      icon: MousePointer2,
    },
    {
      label: "New follows",
      value: fullNumber.format(totals.newFollows),
      detail: "Gross follows in period",
      icon: Users,
    },
    {
      label: "Likes",
      value: compactNumber.format(totals.likes),
      detail: `${totals.createPost ? (totals.likes / totals.createPost).toFixed(1) : "0"} per original post`,
      icon: Heart,
    },
    {
      label: "Replies",
      value: fullNumber.format(totals.replies),
      detail: "Conversation depth",
      icon: MessageCircle,
    },
  ];

  const deckItems: DeckItem[] = useMemo(
    () =>
      posts.map((post, index) => ({
        id: post.id,
        eyebrow: `Rank ${String(index + 1).padStart(2, "0")} · ${new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`,
        title: `${compactNumber.format(post.impressions)} impressions`,
        text: post.text,
        href: post.link,
        stats: [
          { label: "Engagements", value: fullNumber.format(post.engagements) },
          { label: "Likes", value: fullNumber.format(post.likes) },
          { label: "Replies", value: fullNumber.format(post.replies) },
        ],
      })),
    [posts],
  );

  const handleDeckChange = useCallback((item: DeckItem) => {
    setSelectedPostId(item.id);
  }, []);

  if (loading) {
    return (
      <Card className="border-border bg-card/80">
        <CardContent className="p-8 text-center font-mono text-sm text-muted-foreground">
          Loading verified X analytics…
        </CardContent>
      </Card>
    );
  }

  if (error || !analyticsData.length) {
    return (
      <Card className="border-border bg-card/80">
        <CardContent className="p-8 text-center text-sm text-muted-foreground">
          {error || "No X analytics are available yet."}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-5">
      <div className="hl-card overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-border p-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Verified performance feed
            </div>
            <h3 className="text-xl font-semibold text-foreground md:text-2xl">
              90 days in the X trenches
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Reach, conversation quality, and the posts that generated the strongest signal.
            </p>
          </div>
          <div className="rounded-md border border-border bg-secondary/60 px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            {earliestDate && latestDate
              ? `${new Date(earliestDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${new Date(latestDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`
              : "Latest export"}
          </div>
        </div>

        <Tabs defaultValue="analytics" className="w-full">
          <div className="border-b border-border px-5 py-3">
            <TabsList className="grid h-10 w-full max-w-sm grid-cols-2 bg-secondary/70">
              <TabsTrigger value="analytics">Performance</TabsTrigger>
              <TabsTrigger value="posts">Best posts</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="analytics" className="m-0 p-5">
            <AdvancedStats metrics={metricCards} chartData={chartData} />
          </TabsContent>

          <TabsContent value="posts" className="m-0 p-5">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start">
              <div>
                <div className="mb-5">
                  <div className="text-sm font-semibold text-foreground">Blur-reveal performance deck</div>
                  <div className="text-xs text-muted-foreground">Swipe or use the controls. Ranked by verified impressions.</div>
                </div>
                <BlurRevealDeck items={deckItems} onActiveChange={handleDeckChange} />
              </div>

              {selectedPost && (
                <div className="min-w-0 rounded-xl border border-border bg-secondary/35 p-3 md:p-4 lg:sticky lg:top-24">
                  <TweetEmbed tweetUrl={selectedPost.link} className="w-full" />
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <p className="text-center font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        Source: authenticated X Analytics export · updated through {latestDate ? new Date(latestDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "the latest export"}
      </p>
    </div>
  );
};

export default PersonalTwitterAnalytics;
