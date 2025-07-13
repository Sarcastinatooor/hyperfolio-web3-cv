import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";

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

interface MediaItemType {
  id: number;
  type: string;
  title: string;
  desc: string;
  url: string;
  span: string;
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
  // Convert experiences to media items for bento gallery with real Unsplash URLs
  const mediaItems: MediaItemType[] = [
    {
      id: 1,
      type: "image",
      title: "Growth Lead at BrahmaFi",
      desc: "Leading growth initiatives for a DeFi protocol focused on yield optimization and automated portfolio management.",
      url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop",
      span: "md:col-span-2 md:row-span-2 col-span-1 sm:col-span-2 sm:row-span-2"
    },
    {
      id: 2,
      type: "image", 
      title: "Marketing Lead at Spiko",
      desc: "Spearheaded marketing efforts for an innovative AI-powered platform focused on social media automation.",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2"
    },
    {
      id: 3,
      type: "image",
      title: "Marketing Manager at FirstPromoter", 
      desc: "Managed marketing operations for a leading referral marketing software platform serving SaaS companies.",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2"
    }
  ];

  return (
    <section id="experience-section" className="py-16 bg-background">
      <InteractiveBentoGallery
        mediaItems={mediaItems}
        title="Professional Experience"
        description="Explore my journey through the Web3 ecosystem - drag, click, and discover my professional adventures"
      />
    </section>
  );
}

export { experiences };
export type { Experience };