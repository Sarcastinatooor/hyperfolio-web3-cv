import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, MapPin, Mail, Calendar, Award, Briefcase, X, Twitter, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const [isGmClicked, setIsGmClicked] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameIndex, setNameIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null);
  const { toast } = useToast();
  
  const experienceRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const names = ['Sheel Khandelwal', 'sarcastinator.crypto'];

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
    {
      title: "Growth Marketing Manager",
      company: "BrahmaFi",
      period: "Present",
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
    {
      title: "Marketing and Business Development Head",
      company: "ShipFinex",
      period: "Jul 2022 - Dec 2022",
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
      ]
    },
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
      skills: ["Team Leadership", "DeFi Marketing", "Cross-chain Strategy", "Community Building", "Growth Hacking", "Business Development"],
      tools: [
        { name: "Jira", logo: "https://wac-cdn.atlassian.com/assets/img/favicons/atlassian/favicon.png" },
        { name: "Notion", logo: "https://www.notion.so/images/favicon.ico" }
      ]
    },
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
      skills: ["Business Development", "KOL Management", "Influencer Marketing", "Data Analytics", "KPI Setting", "Community Engagement"],
      tools: [
        { name: "Analytics", logo: "https://www.google.com/analytics/analytics/images/favicon.ico" },
        { name: "Telegram", logo: "https://web.telegram.org/favicon.ico" }
      ]
    },
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
    <div className="min-h-screen bg-background">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="hl-card mb-8">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-3 hl-metric min-h-[1.2em]">
                    {displayName}
                    <span className="animate-pulse">|</span>
                  </h1>
                  <p className="text-lg lg:text-xl text-muted-foreground mb-4 hl-metric">
                    Vibe-led mindshare architect
                  </p>
                  
                  <div className="text-sm text-foreground/80 max-w-3xl leading-relaxed space-y-3">
                    <p className="hl-metric">
                      👋🏼 Henlo,
                    </p>
                    <p>
                      I have been in the trenches of Web3 world for about 7+ years now. I began my journey as an academic writer and since than have explored diverse roles as a content wizard, digital and growth marketing, business developemnt and what not. In these 7 years, I have experince worked in almsot all genre of Web3 from an L1 to DeFi Protocols, from an RWA project to a Custodian, from a Media Publication to Tier-1 Exchanges.
                    </p>
                    <p>
                      I have tested waters in almsot all sort of conditions, worked from $10-$500k campaigns, ranked keywords like "Digital Assets" in Top-3, worked with the biggest KOLs in the industry, won Startup-World Cup Pitch competitions, led TVL growth of $50M upwards and bought $100M+ trading volumes.
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* GM Button */}
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

          {/* Experience Section */}
          <div ref={experienceRef} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                My Journey
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Scroll to explore my professional experience through interactive cards
              </p>
            </div>
            
            {/* Floating Experience Cards */}
            <div className="relative">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  ref={(el) => cardRefs.current[index] = el}
                  data-index={index}
                  className={`relative mb-8 last:mb-0 transition-all duration-700 ease-out ${
                    visibleCards.includes(index) 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-20'
                  }`}
                  style={{
                    transitionDelay: `${index * 200}ms`,
                    zIndex: experiences.length - index,
                  }}
                >
                  <Card 
                    className={`relative cursor-pointer group hover-scale transition-all duration-300 border-2 border-primary/20 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 ${
                      index === 0 ? 'min-h-[280px] scale-105' : 'min-h-[240px]'
                    } ${
                      index > 0 ? 'lg:-mt-6' : ''
                    }`}
                    onClick={() => handleCardClick(index)}
                  >
                    <CardContent className="p-6">
                      <div className="absolute top-4 right-4">
                        <Badge 
                          variant={index === 0 ? "default" : "secondary"} 
                          className="text-xs"
                        >
                          {index === 0 ? "Current" : exp.period}
                        </Badge>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className={`font-bold text-foreground mb-2 ${
                          index === 0 ? 'text-xl lg:text-2xl' : 'text-lg lg:text-xl'
                        }`}>
                          {exp.company}
                        </h3>
                        <p className={`text-primary font-medium mb-3 ${
                          index === 0 ? 'text-base' : 'text-sm'
                        }`}>
                          {exp.title}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {(exp.keyResponsibilities || exp.description.slice(0, 3)).map((responsibility, respIndex) => (
                          <div key={respIndex} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {responsibility.length > 120 ? responsibility.slice(0, 120) + '...' : responsibility}
                            </p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="mt-4 pt-4 border-t border-border/30">
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Detail Modal */}
          <Dialog open={selectedExperience !== null} onOpenChange={closeModal}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              {selectedExperience !== null && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-foreground">
                      {experiences[selectedExperience].title}
                    </DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="text-primary font-medium text-base">
                        {experiences[selectedExperience].company}
                      </span>
                      <span>{experiences[selectedExperience].period}</span>
                    </div>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Full Description */}
                    <div>
                      <h4 className="font-semibold text-foreground mb-3">Key Responsibilities</h4>
                      <ul className="space-y-3">
                        {experiences[selectedExperience].description.map((point, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <p className="text-sm text-muted-foreground leading-relaxed">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Skills & Tools */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Skills */}
                      {experiences[selectedExperience].skills && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {experiences[selectedExperience].skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Tools */}
                      {experiences[selectedExperience].tools && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-3">Tools & Platforms</h4>
                          <div className="flex flex-wrap gap-2">
                            {experiences[selectedExperience].tools.map((tool, index) => (
                              <div key={index} className="flex items-center gap-1.5 bg-muted/50 rounded-md px-3 py-1.5">
                                <img 
                                  src={tool.logo} 
                                  alt={`${tool.name} logo`}
                                  className="w-4 h-4 object-contain"
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                                <span className="text-xs text-foreground">{tool.name}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Showcase Section */}
                    {experiences[selectedExperience].showcase && (
                      <div>
                        <h4 className="font-semibold text-foreground mb-4">Featured Work & Campaigns</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {experiences[selectedExperience].showcase.map((item, index) => (
                            <Card key={index} className="border border-border/50 hover:border-primary/50 transition-colors">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    {item.type === 'tweet' ? 'Campaign' : item.type === 'blog' ? 'Blog' : 'Case Study'}
                                  </Badge>
                                  {item.type === 'tweet' ? <Twitter className="w-4 h-4 text-primary" /> : <Globe className="w-4 h-4 text-primary" />}
                                </div>
                                <h5 className="font-medium text-foreground mb-2">{item.title}</h5>
                                <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full text-xs"
                                  onClick={() => window.open(item.url, '_blank')}
                                >
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View {item.type === 'tweet' ? 'Campaign' : 'Work'}
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Skills Section */}
          <div className="mb-8">
            <div className="hl-table-header mb-0">
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Skills & Expertise
              </div>
            </div>
            <div className="hl-card">
              <div className="hl-table-cell">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                  {skills.map((skill, index) => (
                    <div key={index} className="text-xs bg-muted/20 text-foreground px-3 py-2 rounded border border-border/50 hover:border-primary/50 transition-colors cursor-default">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Footer */}
          <div className="hl-card text-center">
            <div className="hl-table-cell">
              <p className="text-xs text-muted-foreground mb-3">
                Ready to build the future of Web3 together?
              </p>
              <div className="flex justify-center gap-3">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="social-button text-xs"
                  onClick={() => window.open('https://twitter.com/riteshkhan', '_blank')}
                >
                  <ExternalLink className="w-3 h-3 mr-1" />
                  Connect
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;