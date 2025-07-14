import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TweetEmbed } from "@/components/ui/tweet-embed";
import { SocialMediaDashboard } from "@/components/ui/social-media-dashboard";
import { ArrowLeft, Calendar, MapPin, Building2, User, Target, TrendingUp, Globe, Award, Briefcase, Code, Anchor } from "lucide-react";
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
  
  const experiences = [
    // BrahmaFi
    {
      title: "Growth Marketing Manager",
      company: "BrahmaFi",
      period: "Present",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Leading growth initiatives with KOLs and onchain user acquisition",
        "Scaling TVL past $100M (peaked at $300M)",
        "Growing social engagement by 600%+ across platforms"
      ],
      description: [
        "Leading all growth initiatives from collaborating with campaign and ecosystem specific KOLs to identifying and onboarding high-intent onchain users to test beta-phase products and push aligned narrative pieces tied to Brahma's brand and messaging.",
        "Spearheading marquee campaigns in partnership with leading Web3 growth agencies (Hy.pe & Swell), including the Berachain launch and the Imprint NFT campaign tied to TGE reward allocations.",
        "Collaborating cross-functionally with marketing and product teams to curate narrative-rich social content for X and DeBank, ensuring credible distribution through engagement with KOLs, ambassadors, community members, and Brahma Maxis.",
        "Leading community operations with a 3-member team, owning the full lifecycle of Brahma's Discord: onboarding optimization, server structuring, user activations, support workflows, role-progression design, incentive mechanism development, and hosting community calls and AMAs in partnership with aligned protocols.",
        "Working closely with the founding team to support BD efforts for new chain integrations, functionality rollouts, and incentive-based campaigns, including outreach and partner coordination for go-to-market execution.",
        "Driven measurable growth across core KPIs — scaling TVL past $100M (peaking at $300M), and growing X and Discord engagement by over 600% and 650% respectively through strategic campaign loops and aligned narrative pushes."
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
      title: "Marketing and Business Development Head",
      company: "ShipFinex",
      period: "Jul 2022 - Dec 2022",
      location: "Remote",
      type: "Full-time",
      keyResponsibilities: [
        "Won Startup World Cup Pitch Competition",
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
        "Won Startup World Cup Pitch Competition",
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
      title: "Head of Marketing and Business Development Team",
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
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
              {getIcon(experienceId)}
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

        {/* Detailed Description */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Detailed Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {experience.description.map((desc, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {desc}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Campaign Highlights - only for BrahmaFi */}
        {experience.campaignHighlights && (
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-lg text-white">Campaign Highlights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {experience.campaignHighlights.map((campaign, index) => (
                  <div key={index} className="space-y-4">
                    <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30">
                      <h3 className="text-blue-400 font-medium mb-2">{campaign.title}</h3>
                      <p className="text-gray-300 text-sm mb-4">{campaign.description}</p>
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
        )}

        {/* Social Media Dashboard */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg text-white">Campaign Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <SocialMediaDashboard 
              campaigns={[{
                title: "ARB Incentive Giveaway",
                tweetUrl: "https://x.com/BrahmaFi/status/1798777910297497717",
                description: "Strategic incentive campaign driving significant TVL growth and community engagement",
                stats: {
                  views: "1.2M",
                  likes: "2.8K",
                  retweets: "1.5K",
                  replies: "324",
                  engagement: "8.4%",
                  reach: "300+"
                }
              }]}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExperienceDetail;