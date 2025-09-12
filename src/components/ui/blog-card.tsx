import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, ExternalLink, User } from "lucide-react";

export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  url: string;
  author?: string;
  category?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard = ({ post }: BlogCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const handleClick = () => {
    window.open(post.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Card 
      className="bg-gray-900 border-gray-800 hover:border-blue-400/50 hover:bg-gray-800/80 transition-all duration-300 cursor-pointer group h-full"
      onClick={handleClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          {post.category && (
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg text-white group-hover:text-blue-300 transition-colors line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400">{post.author}</span>
            </div>
          )}
          <div className="flex items-center gap-1 text-blue-400 group-hover:text-blue-300 transition-colors ml-auto">
            <span className="text-sm">Read more</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};