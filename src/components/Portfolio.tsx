import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Linkedin, Mail, MapPin, Phone, Twitter, Calendar, Building2, Users, TrendingUp, Target, Award, ChevronRight } from 'lucide-react';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const experiences = [
    {
      id: 1,
      company: "Liminal Custody",
      role: "Marketing Lead",
      duration: "2021 - Present",
      location: "Remote",
      description: "Led comprehensive marketing initiatives for institutional crypto custody solutions, driving brand awareness and customer acquisition in the digital asset space.",
      tags: ["Content Funnel Execution", "B2B SaaS Marketing", "Product Marketing"],
      achievements: [
        "Increased qualified leads by 150% through targeted content marketing campaigns",
        "Launched product marketing initiatives that drove $50M+ in AUM growth",
        "Built and executed go-to-market strategy for 3 major product launches"
      ],
      logo: "/lovable-uploads/3b44ede4-6687-45f8-a879-dce8376eaab2.png"
    },
    {
      id: 2,
      company: "Hyperliquid",
      role: "Community Growth Manager",
      duration: "2020 - 2021",
      location: "Remote",
      description: "Managed community growth and engagement for a high-performance DEX platform, focusing on user acquisition and retention strategies.",
      tags: ["Community Management", "Growth Hacking", "DeFi"],
      achievements: [
        "Grew community from 5K to 100K+ members across all platforms",
        "Implemented gamification strategies that increased user retention by 40%",
        "Coordinated with development team to prioritize community-driven features"
      ],
      logo: "/lovable-uploads/89ebfe9f-d6ba-4603-91fd-89e06b1e8390.png"
    },
    {
      id: 3,
      company: "Brokoli Network",
      role: "Marketing Consultant",
      duration: "2019 - 2020",
      location: "Remote",
      description: "Provided strategic marketing consultation for a carbon-neutral blockchain infrastructure project, focusing on sustainability messaging and ESG positioning.",
      tags: ["ESG Marketing", "Sustainability", "Blockchain"],
      achievements: [
        "Developed ESG-focused marketing framework adopted by 5+ Web3 projects",
        "Created sustainability content that generated 2M+ organic impressions",
        "Established partnerships with 10+ environmental organizations"
      ],
      logo: "/lovable-uploads/brokoli-logo.png"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "DeFi Analytics Dashboard",
      description: "Real-time analytics platform for DeFi protocols with advanced charting and portfolio tracking capabilities.",
      tags: ["React", "TypeScript", "DeFi", "Analytics"],
      image: "/lovable-uploads/df89e563-c0ca-4c8c-bc4b-9bb44ff632a5.png",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "NFT Marketplace",
      description: "Decentralized marketplace for NFTs with advanced filtering, bidding, and collection management features.",
      tags: ["Next.js", "Web3", "NFTs", "Marketplace"],
      image: "/lovable-uploads/4aab9ee7-324f-4aa4-b2f0-23c0889641c2.png",
      demoUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "DAO Governance Tool",
      description: "Comprehensive governance platform for DAOs with proposal management, voting mechanisms, and treasury oversight.",
      tags: ["Vue.js", "Governance", "DAO", "Blockchain"],
      image: "/lovable-uploads/522f01ac-0ceb-4b09-9827-1675cc7c3d00.png",
      demoUrl: "#",
      githubUrl: "#"
    }
  ];

  const skills = [
    { name: "Marketing Strategy", level: 95, category: "marketing" },
    { name: "Content Marketing", level: 90, category: "marketing" },
    { name: "Community Management", level: 85, category: "marketing" },
    { name: "Brand Development", level: 80, category: "marketing" },
    { name: "Growth Hacking", level: 88, category: "marketing" },
    { name: "React/TypeScript", level: 85, category: "technical" },
    { name: "Web3 Development", level: 75, category: "technical" },
    { name: "DeFi Protocols", level: 80, category: "technical" },
    { name: "Smart Contracts", level: 70, category: "technical" },
    { name: "Data Analytics", level: 78, category: "technical" }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', count: skills.length },
    { id: 'marketing', name: 'Marketing', count: skills.filter(s => s.category === 'marketing').length },
    { id: 'technical', name: 'Technical', count: skills.filter(s => s.category === 'technical').length }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-neon-orange/5"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm foundation-body text-primary">Available for opportunities</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 foundation-heading">
              <span className="text-gradient">Web3 Marketing</span>
              <br />
              <span className="text-foreground">Strategist</span>
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-lg lg:text-xl text-muted-foreground mb-4 foundation-metric">
              Turning Vibes Into Mindshare
            </p>
            
            <div className="text-sm text-foreground/80 max-w-3xl mx-auto leading-relaxed space-y-3 foundation-body">
              <p>
                Specialized in growth-driven marketing strategies for Web3 projects, DeFi protocols, and blockchain infrastructure. 
                Proven track record of scaling communities, driving adoption, and building sustainable marketing funnels in the crypto space.
              </p>
              <p>
                From custody solutions to DEX platforms, I help blockchain projects translate complex technology into compelling narratives 
                that resonate with both institutional and retail audiences.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Button className="foundation-button group">
                <Mail className="w-4 h-4 mr-2" />
                Get In Touch
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="social-button">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold foundation-heading text-primary mb-2">150%</div>
              <div className="text-sm text-muted-foreground foundation-body">Lead Growth</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold foundation-heading text-accent mb-2">$50M+</div>
              <div className="text-sm text-muted-foreground foundation-body">AUM Driven</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold foundation-heading text-neon-orange mb-2">100K+</div>
              <div className="text-sm text-muted-foreground foundation-body">Community Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold foundation-heading text-foreground mb-2">5+</div>
              <div className="text-sm text-muted-foreground foundation-body">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 foundation-heading">
              Professional <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto foundation-body">
              Building growth engines for leading Web3 companies and blockchain infrastructure projects
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp) => (
              <Card key={exp.id} className="foundation-card group cursor-pointer">
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center shrink-0 overflow-hidden">
                      <img 
                        src={exp.logo} 
                        alt={`${exp.company} logo`}
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <CardTitle className="foundation-heading text-xl">{exp.company}</CardTitle>
                        <Badge variant="secondary" className="foundation-body">{exp.duration}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground foundation-body">
                        <span className="text-primary font-medium">{exp.role}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-foreground/80 mb-4 foundation-body">
                    {exp.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-primary/10 text-primary border-primary/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm foundation-subheading">Key Achievements:</h4>
                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start gap-2 foundation-body">
                          <div className="w-1 h-1 bg-primary rounded-full mt-2 shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 foundation-heading">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto foundation-body">
              A comprehensive skill set spanning marketing strategy, community growth, and technical implementation
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "foundation-button" : "social-button"}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2 foundation-body">{category.count}</Badge>
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSkills.map((skill, index) => (
              <div key={index} className="foundation-card p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold foundation-subheading">{skill.name}</h3>
                  <span className="text-sm text-primary foundation-metric">{skill.level}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 foundation-heading">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto foundation-body">
              Showcasing technical implementations and marketing campaigns that drive real results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="foundation-card group overflow-hidden">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex gap-2">
                      <Button size="sm" className="foundation-button">
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Demo
                      </Button>
                      <Button size="sm" variant="outline" className="social-button">
                        <Github className="w-4 h-4 mr-1" />
                        Code
                      </Button>
                    </div>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="foundation-heading">{project.title}</CardTitle>
                  <CardDescription className="foundation-body">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 foundation-heading">
            Ready to <span className="text-gradient-orange">Collaborate</span>?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 foundation-body">
            Let's discuss how we can accelerate your Web3 project's growth and build lasting community engagement.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button className="foundation-button group">
              <Mail className="w-4 h-4 mr-2" />
              Send Message
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" className="social-button">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Call
            </Button>
          </div>

          <div className="flex justify-center space-x-6">
            <Button variant="ghost" size="sm" className="social-button">
              <Twitter className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="social-button">
              <Linkedin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" className="social-button">
              <Github className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
