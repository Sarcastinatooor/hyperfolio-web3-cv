import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, MapPin, Mail, Calendar, Award, Briefcase, X, Twitter, Globe, Building2, User, Target, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ChainThemeProvider } from "@/contexts/ChainThemeContext";
import PersonalTwitterAnalytics from "@/components/PersonalTwitterAnalytics";

import { BentoGrid, type BentoItem } from './ui/bento-grid';

const Portfolio = () => {
  const navigate = useNavigate();
  const [isGmClicked, setIsGmClicked] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameIndex, setNameIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const { toast } = useToast();
  
  const experienceRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const names = ['Sheel Khandelwal', 'sarcastinator.hl'];

  useEffect(() => {
    const currentName = names[nameIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing
      if (displayName.length < currentName.length) {
        timeout = setTimeout(() => {
          setDisplayName(currentName.slice(0, displayName.length + 1));
        }, 100);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      // Deleting
      if (displayName.length > 0) {
        timeout = setTimeout(() => {
          setDisplayName(displayName.slice(0, -1));
        }, 50);
      } else {
        // Switch to next name
        setIsDeleting(false);
        setNameIndex((prev) => (prev + 1) % names.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayName, isDeleting, nameIndex, names]);

  const handleGmClick = () => {
    window.open('https://t.me/SARCASTINATOOOR', '_blank');
  };

  const experiences = [
    // Brahma (BrahmaFi)
    {
      title: "Growth Marketing Manager",
      company: "BrahmaFi",
      period: "July 2024 - October 2025",
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
      skills: ["Growth Marketing", "KOL Management", "Community Operations", "Campaign Management", "Cross-functional Collaboration", "Business Development", "Discord Management", "Content Strategy", "Onchain Analytics"],
      tools: [
        { name: "Discord", logo: "https://discord.com/assets/847541504914fd33810e70a0ea73177e.ico" },
        { name: "Twitter", logo: "https://abs.twimg.com/favicons/twitter.2.ico" },
        { name: "DeBank", logo: "https://debank.com/favicon.ico" },
        { name: "Notion", logo: "https://www.notion.so/images/favicon.ico" }
      ],
      showcase: [
        {
          type: "tweet",
          title: "Berachain Campaign Launch",
          url: "https://twitter.com/brahmaFi/status/1234567890",
          description: "Led the marquee Berachain launch campaign"
        },
        {
          type: "blog",
          title: "Scaling DeFi TVL: A Growth Marketing Playbook",
          url: "#",
          description: "Deep dive into strategies that scaled BrahmaFi's TVL past $100M"
        }
      ]
    },
    // Liminal
    {
      title: "Manager - Content & Communications",
      company: "Liminal Custody",
      period: "March 2023 - July 2024",
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
      skills: ["Content Funnel Execution", "B2B SaaS Marketing", "Product Marketing", "SEO", "SEM", "Brand Building"],
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
      showcase: [
        {
          type: "blog",
          title: "Digital Assets Custody: The Complete Guide",
          url: "#",
          description: "Comprehensive guide that ranked in Top-3 for 'Digital Assets' keyword"
        },
        {
          type: "case-study",
          title: "SEO Strategy Case Study",
          url: "#",
          description: "How we increased organic traffic by 300% in 6 months"
        }
      ]
    },
    // ShipFinex
    {
      title: "Marketing and Business Development Head",
      company: "ShipFinex",
      period: "Jul 2022 - Dec 2022",
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
      ]
    },
    // BitMart
    {
      title: "Senior Business Development Manager-India",
      company: "BitMart",
      period: "Aug 2022 - Sep 2023",
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
      ]
    },
    // Spherium Finance
    {
      title: "Head of Marketing and Business Development Team",
      company: "Spherium Finance",
      period: "Aug 2021 - Jul 2022",
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
      skills: ["Invester Relationships", "Integration Partnerships", "Team Lead", "Community Building", "Growth Hacking", "Business Development"],
      tools: [
        { name: "Jira", logo: "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png" },
        { name: "Notion", logo: "https://www.notion.so/images/favicon.ico" }
      ]
    },
    // Huobi Global
    {
      title: "Business Development Manager (Consultant)",
      company: "Huobi Global",
      period: "Aug 2021 - Feb 2022",
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
      skills: ["KOL Management", "Campaign Design", "Affiliate Marketing", "Data Analytics", "KPI Setting", "Community Engagement"],
      tools: [
        { name: "Analytics", logo: "https://www.google.com/analytics/analytics/images/favicon.ico" },
        { name: "Telegram", logo: "https://web.telegram.org/favicon.ico" }
      ]
    },
    // CoinGape
    {
      title: "Content Manager",
      company: "CoinGape Crypto News",
      period: "Jul 2021 - Aug 2021",
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
      ]
    },
    // F&K Solutions
    {
      title: "Freelance Content and Social Media Manager",
      company: "F&K Solutions",
      period: "Feb 2018 - Jul 2021",
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
      ]
    }
  ];

  const skills = [
    "Blockchain Technology", "DeFi Protocols", "Product Strategy", "Growth Marketing",
    "Ecosystem Development", "Community Building", "Token Economics", "Smart Contracts",
    "Web3 Analytics", "Project Management", "Strategic Planning", "Partnership Development"
  ];

  // Transform experiences into BentoItems
  const experienceBentoItems: BentoItem[] = experiences.map((exp, index) => ({
    title: exp.company,
    description: exp.keyResponsibilities[0],
    meta: exp.title,
    status: exp.period,
    tags: exp.skills.slice(0, 3),
    icon: index === 0 ? <img src="/lovable-uploads/a991def3-65b4-42c5-ae46-fd51b8ba5745.png" alt="BrahmaFi Logo" className="w-4 h-4 object-contain" /> :
          index === 1 ? <img src="/lovable-uploads/bfb0ed9c-a115-48ed-b7c4-97a1180adfc3.png" alt="Liminal Custody Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          index === 2 ? <img src="/lovable-uploads/b48218d8-1c66-437e-a9d3-31e42c4a8e02.png" alt="ShipFinex Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          index === 3 ? <img src="/lovable-uploads/4aab9ee7-324f-4aa4-b2f0-23c0889641c2.png" alt="BitMart Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          index === 4 ? <img src="/lovable-uploads/7b43e7b3-c363-4285-bc6b-9f4b560ee18f.png" alt="Spherium Finance Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          index === 5 ? <img src="/lovable-uploads/ebf96c71-aca5-4edd-b755-37acb18b5eaa.png" alt="Huobi Global Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          index === 6 ? <img src="/lovable-uploads/f45b0652-00ce-46b8-9cd2-4e80b7474ee3.png" alt="CoinGape Logo" className="w-4 h-4 object-contain" loading="lazy" /> :
          <User className="w-4 h-4 text-white" />,
    colSpan: 1,
    onClick: () => navigate(`/experience/${index}`),
    hasPersistentHover: index === 0,
  }));

  // Scroll-triggered card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards(prev => {
              if (!prev.includes(cardIndex)) {
                return [...prev, cardIndex].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -100px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedExperience(index);
  };

  const closeModal = () => {
    setSelectedExperience(null);
  };


  return (
    <ChainThemeProvider>
      <div className="min-h-screen bg-background">        
        {/* Grid Pattern Background */}
        <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="hl-card mb-8 relative">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-5xl font-bold text-foreground mb-3 hl-metric min-h-[2.5rem] lg:min-h-[1.2em]">
                    {displayName}
                    <span className="animate-pulse">|</span>
                  </h1>
                  <p className="text-lg lg:text-xl text-muted-foreground mb-4 hl-metric">
                    Vibe Marketing for Conversions not just Mindshare
                  </p>
                  
                  <div className="text-sm text-foreground/80 max-w-3xl leading-relaxed space-y-3">
                    <p className="hl-metric">
                      👋🏼 Henlo,
                    </p>
                    <p>
                      I have been in Web3 trenches for about 7+ years now. Began my journey as an academic writer, wrote a dissertation piece on Bitcoin back in 2018 which was my gateway to the crypto world. Started my experience in web3 as content writer and soon grew into more captive roles as marketer, gtm strategist, BD, growth and what not. In these 7 years, I have dabbled in almost every genre of web3 from L1 to RWAs, from cross-chain DeFi protocols to neo-banks, from Custodian to Tier-1 Centralized Exchanges.
                    </p>
                    <p>
                      I have worked on the smallest and the biggest campaigns, for both B2B & B2C categories executing $10-$500k campaigns, ranked high-value keywords like "Digital Assets" in Top-3, worked with the biggest yappers and subject-matter experts in the industry, won Startup-World Cup Pitch competitions in World Blockchain Summit, led TVL growth of $50M upwards and bought $100M+ trading volumes.
                    </p>
                  </div>
                  
                  {/* GM Button */}
                  <div className="mt-6">
                    <Button 
                      onClick={handleGmClick}
                      className="gm-button text-sm px-6 py-3 font-semibold transition-all duration-300"
                    >
                      Say GM
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div ref={experienceRef} className="mb-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Experience
              </h2>
            </div>
            
            {/* Bento Grid for Experience */}
            <BentoGrid items={experienceBentoItems} />
          </div>

          {/* KOLs Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                KOLs I've Collaborated With 
              </h2>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-b from-background/50 to-transparent rounded-2xl border border-white/10 p-8 pt-16 pb-12">
              <div className="flex flex-col">
                {/* Single Row - Scrolling */}
                <div className="relative">
                  <div className="flex animate-[scroll-right_15s_linear_infinite] gap-6">
                    {[
                      { name: "Stacy Muur", handle: "stacy_muur", avatar: "/lovable-uploads/1f575802-c0d0-4114-8bec-f98bfb56761b.png" },
                      { name: "The Smart Ape", handle: "the_smart_ape", avatar: "/lovable-uploads/a11ad34f-11d8-43e5-b3b6-9890f7430089.png" },
                      { name: "0xMughal", handle: "0xMughal", avatar: "/lovable-uploads/feb6c46f-b756-4ce9-96d5-33f7bacd89b9.png" },
                      { name: "Jiraiya", handle: "JiraiyaReal", avatar: "/lovable-uploads/40b20f90-97ad-44d4-90f2-5e9b20fc5975.png" },
                      { name: "Diego DeFi", handle: "diego_defai", avatar: "/lovable-uploads/d3dbd676-f2e4-4ee1-bdc7-1fa7302a5233.png" },
                      { name: "DeFi Dad", handle: "DeFi_Dad", avatar: "/lovable-uploads/1029abfc-9383-4127-8cee-ffc0e04bb3d3.png" },
                      { name: "LST Maximalist", handle: "lstmaximalist", avatar: "/lovable-uploads/c8e25253-4839-4e4a-8907-94d6f00c6476.png" },
                      { name: "Aibra", handle: "aibra", avatar: "/lovable-uploads/20d8a89f-cf6b-46dd-aa6a-9d75aadd582f.png" },
                      { name: "Barthazian", handle: "Barthazian", avatar: "/lovable-uploads/9ce3ba73-4a14-4b18-b043-2cfe9a9f2556.png" },
                      { name: "HyperLcrgs", handle: "HyperLcrgs", avatar: "/lovable-uploads/7e251f06-d9b8-4c16-b083-361e9cc2046a.png" },
                      { name: "Blum OG", handle: "Blum_OG", avatar: "/lovable-uploads/1c6fe125-f07e-4646-b1ed-97f5e5672998.png" },
                      { name: "Eli5 DeFi", handle: "eli5_defi", avatar: "/lovable-uploads/dc46ffac-6316-4c5a-8173-5ff00447e61f.png" },
                      { name: "Today in DeFi", handle: "todayindefi", avatar: "/lovable-uploads/3cbcc621-28e5-4718-9f12-64cfe62dc41a.png" },
                      { name: "Jack Niewold", handle: "JackNiewold", avatar: "/lovable-uploads/a00d7c61-898b-4216-ba34-3bea28450878.png" },
                      { name: "IAmYourChaos", handle: "iamyourchaos", avatar: "/lovable-uploads/fc576325-6e4b-48aa-9d95-c8170d607e78.png" },
                      { name: "Wenxue", handle: "wenxue600", avatar: "/lovable-uploads/c57c5046-5c3c-435c-8b5e-3ee40eb32243.png" },
                      { name: "0xAllen888", handle: "0xAllen888", avatar: "/lovable-uploads/4d7c3e4e-bc9e-4711-a48f-15f595459d59.png" },
                      { name: "ZKSgu", handle: "ZKSgu", avatar: "/lovable-uploads/3b44ede4-6687-45f8-a879-dce8376eaab2.png" },
                      { name: "0xNairolf", handle: "0xNairolf", avatar: "/lovable-uploads/63ec0222-e694-4720-ab4f-00543635c557.png" },
                    ].concat([
                      { name: "Stacy Muur", handle: "stacy_muur", avatar: "/lovable-uploads/1f575802-c0d0-4114-8bec-f98bfb56761b.png" },
                      { name: "The Smart Ape", handle: "the_smart_ape", avatar: "/lovable-uploads/a11ad34f-11d8-43e5-b3b6-9890f7430089.png" },
                      { name: "0xMughal", handle: "0xMughal", avatar: "/lovable-uploads/feb6c46f-b756-4ce9-96d5-33f7bacd89b9.png" },
                      { name: "Jiraiya", handle: "JiraiyaReal", avatar: "/lovable-uploads/40b20f90-97ad-44d4-90f2-5e9b20fc5975.png" },
                      { name: "Diego DeFi", handle: "diego_defai", avatar: "/lovable-uploads/d3dbd676-f2e4-4ee1-bdc7-1fa7302a5233.png" },
                      { name: "DeFi Dad", handle: "DeFi_Dad", avatar: "/lovable-uploads/1029abfc-9383-4127-8cee-ffc0e04bb3d3.png" },
                      { name: "LST Maximalist", handle: "lstmaximalist", avatar: "/lovable-uploads/c8e25253-4839-4e4a-8907-94d6f00c6476.png" },
                      { name: "Aibra", handle: "aibra", avatar: "/lovable-uploads/20d8a89f-cf6b-46dd-aa6a-9d75aadd582f.png" },
                      { name: "Barthazian", handle: "Barthazian", avatar: "/lovable-uploads/9ce3ba73-4a14-4b18-b043-2cfe9a9f2556.png" },
                      { name: "HyperLcrgs", handle: "HyperLcrgs", avatar: "/lovable-uploads/7e251f06-d9b8-4c16-b083-361e9cc2046a.png" },
                      { name: "Blum OG", handle: "Blum_OG", avatar: "/lovable-uploads/1c6fe125-f07e-4646-b1ed-97f5e5672998.png" },
                      { name: "Eli5 DeFi", handle: "eli5_defi", avatar: "/lovable-uploads/dc46ffac-6316-4c5a-8173-5ff00447e61f.png" },
                      { name: "Today in DeFi", handle: "todayindefi", avatar: "/lovable-uploads/3cbcc621-28e5-4718-9f12-64cfe62dc41a.png" },
                      { name: "Jack Niewold", handle: "JackNiewold", avatar: "/lovable-uploads/a00d7c61-898b-4216-ba34-3bea28450878.png" },
                      { name: "IAmYourChaos", handle: "iamyourchaos", avatar: "/lovable-uploads/fc576325-6e4b-48aa-9d95-c8170d607e78.png" },
                      { name: "Wenxue", handle: "wenxue600", avatar: "/lovable-uploads/c57c5046-5c3c-435c-8b5e-3ee40eb32243.png" },
                      { name: "0xAllen888", handle: "0xAllen888", avatar: "/lovable-uploads/4d7c3e4e-bc9e-4711-a48f-15f595459d59.png" },
                      { name: "ZKSgu", handle: "ZKSgu", avatar: "/lovable-uploads/3b44ede4-6687-45f8-a879-dce8376eaab2.png" },
                      { name: "0xNairolf", handle: "0xNairolf", avatar: "/lovable-uploads/63ec0222-e694-4720-ab4f-00543635c557.png" },
                    ]).map((kol, index) => (
                      <div
                        key={`${kol.handle}-${index}`}
                        className="group relative flex-shrink-0 cursor-pointer"
                        onClick={() => window.open(`https://x.com/${kol.handle}`, '_blank')}
                      >
                        <div className="relative">
                          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-primary/50 transition-all duration-300 group-hover:scale-110">
                            <img
                              src={kol.avatar}
                              alt={kol.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                          {kol.name}
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-black/90" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Twitter Analytics Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                My shit posting saga
              </h2>
            </div>
            
            <PersonalTwitterAnalytics />
          </div>

          {/* Content Scale Section */}
          <div className="mb-12">
            <div className="flex justify-center">
              <img 
                src="/lovable-uploads/content-scale-analyzer.png" 
                alt="Content Scale Analysis" 
                className="w-full max-w-md rounded-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="hl-card text-center">
            <div className="hl-table-cell">
              <h2 className="text-lg font-semibold text-white mb-4">
                Follow me here
              </h2>
              <div className="flex justify-center mb-4">
                <img 
                  src="/lovable-uploads/571df8ea-2bcf-468b-aa84-1acb45393edd.png" 
                  alt="Twitter Profile Picture" 
                  className="w-16 h-16 rounded-full border-2 border-primary/50 cursor-pointer hover:border-primary transition-colors duration-300 hover:scale-105 transform"
                  onClick={() => window.open('https://x.com/Not_A_De_Gen', '_blank')}
                />
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </ChainThemeProvider>
  );
};

export default Portfolio;