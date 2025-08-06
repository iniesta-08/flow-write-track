import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Palette, Type, Sparkles } from "lucide-react";

const BrandGuide = () => {
  const colorPalette = [
    { name: "Coral Pink", value: "hsl(8, 92%, 70%)", usage: "Primary brand color, CTAs, highlights" },
    { name: "Mint Green", value: "hsl(155, 65%, 75%)", usage: "Secondary actions, success states, vegan features" },
    { name: "Sunny Yellow", value: "hsl(50, 100%, 75%)", usage: "Accent color, happy hour deals, energy" },
    { name: "Bright Purple", value: "hsl(280, 70%, 80%)", usage: "Premium features, personality moments" },
    { name: "Sky Blue", value: "hsl(200, 80%, 75%)", usage: "Info states, reservations, trust" },
    { name: "Soft Lavender", value: "hsl(260, 45%, 90%)", usage: "Backgrounds, muted elements" }
  ];

  const typography = [
    { 
      name: "Fredoka", 
      usage: "Headlines, buttons, playful text", 
      example: "Find Your Perfect Food Vibe ✨",
      className: "font-fredoka text-3xl font-bold"
    },
    { 
      name: "Inter", 
      usage: "Body text, descriptions, UI elements", 
      example: "Discover Seattle's quirkiest food spots with Gen Z flair!",
      className: "font-inter text-lg"
    }
  ];

  const voiceTone = [
    "✨ Whimsical & Playful",
    "🔥 Bold & Confident", 
    "😄 Cheeky & Humorous",
    "💖 Youthful & Energetic",
    "🎯 Authentic & Relatable",
    "🚀 Trendy & Current"
  ];

  const logoVariations = [
    "Full logo with tagline: 'Find Your Perfect Food Vibe'",
    "Icon-only version for app icons and favicons",
    "Horizontal layout for headers and business cards",
    "Stacked layout for social media profiles",
    "Monochrome version for single-color applications"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-secondary/10 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-fredoka text-5xl md:text-6xl font-bold text-foreground mb-4">
            QuirkYourTaste{" "}
            <span className="bg-gradient-to-r from-primary via-tertiary to-accent bg-clip-text text-transparent">
              Brand Guide
            </span>
          </h1>
          <p className="font-inter text-xl text-muted-foreground max-w-3xl mx-auto">
            Your complete brand identity guide for Seattle's quirkiest food discovery app. 
            This is how we keep our vibe consistent across all touchpoints! 🎨
          </p>
        </div>

        {/* Brand Personality */}
        <Card className="mb-12 border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="font-fredoka text-3xl text-foreground flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-primary" />
              Brand Personality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {voiceTone.map((trait, index) => (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-primary/10 to-tertiary/10 rounded-2xl p-4 text-center border border-primary/20"
                >
                  <span className="font-fredoka text-lg font-semibold text-foreground">
                    {trait}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-card rounded-2xl p-6 border-2 border-accent/30">
              <h4 className="font-fredoka text-xl font-bold text-foreground mb-3">
                Voice & Tone Guidelines:
              </h4>
              <ul className="font-inter text-muted-foreground space-y-2">
                <li>• <strong>Always use Gen Z slang authentically</strong> - "no cap", "slaps", "fire", "vibes"</li>
                <li>• <strong>Include relevant emojis</strong> - but don't overdo it (2-3 per sentence max)</li>
                <li>• <strong>Be conversational</strong> - write like you're texting your bestie about food</li>
                <li>• <strong>Stay positive</strong> - even constructive feedback should feel encouraging</li>
                <li>• <strong>Be inclusive</strong> - celebrate all food preferences and dietary needs</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card className="mb-12 border-2 border-secondary/20">
          <CardHeader>
            <CardTitle className="font-fredoka text-3xl text-foreground flex items-center gap-3">
              <Palette className="w-8 h-8 text-secondary" />
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {colorPalette.map((color, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                  <div 
                    className="w-full h-20 rounded-xl mb-4 border-2 border-border"
                    style={{ backgroundColor: color.value }}
                  ></div>
                  <h4 className="font-fredoka text-lg font-bold text-foreground mb-2">
                    {color.name}
                  </h4>
                  <p className="font-inter text-sm text-muted-foreground mb-3">
                    {color.usage}
                  </p>
                  <div className="flex items-center justify-between bg-muted rounded-lg p-3">
                    <code className="font-mono text-sm text-foreground">
                      {color.value}
                    </code>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card className="mb-12 border-2 border-tertiary/20">
          <CardHeader>
            <CardTitle className="font-fredoka text-3xl text-foreground flex items-center gap-3">
              <Type className="w-8 h-8 text-tertiary" />
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {typography.map((font, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="flex flex-col md:flex-row md:items-center gap-6">
                    <div className="flex-1">
                      <h4 className="font-fredoka text-xl font-bold text-foreground mb-2">
                        {font.name}
                      </h4>
                      <p className="font-inter text-muted-foreground mb-4">
                        {font.usage}
                      </p>
                      <div className="bg-muted rounded-lg p-3">
                        <code className="font-mono text-sm text-foreground">
                          font-family: '{font.name}'
                        </code>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className={`${font.className} text-foreground`}>
                        {font.example}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Logo Guidelines */}
        <Card className="mb-12 border-2 border-quaternary/20">
          <CardHeader>
            <CardTitle className="font-fredoka text-3xl text-foreground flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-quaternary" />
              Logo Variations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {logoVariations.map((variation, index) => (
                <div key={index} className="bg-card rounded-2xl p-6 border border-border">
                  <div className="font-inter text-foreground">
                    {variation}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl p-6 border-2 border-accent/30">
              <h4 className="font-fredoka text-xl font-bold text-foreground mb-3">
                Logo Do's & Don'ts:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-fredoka text-lg font-semibold text-primary mb-3">✅ Do:</h5>
                  <ul className="font-inter text-muted-foreground space-y-2">
                    <li>• Maintain proper spacing around the logo</li>
                    <li>• Use on contrasting backgrounds</li>
                    <li>• Keep proportions intact when scaling</li>
                    <li>• Use approved color variations</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-fredoka text-lg font-semibold text-destructive mb-3">❌ Don't:</h5>
                  <ul className="font-inter text-muted-foreground space-y-2">
                    <li>• Stretch or skew the logo</li>
                    <li>• Use on low-contrast backgrounds</li>
                    <li>• Add effects like drop shadows</li>
                    <li>• Change the font or colors</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <div className="text-center">
          <h3 className="font-fredoka text-3xl font-bold text-foreground mb-4">
            Ready to Build Something Amazing? 🚀
          </h3>
          <p className="font-inter text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            This brand guide is your north star for creating consistent, engaging experiences 
            that Seattle foodies will absolutely love!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" className="text-lg px-8 py-4">
              Download Brand Assets ⬇️
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              View Style Guide 📖
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandGuide;