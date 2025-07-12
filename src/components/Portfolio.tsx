import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExternalLink, MapPin, Mail, Calendar, Award, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const [isGmClicked, setIsGmClicked] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [nameIndex, setNameIndex] = useState(0);
  const { toast } = useToast();

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
      title: "Manager - Content & Communications",
      company: "Liminal Custody",
      period: "March 2023 - July 2024",
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
      ]
    },
    {
      title: "Blockchain Product Growth & Ecosystem Marketing",
      company: "Current Role",
      period: "Present",
      description: "Leading growth initiatives and ecosystem development in the blockchain space",
      skills: ["Product Strategy", "Growth Marketing", "Ecosystem Development"]
    },
    {
      title: "Product Manager",
      company: "Web3 Company",
      period: "2023-2024",
      description: "Managed product development and go-to-market strategies for DeFi protocols",
      skills: ["Product Management", "DeFi", "Strategy"]
    },
    {
      title: "Growth Marketing Specialist",
      company: "Blockchain Startup",
      period: "2022-2023",
      description: "Developed and executed growth marketing campaigns for blockchain products",
      skills: ["Growth Hacking", "Marketing", "Analytics"]
    }
  ];

  const skills = [
    "Blockchain Technology", "DeFi Protocols", "Product Strategy", "Growth Marketing",
    "Ecosystem Development", "Community Building", "Token Economics", "Smart Contracts",
    "Web3 Analytics", "Project Management", "Strategic Planning", "Partnership Development"
  ];

  const education = [
    {
      degree: "Master's in Business Administration",
      institution: "Top Business School",
      year: "2020-2022"
    },
    {
      degree: "Bachelor's in Engineering",
      institution: "Technical University",
      year: "2016-2020"
    }
  ];

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
          <div className="mb-8">
            <div className="hl-table-header mb-0">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Experience
              </div>
            </div>
            <div className="hl-card">
              <Accordion type="multiple" className="w-full">
                {experiences.map((exp, index) => (
                  <AccordionItem key={index} value={`experience-${index}`} className="border-b last:border-b-0">
                    <AccordionTrigger className="hover:no-underline py-4 px-0">
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center w-full gap-4">
                        {/* Overview Section - Always Visible */}
                        <div className="flex-1 text-left">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-2">
                            <h3 className="text-sm font-medium text-foreground">{exp.title}</h3>
                            <p className="text-xs hl-positive">{exp.company}</p>
                            <span className="text-xs hl-metric text-muted-foreground">{exp.period}</span>
                          </div>
                          
                          {/* Top Skills Preview */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {exp.skills.slice(0, 3).map((skill, skillIndex) => (
                              <span key={skillIndex} className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                            {exp.skills.length > 3 && (
                              <span className="text-xs text-muted-foreground px-2 py-1">
                                +{exp.skills.length - 3} more
                              </span>
                            )}
                          </div>
                          
                          {/* Tools Preview */}
                          {exp.tools && (
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-muted-foreground">Tools:</span>
                              <div className="flex gap-1">
                                {exp.tools.slice(0, 6).map((tool, toolIndex) => (
                                  <img 
                                    key={toolIndex}
                                    src={tool.logo} 
                                    alt={`${tool.name} logo`}
                                    className="w-4 h-4 object-contain opacity-70"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                    }}
                                  />
                                ))}
                                {exp.tools.length > 6 && (
                                  <span className="text-xs text-muted-foreground ml-1">
                                    +{exp.tools.length - 6}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    
                    <AccordionContent className="pt-0 pb-4">
                      {/* Detailed Description */}
                      <div className="space-y-4">
                        {Array.isArray(exp.description) ? (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Responsibilities & Achievements:</h4>
                            <ul className="text-xs text-muted-foreground space-y-1.5">
                              {exp.description.map((point, pointIndex) => (
                                <li key={pointIndex} className="flex items-start">
                                  <span className="mr-2 text-primary">•</span>
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Role Overview:</h4>
                            <p className="text-xs text-muted-foreground">{exp.description}</p>
                          </div>
                        )}
                        
                        {/* All Skills */}
                        <div>
                          <h4 className="text-sm font-medium text-foreground mb-2">Skills & Expertise:</h4>
                          <div className="flex flex-wrap gap-1">
                            {exp.skills.map((skill, skillIndex) => (
                              <span key={skillIndex} className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* All Tools */}
                        {exp.tools && (
                          <div>
                            <h4 className="text-sm font-medium text-foreground mb-2">Tools & Technologies Used:</h4>
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-2">
                              {exp.tools.map((tool, toolIndex) => (
                                <div key={toolIndex} className="flex items-center gap-2 text-xs bg-muted/20 text-foreground px-2 py-1.5 rounded border border-border/30 hover:border-primary/30 transition-colors group">
                                  <img 
                                    src={tool.logo} 
                                    alt={`${tool.name} logo`}
                                    className="w-4 h-4 object-contain flex-shrink-0"
                                    onError={(e) => {
                                      const target = e.target as HTMLImageElement;
                                      target.style.display = 'none';
                                      const fallback = target.nextElementSibling as HTMLElement;
                                      if (fallback) fallback.style.display = 'flex';
                                    }}
                                  />
                                  <div className="w-4 h-4 bg-primary/10 rounded text-primary text-xs items-center justify-center flex-shrink-0 hidden">
                                    {tool.name.charAt(0)}
                                  </div>
                                  <span className="truncate text-xs">{tool.name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

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

          {/* Education Section */}
          <div className="mb-8">
            <div className="hl-table-header mb-0">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </div>
            </div>
            <div className="hl-card">
              {education.map((edu, index) => (
                <div key={index} className="hl-table-cell border-b last:border-b-0">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <h3 className="text-sm font-medium text-foreground mb-1">{edu.degree}</h3>
                      <p className="text-xs hl-positive">{edu.institution}</p>
                    </div>
                    <div className="lg:col-span-1"></div>
                    <div className="text-right">
                      <span className="text-xs hl-metric text-muted-foreground">{edu.year}</span>
                    </div>
                  </div>
                </div>
              ))}
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