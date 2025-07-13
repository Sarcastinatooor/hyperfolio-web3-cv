import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string;
  responsibilities: string[];
  tools: string[];
  showcase: {
    campaigns: string[];
    content: string[];
  };
}

const experiences: Experience[] = [
  {
    id: "brahmaFi",
    title: "Growth Lead",
    company: "BrahmaFi",
    period: "Sep 2024 - Present",
    description: "Leading growth initiatives for a DeFi protocol focused on yield optimization and automated portfolio management.",
    responsibilities: [
      "Developed and executed comprehensive growth strategies that increased user acquisition by 150%",
      "Led cross-functional initiatives to improve user experience and retention",
      "Built and managed strategic partnerships with key DeFi protocols",
      "Designed and implemented data-driven marketing campaigns across multiple channels",
      "Established key performance metrics and reporting systems for growth tracking"
    ],
    tools: ["HubSpot", "Mixpanel", "Figma", "Notion", "Discord", "Twitter", "Telegram"],
    showcase: {
      campaigns: ["Launch Campaign", "Partnership Announcements", "Community Building"],
      content: ["Educational Content", "Product Updates", "Market Analysis"]
    }
  },
  {
    id: "spiko",
    title: "Marketing Lead",
    company: "Spiko",
    period: "Apr 2024 - Aug 2024",
    description: "Spearheaded marketing efforts for an innovative AI-powered platform focused on social media automation.",
    responsibilities: [
      "Developed integrated marketing campaigns that drove 200% increase in user sign-ups",
      "Created compelling content strategies across LinkedIn, Twitter, and industry publications",
      "Managed product launches and go-to-market strategies for new feature releases",
      "Built influencer partnership programs that expanded brand reach by 300%",
      "Analyzed market trends and competitive landscape to inform strategic decisions"
    ],
    tools: ["Buffer", "Canva", "Analytics", "LinkedIn Sales Navigator", "Hootsuite", "Mailchimp"],
    showcase: {
      campaigns: ["Product Launch", "Influencer Partnerships", "Content Marketing"],
      content: ["Case Studies", "Thought Leadership", "Product Demos"]
    }
  },
  {
    id: "firstpromoter",
    title: "Marketing Manager",
    company: "FirstPromoter",
    period: "Dec 2023 - Mar 2024",
    description: "Managed marketing operations for a leading referral marketing software platform serving SaaS companies.",
    responsibilities: [
      "Orchestrated multi-channel marketing campaigns resulting in 40% increase in qualified leads",
      "Developed customer success stories and case studies that improved conversion rates",
      "Managed webinar series and educational content that positioned company as industry thought leader",
      "Optimized email marketing workflows and automated nurture sequences",
      "Collaborated with sales team to improve lead quality and conversion metrics"
    ],
    tools: ["HubSpot", "Webflow", "Calendly", "Zoom", "Google Analytics", "Mailchimp"],
    showcase: {
      campaigns: ["Webinar Series", "Customer Success Stories", "Email Campaigns"],
      content: ["Educational Resources", "Product Tutorials", "Industry Reports"]
    }
  }
];

export default function ExperienceSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      const progress = Math.max(0, Math.min(1, -rect.top / (sectionHeight - viewportHeight)));
      setScrollProgress(progress);

      // Calculate which card should be current based on scroll progress
      const cardIndex = Math.floor(progress * experiences.length);
      setCurrentIndex(Math.min(cardIndex, experiences.length - 1));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCardClick = (experienceId: string) => {
    navigate(`/experience/${experienceId}`);
  };

  return (
    <section ref={sectionRef} className="min-h-[400vh] relative">
      {/* Fixed header */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col">
        <div className="flex-1 flex flex-col justify-center items-center relative overflow-hidden">
          <h2 className="text-8xl md:text-9xl font-bold text-center mb-16 z-10">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>

          {/* Stacking cards */}
          <div className="relative w-full max-w-4xl mx-auto px-6 h-96">
            {experiences.map((experience, index) => {
              const progress = Math.max(0, scrollProgress * experiences.length - index);
              const isVisible = progress < 1;
              const scale = Math.max(0.9, 1 - progress * 0.05);
              const translateY = Math.min(progress * 60, 200);
              const opacity = Math.max(0.4, 1 - progress * 0.4);
              const rotation = Math.min(progress * 1, 3);

              // Only show the card if it should be visible
              if (!isVisible && index !== currentIndex) return null;

              return (
                <Card
                  key={experience.id}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="absolute top-0 left-0 w-full cursor-pointer transition-all duration-500 ease-out neon-glow border-2 border-primary/20 hover:border-primary/40"
                  style={{
                    transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotation}deg)`,
                    opacity,
                    zIndex: experiences.length - index,
                    transformOrigin: 'center center',
                  }}
                  onClick={() => handleCardClick(experience.id)}
                >
                  <CardContent className="p-8 h-96 flex flex-col justify-center">
                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-bold mb-2 gradient-text">
                          {experience.title}
                        </h3>
                        <p className="text-xl md:text-2xl text-primary mb-1">{experience.company}</p>
                        <p className="text-base md:text-lg text-muted-foreground">{experience.period}</p>
                      </div>

                      <p className="text-base md:text-lg leading-relaxed max-w-2xl mx-auto line-clamp-3">
                        {experience.description}
                      </p>

                      <div className="flex flex-wrap gap-2 justify-center max-w-lg mx-auto">
                        {experience.tools.slice(0, 5).map((tool) => (
                          <Badge key={tool} variant="secondary" className="text-xs">
                            {tool}
                          </Badge>
                        ))}
                        {experience.tools.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{experience.tools.length - 5} more
                          </Badge>
                        )}
                      </div>

                      <div className="mt-6 p-3 rounded-lg bg-muted/20 border border-border/30">
                        <p className="text-xs md:text-sm text-primary font-medium">
                          Click to explore full details and campaigns →
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {experiences.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { experiences };
export type { Experience };