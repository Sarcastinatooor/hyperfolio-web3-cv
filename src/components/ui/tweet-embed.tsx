import React from 'react';

interface TweetEmbedProps {
  tweetUrl: string;
  className?: string;
}

export const TweetEmbed: React.FC<TweetEmbedProps> = ({ tweetUrl, className = "" }) => {
  // Extract tweet ID from URL
  const getTweetId = (url: string) => {
    const match = url.match(/\/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(tweetUrl);

  if (!tweetId) {
    return (
      <div className={`border border-border rounded-lg p-4 bg-secondary/60 ${className}`}>
        <p className="text-muted-foreground text-sm">Invalid tweet URL</p>
      </div>
    );
  }

  // Create embed URL for Twitter
  const embedUrl = `https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark&dnt=true&omit_script=true`;

  return (
    <div className={`border border-border rounded-lg overflow-hidden bg-card/70 ${className}`}>
      <iframe
        src={embedUrl}
        width="100%"
        height="500"
        style={{ 
          border: 'none',
          maxWidth: '100%',
        }}
        allow="encrypted-media"
        loading="lazy"
        className="rounded-lg"
        title="Embedded Tweet"
      />
    </div>
  );
};
