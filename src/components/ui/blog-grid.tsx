import { useState, useEffect } from "react";
import { BlogCard, BlogPost } from "./blog-card";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, FileText, Calendar } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BlogGridProps {
  posts?: BlogPost[];
  isLoading?: boolean;
  error?: string;
}

export const BlogGrid = ({ posts = [], isLoading = false, error }: BlogGridProps) => {
  const [displayedPosts, setDisplayedPosts] = useState<BlogPost[]>([]);
  const postsPerPage = 6;

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, postsPerPage));
  }, [posts]);

  const loadMore = () => {
    const currentLength = displayedPosts.length;
    const newPosts = posts.slice(0, currentLength + postsPerPage);
    setDisplayedPosts(newPosts);
  };

  if (isLoading) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="flex items-center justify-center py-12">
          <div className="flex items-center gap-3 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading blog posts...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert className="border-red-800 bg-red-900/20">
        <FileText className="h-4 w-4" />
        <AlertDescription className="text-red-200">
          {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (posts.length === 0) {
    return (
      <Card className="bg-gray-900 border-gray-800">
        <CardContent className="flex flex-col items-center justify-center py-12 text-gray-400">
          <FileText className="w-12 h-12 mb-4 opacity-50" />
          <p className="text-lg font-medium mb-2">No blog posts found</p>
          <p className="text-sm text-center">
            No blog posts were found for the specified date range (June 1, 2023 - June 27, 2024).
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Blog posts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedPosts.map((post, index) => (
          <BlogCard key={index} post={post} />
        ))}
      </div>

      {/* Load more button */}
      {displayedPosts.length < posts.length && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            className="px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 hover:border-blue-400/50 transition-all duration-300 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Load More Posts ({posts.length - displayedPosts.length} remaining)
          </button>
        </div>
      )}

      {/* Posts summary */}
      <div className="flex items-center justify-center gap-4 text-sm text-gray-400 border-t border-gray-800 pt-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>Showing {displayedPosts.length} of {posts.length} posts</span>
        </div>
      </div>
    </div>
  );
};