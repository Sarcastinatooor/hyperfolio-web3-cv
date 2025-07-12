import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Mail, Calendar, Award, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Portfolio = () => {
  const [isGmClicked, setIsGmClicked] = useState(false);
  const { toast } = useToast();

  const handleGmClick = () => {
    setIsGmClicked(true);
    toast({
      title: "GM! 🌅",
      description: "Thanks for the good morning! Hope you're having a great day in Web3! ⚡",
      duration: 3000,
    });
    setTimeout(() => setIsGmClicked(false), 2000);
  };

  const experiences = [
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
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      {/* Header Section */}
      <div className="relative z-10">
        <div className="container mx-auto px-6 py-12">
          {/* Hero Section */}
          <Card className="card-glow border-border/50 bg-gradient-to-br from-card to-dark-surface mb-12">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex-1">
                  <h1 className="text-4xl lg:text-6xl font-bold text-gradient mb-4">
                    Ritesh Khandelwal
                  </h1>
                  <p className="text-xl lg:text-2xl text-muted-foreground mb-4">
                    Blockchain Product Growth & Ecosystem Marketing
                  </p>
                  <div className="flex items-center gap-2 text-muted-foreground mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>Dubai, UAE</span>
                  </div>
                  <p className="text-lg text-foreground/80 max-w-2xl leading-relaxed">
                    Passionate Web3 professional specializing in blockchain product growth, 
                    ecosystem development, and strategic marketing. Building the future of 
                    decentralized finance one protocol at a time.
                  </p>
                </div>
                
                <div className="flex flex-col gap-4">
                  {/* GM Button */}
                  <Button 
                    onClick={handleGmClick}
                    className={`gm-button text-lg px-8 py-6 font-semibold transition-all duration-300 ${
                      isGmClicked ? 'scale-105' : ''
                    }`}
                    disabled={isGmClicked}
                  >
                    {isGmClicked ? '🌅 GM!' : 'Say GM'}
                  </Button>
                  
                  {/* Social Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="social-button"
                      onClick={() => window.open('https://twitter.com/riteshkhan', '_blank')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="social-button"
                      onClick={() => window.open('https://t.me/riteshkhan', '_blank')}
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 6.728-.896 6.728-.766 4.353-1.135 5.309-1.556 5.309-.357 0-.75-.148-.75-.614 0-.307.062-.604.062-.604l2.515-11.031c.247-.973.39-1.342 1.021-1.342.394 0 .654.173.654.479 0 .248-.05.477-.05.477z"/>
                      </svg>
                      Telegram
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-primary" />
              Experience
            </h2>
            <div className="grid gap-6">
              {experiences.map((exp, index) => (
                <Card key={index} className="card-glow border-border/50 bg-gradient-to-br from-card to-dark-surface hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-2">{exp.title}</h3>
                        <p className="text-primary font-medium mb-2">{exp.company}</p>
                        <p className="text-muted-foreground mb-4">{exp.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="secondary" className="bg-muted/50 text-primary border-primary/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{exp.period}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary" />
              Skills & Expertise
            </h2>
            <Card className="card-glow border-border/50 bg-gradient-to-br from-card to-dark-surface">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {skills.map((skill, index) => (
                    <div key={index} className="group">
                      <Badge 
                        variant="outline" 
                        className="w-full justify-center py-2 px-4 border-border hover:border-primary hover:bg-primary/10 transition-all duration-300 group-hover:neon-glow"
                      >
                        {skill}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Education Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gradient mb-8 flex items-center gap-3">
              <GraduationCap className="w-8 h-8 text-primary" />
              Education
            </h2>
            <div className="grid gap-6">
              {education.map((edu, index) => (
                <Card key={index} className="card-glow border-border/50 bg-gradient-to-br from-card to-dark-surface hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-semibold text-foreground mb-2">{edu.degree}</h3>
                        <p className="text-primary font-medium">{edu.institution}</p>
                      </div>
                      <Badge variant="secondary" className="bg-muted/50 text-primary border-primary/20">
                        {edu.year}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Footer */}
          <Card className="card-glow border-border/50 bg-gradient-to-br from-card to-dark-surface">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground mb-4">
                Ready to build the future of Web3 together?
              </p>
              <div className="flex justify-center gap-4">
                <Button 
                  variant="outline" 
                  className="social-button"
                  onClick={() => window.open('https://twitter.com/riteshkhan', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Let's Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;