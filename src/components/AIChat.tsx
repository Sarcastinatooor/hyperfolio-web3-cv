import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle, X, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
  tools: string[];
  achievements: string[];
}

const experiences: Experience[] = [
  {
    id: "brahmaFi",
    company: "BrahmaFi",
    position: "Head of Marketing & Community",
    duration: "Jan 2024 - Present",
    responsibilities: [
      "Spearheaded comprehensive marketing strategy resulting in 300% growth in community engagement",
      "Managed multi-channel campaigns across Twitter, Discord, and Telegram with 50K+ combined reach",
      "Developed and executed go-to-market strategies for new product launches",
      "Built strategic partnerships with key DeFi protocols and influencers"
    ],
    tools: ["Twitter Analytics", "Discord Management", "Telegram", "Content Strategy", "Partnership Development"],
    achievements: [
      "Grew community from 5K to 25K members",
      "Achieved 85% engagement rate on social campaigns",
      "Successfully launched 3 major product features"
    ]
  },
  {
    id: "koinbasket",
    company: "Koinbasket",
    position: "Marketing Manager",
    duration: "Mar 2023 - Dec 2023",
    responsibilities: [
      "Led digital marketing campaigns with $100K+ monthly budget allocation",
      "Developed content strategy that increased organic traffic by 400%",
      "Managed SEO strategy ranking keywords like 'Digital Assets' in top 3 positions",
      "Collaborated with product team on user acquisition strategies"
    ],
    tools: ["Google Analytics", "SEMrush", "Content Management", "SEO Tools", "Social Media Management"],
    achievements: [
      "Increased website traffic by 400%",
      "Ranked 'Digital Assets' keyword in top 3",
      "Generated 50% increase in user signups"
    ]
  },
  {
    id: "bitdelta",
    company: "Bitdelta",
    position: "Business Development Lead",
    duration: "Jun 2022 - Feb 2023",
    responsibilities: [
      "Established strategic partnerships with institutional clients",
      "Developed business development frameworks that increased client acquisition by 200%",
      "Led negotiations for high-value partnerships worth $10M+ in trading volume",
      "Built relationships with key stakeholders in the crypto ecosystem"
    ],
    tools: ["CRM Systems", "Partnership Management", "Client Relations", "Strategic Planning"],
    achievements: [
      "Brought in $100M+ trading volume",
      "Established 15+ institutional partnerships",
      "Increased revenue by 250%"
    ]
  }
];

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Sheel's AI assistant. Ask me anything about his experience, skills, or specific projects. For example: 'What did Sheel do at BrahmaFi?' or 'Tell me about his marketing experience.'",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific company mentions
    if (lowerMessage.includes('brahma') || lowerMessage.includes('brahmaFi')) {
      const brahma = experiences.find(exp => exp.id === 'brahmaFi');
      return `At BrahmaFi, Sheel serves as Head of Marketing & Community. His key achievements include: ${brahma?.achievements.join(', ')}. He's responsible for ${brahma?.responsibilities.slice(0, 2).join(' and ')}. His expertise with tools like ${brahma?.tools.slice(0, 3).join(', ')} has been crucial for their growth.`;
    }
    
    if (lowerMessage.includes('koinbasket')) {
      const koin = experiences.find(exp => exp.id === 'koinbasket');
      return `At Koinbasket, Sheel worked as Marketing Manager where he ${koin?.responsibilities[1]} and ${koin?.responsibilities[2]}. Notable achievements: ${koin?.achievements.join(', ')}.`;
    }
    
    if (lowerMessage.includes('bitdelta')) {
      const bitdelta = experiences.find(exp => exp.id === 'bitdelta');
      return `At Bitdelta, Sheel was the Business Development Lead. He ${bitdelta?.responsibilities[0]} and ${bitdelta?.responsibilities[2]}. Major wins: ${bitdelta?.achievements.join(', ')}.`;
    }
    
    // Check for skill-related queries
    if (lowerMessage.includes('marketing') || lowerMessage.includes('growth')) {
      return `Sheel has extensive marketing experience across Web3. At BrahmaFi, he achieved 300% growth in community engagement and grew their community from 5K to 25K members. At Koinbasket, he increased organic traffic by 400% and ranked 'Digital Assets' in top 3 search results. His marketing toolkit includes SEO, content strategy, social media management, and partnership development.`;
    }
    
    if (lowerMessage.includes('community') || lowerMessage.includes('social')) {
      return `Sheel excels at community building. At BrahmaFi, he manages multi-channel campaigns across Twitter, Discord, and Telegram with 50K+ combined reach, achieving an 85% engagement rate. He's grown communities from 5K to 25K members and successfully launched 3 major product features through strategic community engagement.`;
    }
    
    if (lowerMessage.includes('business development') || lowerMessage.includes('partnerships')) {
      return `Sheel's business development skills shine at Bitdelta where he established 15+ institutional partnerships worth $100M+ in trading volume. He developed frameworks that increased client acquisition by 200% and revenue by 250%. He's experienced in CRM systems, partnership management, and strategic planning.`;
    }
    
    if (lowerMessage.includes('seo') || lowerMessage.includes('digital assets')) {
      return `Sheel's SEO expertise is proven - he ranked the highly competitive keyword 'Digital Assets' in the top 3 search results while at Koinbasket. He also increased organic traffic by 400% through strategic content and SEO optimization using tools like SEMrush and Google Analytics.`;
    }
    
    if (lowerMessage.includes('achievements') || lowerMessage.includes('results')) {
      return `Sheel's track record includes: 300% growth in community engagement, growing communities from 5K to 25K members, 400% increase in organic traffic, ranking 'Digital Assets' in top 3 SEO results, bringing in $100M+ trading volume, establishing 15+ institutional partnerships, and achieving 85% engagement rates on social campaigns.`;
    }
    
    if (lowerMessage.includes('tools') || lowerMessage.includes('technology')) {
      return `Sheel is proficient with various tools across his roles: Marketing tools (Google Analytics, SEMrush, Twitter Analytics), Community management (Discord, Telegram, Social Media Management), Business tools (CRM Systems, Partnership Management platforms), and Content strategy tools. He's worked with campaigns ranging from $10 to $500K budgets.`;
    }
    
    // General experience query
    if (lowerMessage.includes('experience') || lowerMessage.includes('background')) {
      return `Sheel has 7+ years in Web3, working across L1s, DeFi protocols, RWA projects, custodians, media publications, and Tier-1 exchanges. He's held roles from academic writer to growth marketing, business development, and community leadership. He's worked with campaigns from $10-$500K, won Startup World Cup pitch competitions, and led TVL growth of $50M+.`;
    }
    
    // Default response
    return `I can tell you about Sheel's experience at BrahmaFi, Koinbasket, or Bitdelta. You can also ask about specific skills like marketing, community building, SEO, business development, or his achievements and tools. What would you like to know more about?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-12 h-12 bg-primary hover:bg-primary/90 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <Card className="w-80 h-96 shadow-xl">
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="font-semibold text-sm">Ask about Sheel's experience</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-6 h-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          <CardContent className="p-0 h-64 overflow-y-auto">
            <div className="p-3 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                      <Bot className="w-3 h-3 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] p-2 rounded-lg text-xs ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.isUser && (
                    <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center mt-1">
                      <User className="w-3 h-3" />
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                  <div className="bg-muted text-foreground p-2 rounded-lg text-xs">
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce"></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-1 h-1 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about skills, experience..."
                className="text-xs"
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="px-3"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AIChat;