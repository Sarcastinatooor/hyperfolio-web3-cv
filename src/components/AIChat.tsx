import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  relatedExperience?: {
    company: string;
    role: string;
    details: string[];
  };
}

interface AIChatsProps {
  experiences: any[];
}

const AIChat = ({ experiences }: AIChatsProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sheel's AI assistant. Ask me about his experience, skills, or any specific projects. I can tell you exactly where he applied certain skills and what he accomplished!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const findRelevantExperience = (query: string) => {
    const queryLower = query.toLowerCase();
    
    // Enhanced skill mapping
    const skillMappings: { [key: string]: string[] } = {
      'growth': ['growth marketing', 'user acquisition', 'scaling', 'kol management'],
      'marketing': ['marketing', 'content', 'social media', 'brand building', 'campaigns'],
      'defi': ['defi', 'blockchain', 'crypto', 'web3', 'protocol', 'tvl'],
      'community': ['community', 'discord', 'telegram', 'engagement', 'ambassador'],
      'seo': ['seo', 'search engine', 'organic traffic', 'keywords', 'google'],
      'business development': ['business development', 'bd', 'partnerships', 'collaboration'],
      'content': ['content', 'blog', 'writing', 'copywriting', 'articles'],
      'leadership': ['leadership', 'team', 'management', 'leading', 'head'],
      'analytics': ['analytics', 'data', 'metrics', 'kpi', 'measurement'],
      'kol': ['kol', 'influencer', 'key opinion leader', 'thought leader'],
    };

    // Find matching skills
    const matchedSkills = Object.entries(skillMappings).filter(([skill, keywords]) => 
      keywords.some(keyword => queryLower.includes(keyword)) || queryLower.includes(skill)
    ).map(([skill]) => skill);

    // Find relevant experiences
    const relevantExps = experiences.filter(exp => {
      const expText = `${exp.title} ${exp.company} ${exp.description.join(' ')} ${exp.skills?.join(' ') || ''}`.toLowerCase();
      
      return matchedSkills.some(skill => {
        const skillKeywords = skillMappings[skill];
        return skillKeywords.some(keyword => expText.includes(keyword));
      }) || queryLower.split(' ').some(word => expText.includes(word));
    });

    return relevantExps.slice(0, 2); // Return top 2 most relevant
  };

  const generateAIResponse = (query: string) => {
    const relevantExps = findRelevantExperience(query);
    
    if (relevantExps.length === 0) {
      return {
        text: "I don't have specific information about that skill or experience. Try asking about growth marketing, DeFi, community building, SEO, content strategy, business development, or leadership!",
        relatedExperience: undefined
      };
    }

    const queryLower = query.toLowerCase();
    
    // Generate contextual responses based on query type
    if (queryLower.includes('growth') || queryLower.includes('scaling') || queryLower.includes('tvl')) {
      const brahmaExp = relevantExps.find(exp => exp.company === 'BrahmaFi');
      if (brahmaExp) {
        return {
          text: `Sheel has exceptional growth marketing skills! At BrahmaFi, he scaled TVL from zero to over $100M (peaking at $300M) and grew social engagement by 600%+. He led KOL partnerships, managed community operations with a 3-member team, and spearheaded marquee campaigns with top Web3 agencies like Hy.pe & Swell.`,
          relatedExperience: {
            company: brahmaExp.company,
            role: brahmaExp.title,
            details: brahmaExp.keyResponsibilities
          }
        };
      }
    }
    
    if (queryLower.includes('seo') || queryLower.includes('content')) {
      const liminalExp = relevantExps.find(exp => exp.company === 'Liminal Custody');
      if (liminalExp) {
        return {
          text: `Sheel has deep SEO and content expertise! At Liminal Custody, he led end-to-end content strategy, managed SEO agencies for keyword research and organic traffic building, and created comprehensive content from API documentation to case studies. He optimized Google Ads campaigns and enhanced CPC/CTR performance.`,
          relatedExperience: {
            company: liminalExp.company,
            role: liminalExp.title,
            details: liminalExp.keyResponsibilities
          }
        };
      }
    }
    
    if (queryLower.includes('kol') || queryLower.includes('influencer')) {
      const bitMartExp = relevantExps.find(exp => exp.company === 'BitMart');
      if (bitMartExp) {
        return {
          text: `Sheel is a KOL management expert! At BitMart, he drove $100M+ in Future trading volume by collaborating with 80+ KOLs in just the starting quarter. He expanded BitMart's presence across the Indian subcontinent and designed audience-centric campaigns with the global marketing team.`,
          relatedExperience: {
            company: bitMartExp.company,
            role: bitMartExp.title,
            details: bitMartExp.keyResponsibilities
          }
        };
      }
    }

    // Default response with first relevant experience
    const exp = relevantExps[0];
    return {
      text: `At ${exp.company}, Sheel worked as ${exp.title} where he ${exp.keyResponsibilities[0].toLowerCase()}. ${exp.description[0]}`,
      relatedExperience: {
        company: exp.company,
        role: exp.title,
        details: exp.keyResponsibilities
      }
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        sender: 'ai',
        timestamp: new Date(),
        relatedExperience: aiResponse.relatedExperience,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="border border-border/50">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <MessageCircle className="w-5 h-5 text-primary" />
          Ask About My Experience
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Ask me about specific skills, projects, or experiences. I'll tell you exactly where and how they were applied!
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea 
          ref={scrollAreaRef}
          className="h-64 pr-4"
        >
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {message.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                </div>
                <div className={`max-w-[80%] space-y-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`px-3 py-2 rounded-lg text-sm ${
                    message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}>
                    {message.text}
                  </div>
                  {message.relatedExperience && (
                    <div className="bg-card border border-border/50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {message.relatedExperience.company}
                        </Badge>
                        <span className="text-xs font-medium text-foreground">
                          {message.relatedExperience.role}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {message.relatedExperience.details.map((detail, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                            <span className="text-xs text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-muted text-muted-foreground flex items-center justify-center">
                  <Bot className="w-3 h-3" />
                </div>
                <div className="bg-muted px-3 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-2">
          <Input
            placeholder="Ask about growth marketing, DeFi, community building, SEO..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AIChat;