import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
      period: "2023-2024",
      description: "Leading end-to-end content strategy development and execution of long-format content like blog production, client and market research case studies, product-specific API documentation, sales required collaterals to close leads and social media content, all single-handedly. Aligned content distribution strategy with marketing, sales, and development teams for targeted communication understanding buyer personas, ICP behaviour and content consumption channels to curate relatable and note-worthy content. Collaborated with Strategy, Sales, and Product Marketing to extract customer insights for finding new avenues for lead generation and nurturing, drafting content pieces such as mailers, product specification one-pager and personalized reports to add more value in the process of closure. Contributed to brand-building, PR activities, and hyper-local expansion efforts based on the geographies targeted and clients acquired. Managed and directed an SEO agency to do keyword research, identify transactional and informational keywords to target, amplify current brand website DA & PA, create a Knowledge Center for organic traffic building, and set up SEM ad campaigns based on the targeted ad groups. Worked with a media buyer to optimize Google Ads campaigns, conducting A/B testing for landing page design and content framework and enhancing the overall CPC/CTR performance.",
      skills: ["Content Strategy", "SEO", "SEM", "Brand Building", "Lead Generation", "Marketing Analytics"]
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
              {experiences.map((exp, index) => (
                <div key={index} className="hl-table-cell border-b last:border-b-0">
                  <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-start">
                    <div className="lg:col-span-2">
                      <h3 className="text-sm font-medium text-foreground mb-1">{exp.title}</h3>
                      <p className="text-xs hl-positive">{exp.company}</p>
                    </div>
                    <div className="lg:col-span-2">
                      <p className="text-xs text-muted-foreground mb-2">{exp.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.skills.map((skill, skillIndex) => (
                          <span key={skillIndex} className="text-xs bg-muted/30 text-muted-foreground px-2 py-1 rounded">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs hl-metric text-muted-foreground">{exp.period}</span>
                    </div>
                  </div>
                </div>
              ))}
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