import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TweetEmbed } from "@/components/ui/tweet-embed";
import { SocialMediaDashboard } from "@/components/ui/social-media-dashboard";
import TwitterAnalyticsDashboard from "@/components/TwitterAnalyticsDashboard";
import { Logos3 } from "@/components/ui/logos3";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { BlogGrid } from "@/components/ui/blog-grid";
import { BlogPost } from "@/components/ui/blog-card";
import { BlogService } from "@/services/blogService";
import PersonalTwitterAnalytics from "@/components/PersonalTwitterAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Calendar, MapPin, Building2, User, Target, TrendingUp, Globe, Award, Briefcase, Code, Anchor, FileText } from "lucide-react";
import {
  IconTerminal2,
  IconBrandReact,
  IconDatabase,
  IconChartBar,
  IconBrandFigma,
  IconCode,
  IconTrendingUp,
  IconAward
} from "@tabler/icons-react";


const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Blog posts state for Liminal Custody
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogError, setBlogError] = useState<string>('');

  // Fetch Liminal blog posts when component mounts and experienceId is 1
  useEffect(() => {
    const experienceId = parseInt(id || '0');
    if (experienceId === 1) {
      const fetchBlogPosts = async () => {
        setBlogLoading(true);
        setBlogError('');
        try {
          const result = await BlogService.getLiminalBlogPosts();
          if (result.error) {
            setBlogError(result.error);
          } else {
            setBlogPosts(result.posts);
          }
        } catch (error) {
          setBlogError('Failed to load blog posts');
        } finally {
          setBlogLoading(false);
        }
      };

      fetchBlogPosts();
    }
  }, [id]);
  
  const experiences = [
    // BrahmaFi
    {
      title: "Growth Marketing Manager",
      company: "BrahmaFi",
      period: "Present",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Drove full-funnel growth — from awareness to activation and retention.",
        "Scaled TVL past $100M+, onboarded 13K+ active users, and enabled $200K+ in card spend.",
        "Increased social engagement by 600%+ across platforms."
      ],
      description: [
        "Leading all growth initiatives, from KOL collaborations to onboarding high-intent onchain users and driving aligned narrative campaigns.",
        "Spearheading flagship campaigns with top Web3 agencies (Hy.pe & Swell), including Berachain and Imprint NFT launches tied to TGE rewards.",
        "Collaborating across marketing, product, and design to craft narrative-first content for X and DeBank, amplified via KOLs, ambassadors, and Brahma Maxis.",
        "Managing community ops with a 3-member team, owning Discord lifecycle from onboarding, engagement, support, incentives, to hosting AMAs.",
        "Supporting BD team in outreach for dApp integrations, feature rollouts, and incentive-based partnerships.",
        "Delivered strong KPIs; TVL scaled to $100M+ (peak $300M), with 600%+ X growth and 650%+ Discord engagement uplift."
      ],
      campaignHighlights: [
        {
          title: "Major Cross-Chain Campaign",
          tweetUrl: "https://x.com/BrahmaFi/status/1798777910297497717",
          description: "Led prominent cross-chain integration campaign showcasing BrahmaFi's expansion"
        },
        {
          title: "Campaign Performance Stats",
          tweetUrl: "https://x.com/BrahmaFi/status/1828111828796277174", 
          description: "Campaign metrics and performance data showcasing significant growth achievements"
        }
      ],
      skills: ["Growth Marketing", "KOL Management", "Community Operations", "Campaign Management", "Cross-functional Collaboration", "Business Development", "Discord Management", "Content Strategy", "Onchain Analytics"],
      tools: [
        { name: "Discord", logo: "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico" },
        { name: "Twitter", logo: "https://abs.twimg.com/favicons/twitter.2.ico" },
        { name: "DeBank", logo: "https://debank.com/favicon.ico" },
        { name: "Notion", logo: "https://www.notion.so/images/favicon.ico" }
      ],
      achievements: [
        "Scaled TVL from $10M to $300M peak",
        "Grew social engagement by 600%+",
        "Won multiple campaign competitions",
        "Built partnership with 80+ KOLs"
      ]
    },
    // Liminal
    {
      title: "Manager - Content & Communications",
      company: "Liminal Custody",
      period: "March 2023 - July 2024",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "End-to-end content strategy and execution",
        "SEO agency management and optimization",
        "Brand building and PR activities"
      ],
      description: [
        "Leading end-to-end content strategy development and execution of long-format content like blog production, client and market research case studies, product-specific API documentation, sales required collaterals to close leads and social media content, all single-handedly",
        "Aligned content distribution strategy with marketing, sales, and development teams for targeted communication understanding buyer personas, ICP behaviour and content consumption channels to curate relatable and note-worthy content",
        "Collaborated with Strategy, Sales, and Product Marketing to extract customer insights for finding new avenues for lead generation and nurturing, drafting content pieces such as mailers, product specification one-pager and personalized reports to add more value in the process of closure",
        "Contributed to brand-building, PR activities, and hyper-local expansion efforts based on the geographies targeted and clients acquired",
        "Managed and directed an SEO agency to do keyword research, identify transactional and informational keywords to target, amplify current brand website DA & PA, create a Knowledge Center for organic traffic building, and set up SEM ad campaigns based on the targeted ad groups",
        "Worked with a media buyer to optimize Google Ads campaigns, conducting A/B testing for landing page design and content framework and enhancing the overall CPC/CTR performance"
      ],
      skills: ["Content Strategy", "SEO", "SEM", "Brand Building", "Lead Generation", "Marketing Analytics"],
      tools: [
        { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
        { name: "HubSpot", logo: "https://www.hubspot.com/favicon.ico" },
        { name: "MailerLite", logo: "https://www.mailerlite.com/favicon.ico" },
        { name: "Segment", logo: "https://segment.com/favicon.ico" },
        { name: "ClickUp", logo: "https://clickup.com/favicon.ico" },
        { name: "Google Ads", logo: "https://ssl.gstatic.com/google-ads/ui/logo/google-ads-logo.png" },
        { name: "Google Analytics", logo: "https://www.google.com/analytics/static/imgs/favicon.ico" },
        { name: "Salesforce Sales Cloud", logo: "https://c1.sfdcstatic.com/content/dam/web/en_us/www/assets/nav/salesforce-cloud-logo-blue.svg" },
        { name: "Salesforce Marketing Cloud", logo: "https://c1.sfdcstatic.com/content/dam/web/en_us/www/assets/nav/salesforce-cloud-logo-blue.svg" },
        { name: "FreshMail", logo: "https://www.freshmail.com/favicon.ico" },
        { name: "Freshchat", logo: "https://www.freshworks.com/favicon.ico" }
      ],
      achievements: [
        "Increased organic traffic by 300%",
        "Generated $2M+ in qualified leads",
        "Improved search rankings for 50+ keywords",
        "Built comprehensive content library"
      ]
    },
    // ShipFinex
    {
      title: "Marketing & BD Head",
      company: "ShipFinex",
      period: "Jul 2022 - Dec 2022",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Build Shipfinex's GTM strategy and spearheaded fundraise phase.",
        "Generated $10K+ in private sale funding",
        "Built brand for RWA tokenization"
      ],
      description: [
        "Orchestrated the entire brand building and digital presence setup pushing the envelope of real-world asset tokenisation and fractional ownership.",
        "Superseded the marketing and business team to set SOP's and Marketing Roadmap including content marketing strategy, graphical brand outlook, identifying targeted keywords for SEO setup, product marketing tactics and collaborating with relevant communities and protocols.",
        "Participated in major Blockchain events, representing the brand, curating keynote and pitch deck presentations, leading to victory in Startup World Cup Pitch Competition at World Blockchain Summit.",
        "Initiated investor relationships, seed sale strategy, project showcase to investors generating over $10K ticket size in the private sale round for token allocation."
      ],
      skills: ["Brand Building", "Digital Marketing", "SEO Strategy", "Event Management", "Investor Relations", "Startup Pitch"],
      tools: [
        { name: "Zendesk", logo: "https://d1eipm3vz40hy0.cloudfront.net/images/AMER/zendesk-favicon.png" },
        { name: "Discord", logo: "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico" }
      ],
      achievements: [
        "Build Shipfinex's GTM strategy and spearheaded fundraise phase.",
        "Raised $10K+ in private sale",
        "Built RWA tokenization brand from scratch",
        "Spoke at 5+ major blockchain events"
      ]
    },
    // BitMart
    {
      title: "Senior Business Development Manager-India",
      company: "BitMart",
      period: "Aug 2022 - Sep 2023",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Drove $100M+ Future trading volume with 80+ KOLs",
        "Expanded BitMart's presence across Indian sub-continent",
        "Led India-specific Web3 project partnerships"
      ],
      description: [
        "Expanding the Future and Derivative section of BitMart exchange in the Indian sub-continent region collaborating with key KOLs, trading groups and multiple channels to execute suitable campaigns, acquire more users, increase conversion rates and trading volume.",
        "Drove significant hike in trading volume in initial months reaching the benchmark of $100M Future trading volume, driving from more than 80+ KOLs in the starting quarter.",
        "Working closely with the growth operations team and global marketing team to design audience-centric campaigns and business development strategies, assessing industry trends apt for stakeholders.",
        "After being upgraded to Senior BD started to represent Bitmart in events across India to collaborate with India-specific Web3 projects, to onboard them on BitMart for listing their token or to partner with an existing BitMart listed project to do cross-promotions with them.",
        "Sourced, ideated and briefed the senior team about the upcoming projects and use cases that can be integrated into BitMart to ease the process of onboarding Indian users and make BitMart a friendly app to use and transact for local users."
      ],
      skills: ["Business Development", "Growth Marketing", "KOL Management", "Partnership Development", "Event Management", "Market Analysis"],
      tools: [
        { name: "Slack", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" },
        { name: "Google Sheets", logo: "https://ssl.gstatic.com/docs/spreadsheets/favicon_jfk2.png" },
        { name: "Data Studio", logo: "https://ssl.gstatic.com/analytics-suite/header/suite/v2/ic_data_studio.svg" },
        { name: "Twitter Ads", logo: "https://abs.twimg.com/favicons/twitter.2.ico" }
      ],
      achievements: [
        "Generated $100M+ in futures trading volume",
        "Partnered with 80+ KOLs",
        "Expanded to Indian subcontinent market",
        "Increased user acquisition by 500%"
      ]
    },
    // Spherium Finance
    {
      title: "Head of Marketing & Business Development",
      company: "Spherium Finance",
      period: "Aug 2021 - Jul 2022",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Led team for DeFi cross-chain adoption",
        "Positioned founders as Web3 thought leaders",
        "Implemented growth marketing strategies"
      ],
      description: [
        "Leading a dynamic team to drive adoption of DeFi, primarily cross-chain applications by building an engaging community, implementing lead generation campaigns and bringing institutional level collaboration opportunities.",
        "Directing growth marketing hacks, working closely with Founders, Developers & Investors to elaborate product specifications, facilitate third-party integrations, leading brand representation for Business Development relationships.",
        "Outgrow brand audience acquisition and retention through on-chain analytics, defining founders personal brand as thought leaders and positioning them into the tight circles of Web3 OG's."
      ],
      skills: ["Team Leadership", "DeFi Marketing", "Cross-chain Strategy", "Community Building", "Growth Hacking", "Business Development"],
      tools: [
        { name: "Jira", logo: "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png" },
        { name: "Notion", logo: "https://www.notion.so/images/favicon.ico" }
      ],
      achievements: [
        "Built cross-chain DeFi community of 10K+ users",
        "Positioned founders as thought leaders",
        "Led team of 8 marketing professionals",
        "Facilitated 15+ institutional partnerships"
      ]
    },
    // Huobi Global
    {
      title: "Business Development Manager (Consultant)",
      company: "Huobi Global",
      period: "Aug 2021 - Feb 2022",
      location: "Remote",
      type: "Contract",
      keyResponsibilities: [
        "Built massive KOL ecosystem across geographies",
        "Grew user base and volume by 500%",
        "Set up KPI frameworks for KOL partnerships"
      ],
      description: [
        "Worked with a small-team of BDs to create a huge Influencer and KOL ecosystem, targeting multi-tier geographies to onboard new-users in the Indian subcontinent region.",
        "Grew the user-base and average volume on exchange by 500% over a period of 3 months, stretching it over 6 months in a global team dynamic.",
        "Analysed data metrics to set up accurate KPIs with KOLs introducing them with the functioning of Huobi Global products and how to engage their community the best with brand goals."
      ],
      skills: ["Business Development", "KOL Management", "Influencer Marketing", "Data Analytics", "KPI Setting", "Community Engagement"],
      tools: [
        { name: "Analytics", logo: "https://www.google.com/analytics/analytics/images/favicon.ico" },
        { name: "Telegram", logo: "https://web.telegram.org/favicon.ico" }
      ],
      achievements: [
        "Grew user base by 500% in 3 months",
        "Built network of 100+ KOLs",
        "Increased trading volume by 400%",
        "Expanded to 5 new geographic markets"
      ]
    },
    // CoinGape
    {
      title: "Content Manager",
      company: "CoinGape Crypto News",
      period: "Jul 2021 - Aug 2021",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Scaled established crypto media publication",
        "Led team for high-quality content production",
        "Streamlined content for revenue channels"
      ],
      description: [
        "Overtook the role of Content Manager/Business Developer to scale an established Crypto Media Publication.",
        "Collaborated with a team of writers to produce high-quality Press Release, Sponsored Articles, Case Studies, Market Trend coverage, Token Analysis over a wide spectrum of crypto and blockchain developments.",
        "Streamlined Business Development content creation to add constant revenue channels and improvised SEO strategy to grow organic reach through on-page & off-page optimisation."
      ],
      skills: ["Content Management", "Business Development", "SEO Strategy", "Press Releases", "Market Analysis", "Content Creation", "Team Collaboration"],
      tools: [
        { name: "Figma", logo: "https://www.figma.com/favicon.ico" },
        { name: "HubSpot", logo: "https://www.hubspot.com/favicon.ico" }
      ],
      achievements: [
        "Increased publication reach by 300%",
        "Published 200+ high-quality articles",
        "Generated 50+ sponsored content deals",
        "Improved SEO rankings for 100+ keywords"
      ]
    },
    // F&K Solutions
    {
      title: "Freelance Content and Social Media Manager",
      company: "F&K Solutions",
      period: "Feb 2018 - Jul 2021",
      location: "Remote",
      type: "Freelance",
      keyResponsibilities: [
        "Managed multiple crypto & blockchain projects",
        "Created scalable social media strategies",
        "Drafted whitepapers and website content"
      ],
      description: [
        "Got a distinct opportunity to work with multiple crypto & blockchain based projects & drew scalable social media map for real-world projects.",
        "Took diverse roles from drafting whitepaper to website content, managing social media content strategy, and got prominent in brand building communications."
      ],
      skills: ["Content Strategy", "Social Media Management", "Whitepaper Writing", "Website Content", "Brand Building", "Blockchain Projects", "Crypto Marketing"],
      tools: [
        { name: "Notion", logo: "https://www.notion.so/favicon.ico" },
        { name: "Twitter", logo: "https://abs.twimg.com/favicons/twitter.ico" }
      ],
      achievements: [
        "Managed 15+ crypto projects",
        "Wrote 10+ whitepapers",
        "Built social presence for 20+ brands",
        "Generated combined reach of 1M+ users"
      ]
    }
  ];

  const experienceId = parseInt(id || '0');
  const experience = experiences[experienceId];

  if (!experience) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Experience not found</h1>
          <Button onClick={() => navigate('/')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  const getIcon = (index: number) => {
    if (index === 0) return <img src="/lovable-uploads/a991def3-65b4-42c5-ae46-fd51b8ba5745.png" alt="BrahmaFi Logo" className="w-6 h-6 object-contain" />;
    if (index === 1) return <img src="/lovable-uploads/bfb0ed9c-a115-48ed-b7c4-97a1180adfc3.png" alt="Liminal Custody Logo" className="w-6 h-6 object-contain" />;
    if (index === 2) return <img src="/lovable-uploads/b48218d8-1c66-437e-a9d3-31e42c4a8e02.png" alt="ShipFinex Logo" className="w-6 h-6 object-contain" />;
    if (index === 3) return <img src="/lovable-uploads/4aab9ee7-324f-4aa4-b2f0-23c0889641c2.png" alt="BitMart Logo" className="w-6 h-6 object-contain" />;
    if (index === 4) return <img src="/lovable-uploads/7b43e7b3-c363-4285-bc6b-9f4b560ee18f.png" alt="Spherium Finance Logo" className="w-6 h-6 object-contain" />;
    if (index === 5) return <img src="/lovable-uploads/ebf96c71-aca5-4edd-b755-37acb18b5eaa.png" alt="Huobi Global Logo" className="w-6 h-6 object-contain" />;
    if (index === 6) return <img src="/lovable-uploads/f45b0652-00ce-46b8-9cd2-4e80b7474ee3.png" alt="CoinGape Logo" className="w-6 h-6 object-contain" />;
    
    const icons = [TrendingUp, User, Target, Building2, Globe, Award, Briefcase, Code];
    const IconComponent = icons[index] || User;
    return <IconComponent className="w-6 h-6" />;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button
            onClick={() => navigate('/')}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden">
              {experienceId === 1 ? (
                <img 
                  src="/lovable-uploads/bfb0ed9c-a115-48ed-b7c4-97a1180adfc3.png" 
                  alt={`${experience.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              ) : experienceId === 2 ? (
                <img 
                  src="/lovable-uploads/b48218d8-1c66-437e-a9d3-31e42c4a8e02.png" 
                  alt={`${experience.company} logo`}
                  className="w-8 h-8 object-contain"
                />
              ) : (
                getIcon(experienceId)
              )}
            </div>
            <div>
              <h1 className="font-semibold text-blue-400">{experience.company}</h1>
              <p className="text-sm text-emerald-400">{experience.title}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Overview */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-blue-400">{experience.company}</CardTitle>
                <p className="text-emerald-400 font-medium mt-1">{experience.title}</p>
              </div>
              <Badge variant="secondary" className="bg-gray-800 text-gray-300">
                {experience.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {experience.period}
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {experience.location}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Responsibilities */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Key Responsibilities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {experience.keyResponsibilities.map((responsibility, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{responsibility}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* TL;DR */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">TL;DR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {experience.description.map((desc, index) => (
                <div 
                  key={index} 
                  className="group flex items-start gap-3 p-3 rounded-lg bg-gray-800/30 border border-gray-700/50 hover:border-blue-400/50 hover:bg-gray-800/60 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 group-hover:bg-blue-300 transition-colors duration-300" />
                  <span className="text-gray-300 leading-relaxed group-hover:text-gray-100 transition-colors duration-300">
                    {desc}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Partner Companies Carousel - only for Spherium Finance */}
        {experienceId === 4 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-400" />
                Product Partnerships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative mx-auto flex items-center justify-center lg:max-w-5xl">
                <Carousel
                  opts={{ loop: true }}
                  plugins={[AutoScroll({ playOnInit: true })]}
                  className="w-full"
                >
                  <CarouselContent className="ml-0">
                    {[
                      {
                        id: "logo-1",
                        description: "Unmarshal",
                        image: "/lovable-uploads/2b670137-8805-40e2-8e9d-05c14513cb59.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-2", 
                        description: "Rigel Protocol",
                        image: "/lovable-uploads/21cc77ca-5785-4ac5-a2fb-219419c3a7d4.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-3",
                        description: "LockNess BSC",
                        image: "/lovable-uploads/235e2ad0-b743-4fa3-9e50-e8fabf32d7c7.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-4",
                        description: "Gate.io",
                        image: "/lovable-uploads/bf8ff3e2-4712-4402-be82-048ec21e8d2a.png",
                        className: "h-12 w-12 object-contain p-2 bg-white rounded-lg",
                      },
                      {
                        id: "logo-5",
                        description: "Arbitrum",
                        image: "/lovable-uploads/df89e563-c0ca-4c8c-bc4b-9bb44ff632a5.png",
                        className: "h-12 w-12 object-contain p-1 bg-white rounded-lg",
                      },
                      {
                        id: "logo-6",
                        description: "GrailPad",
                        image: "/lovable-uploads/3666400e-a355-45d2-9f64-19a0c95722fe.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-7",
                        description: "Gamerse NFT",
                        image: "/lovable-uploads/d21ee3ad-346c-4acd-b0e9-c9f55bc9285c.png",
                        className: "h-12 w-12 object-contain p-1 bg-white rounded-lg",
                      },
                      {
                        id: "logo-8",
                        description: "AdLunam",
                        image: "/lovable-uploads/522f01ac-0ceb-4b09-9827-1675cc7c3d00.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-9",
                        description: "Dutch Crypto Investors",
                        image: "/lovable-uploads/37ff1369-5d42-405f-8f41-a575a945d98b.png",
                        className: "h-12 w-12 object-contain p-1 bg-white rounded-lg",
                      },
                      {
                        id: "logo-10",
                        description: "DoraHacks",
                        image: "/lovable-uploads/5731cdc9-33ec-41a1-8f0b-816c4916f953.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-11",
                        description: "Aurora",
                        image: "/lovable-uploads/8d91e90e-7e52-4934-b59c-4497bf448d8a.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-12",
                        description: "AnyPad",
                        image: "/lovable-uploads/7c55f31c-38aa-4767-aa72-e7935d2ea44e.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-13",
                        description: "Unstoppable Domains",
                        image: "/lovable-uploads/1d6eeeeb-3c3b-418b-b3ee-3f35ee90ea1e.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-14",
                        description: "The DAO Maker",
                        image: "/lovable-uploads/a789876e-65a2-4f77-acf0-614d8dba075b.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-15",
                        description: "BscPad",
                        image: "/lovable-uploads/91ec0591-8b93-47e0-93aa-ff15b0a3378e.png",
                        className: "h-12 w-12 object-contain",
                      },
                      {
                        id: "logo-16",
                        description: "Brokoli",
                        image: "/lovable-uploads/brokoli-logo.png",
                        className: "h-12 w-12 object-contain",
                      },
                    ].map((logo) => (
                      <CarouselItem
                        key={logo.id}
                        className="flex basis-1/3 justify-center pl-0 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
                      >
                        <div className="flex flex-col items-center justify-center space-y-2 p-4">
                          <img
                            src={logo.image}
                            alt={logo.description}
                            className={logo.className}
                          />
                          <span className="text-xs text-gray-400 text-center">{logo.description}</span>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-gray-900 to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-gray-900 to-transparent pointer-events-none"></div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Content Portfolio - only for Liminal Custody */}
        {experienceId === 1 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                Content & Social Media Portfolio
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Published content and social media analytics during tenure
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="blogs" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-800 mb-6">
                  <TabsTrigger value="blogs">Published Blogs</TabsTrigger>
                  <TabsTrigger value="twitter">Twitter Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="blogs">
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Blog posts and thought leadership content published during tenure (June 2023 - June 2024)
                    </p>
                    <BlogGrid 
                      posts={blogPosts}
                      isLoading={blogLoading}
                      error={blogError}
                    />
                  </div>
                </TabsContent>

                <TabsContent value="twitter">
                  <PersonalTwitterAnalytics />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}

        {/* Twitter Analytics Dashboard - only for BrahmaFi */}
        {experienceId === 0 && (
          <TwitterAnalyticsDashboard startDate="2024-01" />
        )}

        {/* News Article Embed - only for ShipFinex */}
        {experienceId === 2 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                In the News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border border-gray-700 rounded-lg p-6 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open('https://finance.yahoo.com/news/shipfinex-real-world-asset-tokenization-143000956.html', '_blank')}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Globe className="w-6 h-6 text-purple-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                      ShipFinex: A Real-World Asset Tokenization Protocol Now Regional Champions of Startup World Cup Pitch Competition
                    </h3>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      Dubai, UAE - ShipFinex is emerging to revolutionise the trillion-dollar Maritime economy through real-world asset tokenization and fractional ownership. The protocol won the Startup World Cup Pitch Competition at World Blockchain Summit.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">Yahoo Finance</Badge>
                        <span className="text-gray-500 text-xs">Nov 15, 2022</span>
                      </div>
                      <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-sm">Read article</span>
                        <Globe className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dapp List Widget - only for Spherium Finance */}
        {experienceId === 4 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-400" />
                Community Voting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4">
                <a
                  href="https://thedapplist.com/project/spherium-finance"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="block hover:opacity-80 transition-opacity duration-200"
                >
                  <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 max-w-md w-full">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                      <img
                        src="/lovable-uploads/89ebfe9f-d6ba-4603-91fd-89e06b1e8390.png"
                        alt="The Dapp List"
                        className="h-8 w-auto"
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-white font-semibold mb-2">Spherium Finance</h3>
                      <p className="text-gray-300 text-sm mb-3">Featured project with community recognition</p>
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-blue-400 font-bold text-lg">3,733</span>
                        <span className="text-gray-400 text-sm">votes</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>
        )}

        {/* News Article Embed - only for Spherium Finance */}
        {experienceId === 4 && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                In the News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="border border-gray-700 rounded-lg p-6 bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300 cursor-pointer group"
                onClick={() => window.open('https://cointelegraph.com/press-releases/spherium-finance-unveils-a-cross-chain-incubation-and-grant-program', '_blank')}
              >
                <div className="flex flex-col gap-4">
                  <div className="w-full">
                    <img 
                      src="/lovable-uploads/24ef73e9-67c9-41e9-85cc-af897f7a0258.png" 
                      alt="Spherium Finance Cointelegraph Article"
                      className="w-full aspect-[16/9] object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                        <Globe className="w-6 h-6 text-blue-400" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                        Spherium Finance Unveils a Cross-Chain Incubation and Grant Program
                      </h3>
                      <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                        Spherium Finance announces a comprehensive cross-chain incubation and grant program to support innovative DeFi projects across multiple blockchain ecosystems, fostering growth and adoption in the decentralized finance space.
                      </p>
                       <div className="flex items-center gap-2">
                         <span className="text-gray-500 text-xs">Press Release</span>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ExperienceDetail;