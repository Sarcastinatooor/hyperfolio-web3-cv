import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink, Calendar, MapPin, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { experiences, type Experience } from "@/components/ExperienceSection";

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const experience = experiences.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Experience not found</h1>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                {experience.title}
              </span>
            </h1>
            <div className="flex items-center justify-center space-x-6 text-xl text-muted-foreground mb-6">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{experience.company}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{experience.period}</span>
              </div>
            </div>
            <p className="text-xl leading-relaxed max-w-4xl mx-auto">
              {experience.description}
            </p>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Key Responsibilities */}
            <Card className="neon-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Target className="w-6 h-6 text-primary" />
                  <span>Key Responsibilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {experience.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <span className="text-lg leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Campaign Showcase */}
            <Card className="neon-glow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-2xl">
                  <Users className="w-6 h-6 text-primary" />
                  <span>Campaign Showcase</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Twitter/Social Campaigns */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Social Media Campaigns</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {experience.showcase.campaigns.map((campaign, index) => (
                      <Card key={index} className="group hover:scale-105 transition-transform duration-300 cursor-pointer border-dashed border-2 border-primary/30 hover:border-primary/60">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <ExternalLink className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold mb-2">{campaign}</h5>
                          <p className="text-sm text-muted-foreground">
                            Click to add campaign content
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <Separator className="my-8" />

                {/* Content Campaigns */}
                <div>
                  <h4 className="text-xl font-semibold mb-4 text-primary">Content Campaigns</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {experience.showcase.content.map((content, index) => (
                      <Card key={index} className="group hover:scale-105 transition-transform duration-300 cursor-pointer border-dashed border-2 border-primary/30 hover:border-primary/60">
                        <CardContent className="p-6 text-center">
                          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                            <ExternalLink className="w-8 h-8 text-primary" />
                          </div>
                          <h5 className="font-semibold mb-2">{content}</h5>
                          <p className="text-sm text-muted-foreground">
                            Click to add content examples
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Tools & Technologies */}
            <Card className="neon-glow sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Tools & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {experience.tools.map((tool) => (
                    <Badge key={tool} variant="secondary" className="text-sm">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="neon-glow">
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Company Profile
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Connect on LinkedIn
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}