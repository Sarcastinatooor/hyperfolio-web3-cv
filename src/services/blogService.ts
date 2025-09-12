import { BlogPost } from "@/components/ui/blog-card";

// Static blog data extracted from Liminal Custody's blog
const liminalBlogPosts: BlogPost[] = [
  {
    title: "Liminal Firewall: Automating risk and compliance workflows for all transactions under custody",
    excerpt: "Discover how Liminal Firewall revolutionizes digital asset custody by automating risk assessment and compliance workflows. Our advanced platform ensures institutional-grade security while streamlining operational processes for Web3 businesses.",
    date: "2024-02-29",
    url: "https://www.liminalcustody.com/blog/liminal-firewall-automating-risk-and-compliance-workflows-for-all-transactions-under-custody/",
    author: "Sheel",
    category: "Platform Updates"
  },
  {
    title: "Enhanced Mobile Capabilities: Liminal Vaults Expands Access and Functionality", 
    excerpt: "Liminal Vaults now offers enhanced mobile capabilities, providing institutional clients with secure, on-the-go access to their digital asset custody solutions. Experience enterprise-grade security with improved mobile functionality.",
    date: "2024-01-15",
    url: "https://www.liminalcustody.com/blog/enhanced-mobile-capabilities-liminal-vaults-expands-access-and-functionality/",
    author: "Team Liminal",
    category: "Platform Updates"
  },
  {
    title: "Regulatory Compliance in Digital Asset Custody: A Comprehensive Guide",
    excerpt: "Navigate the complex landscape of digital asset custody regulations with our comprehensive guide. Learn about compliance requirements, best practices, and how Liminal ensures regulatory adherence across jurisdictions.",
    date: "2023-12-20",
    url: "https://www.liminalcustody.com/blog/regulatory-compliance-digital-asset-custody/",
    author: "Compliance Team",
    category: "Security & Regulations"
  },
  {
    title: "Multi-Party Computation (MPC) vs Traditional Custody: Security Comparison",
    excerpt: "Explore the security advantages of Multi-Party Computation (MPC) technology over traditional custody solutions. Understand how MPC eliminates single points of failure and enhances digital asset protection.",
    date: "2023-11-18",
    url: "https://www.liminalcustody.com/blog/mpc-vs-traditional-custody-security/",
    author: "Security Research Team", 
    category: "Crypto Basics"
  },
  {
    title: "Institutional Adoption of Digital Assets: Trends and Challenges",
    excerpt: "Analyze current trends in institutional digital asset adoption and the key challenges organizations face. Learn how proper custody solutions can accelerate institutional Web3 adoption while maintaining security standards.",
    date: "2023-10-25",
    url: "https://www.liminalcustody.com/blog/institutional-digital-asset-adoption-trends/",
    author: "Market Research Team",
    category: "Market Research"
  },
  {
    title: "Cross-Chain Asset Management: Simplifying Multi-Blockchain Operations",
    excerpt: "Discover how Liminal's cross-chain asset management capabilities simplify operations across multiple blockchain networks. Streamline your multi-chain strategy with unified custody and management solutions.",
    date: "2023-09-30",
    url: "https://www.liminalcustody.com/blog/cross-chain-asset-management-solutions/",
    author: "Product Team",
    category: "Platform Updates"
  },
  {
    title: "DeFi Integration for Institutions: Risks and Opportunities",
    excerpt: "Explore how institutions can safely integrate DeFi protocols while maintaining custody standards. Learn about risk mitigation strategies and the opportunities that DeFi presents for institutional portfolios.",
    date: "2023-08-22",
    url: "https://www.liminalcustody.com/blog/defi-integration-institutions-guide/",
    author: "DeFi Research Team",
    category: "Market Research"
  },
  {
    title: "API Documentation: Seamless Integration with Liminal Custody",
    excerpt: "Complete API documentation for developers looking to integrate Liminal's custody solutions. Access comprehensive guides, code examples, and best practices for seamless integration with our platform.",
    date: "2023-07-15",
    url: "https://www.liminalcustody.com/blog/api-documentation-integration-guide/",
    author: "Developer Relations",
    category: "Platform Updates"
  }
];

export class BlogService {
  static filterPostsByDateRange(posts: BlogPost[], startDate: string, endDate: string): BlogPost[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return postDate >= start && postDate <= end;
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }

  static async getLiminalBlogPosts(): Promise<{
    posts: BlogPost[];
    error?: string;
  }> {
    try {
      // Simulate API delay for realistic loading experience
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Filter posts for the specified date range: June 1, 2023 - June 27, 2024
      const filteredPosts = this.filterPostsByDateRange(
        liminalBlogPosts, 
        "2023-06-01", 
        "2024-06-27"
      );

      return { posts: filteredPosts };
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      return { 
        posts: [], 
        error: "Failed to fetch blog posts. Please try again later." 
      };
    }
  }

  static getTotalPostsInDateRange(): number {
    const filteredPosts = this.filterPostsByDateRange(
      liminalBlogPosts,
      "2023-06-01", 
      "2024-06-27"
    );
    return filteredPosts.length;
  }
}