import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ExternalLink, MapPin, Calendar, Award, Briefcase } from "lucide-react";

const experiences = [
  {
    id: "brahma-fi",
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
    id: "liminal-custody",
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
    id: "bitmart",
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
  }
];

const ExperienceDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const experience = experiences.find(exp => exp.id === id);
  
  if (!experience) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Experience not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern opacity-10 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="mb-6 hover:bg-muted"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Portfolio
            </Button>
            
            <div className="hl-card">
              <div className="p-8">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {experience.title}
                    </h1>
                    <div className="flex items-center gap-4 mb-4">
                      <p className="text-xl text-primary font-semibold">
                        {experience.company}
                      </p>
                      <Badge variant="outline" className="text-sm">
                        {experience.period}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key Responsibilities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    Key Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {experience.keyResponsibilities.map((responsibility, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <p className="text-foreground">{responsibility}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Detailed Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {experience.description.map((desc, index) => (
                      <p key={index} className="text-foreground leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Showcase */}
              {experience.showcase && experience.showcase.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5 text-primary" />
                      Key Projects & Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experience.showcase.map((item, index) => (
                        <div key={index} className="border border-border/50 rounded-lg p-4 hover:border-primary/50 transition-colors">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{item.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {item.type}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3">
                            {item.description}
                          </p>
                          {item.url !== "#" && (
                            <Button variant="outline" size="sm" asChild>
                              <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="w-3 h-3 mr-2" />
                                View Project
                              </a>
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Tools & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {experience.tools.map((tool, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
                        <img 
                          src={tool.logo} 
                          alt={tool.name}
                          className="w-5 h-5"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <span className="text-sm font-medium text-foreground">
                          {tool.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">{experience.period}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm text-foreground">Remote</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetail;