import { Button } from "@/components/ui/button";
import { Heart, Instagram, Twitter, Video, Mail } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: <Instagram className="w-5 h-5" />, label: "Instagram", color: "text-primary" },
    { icon: <Video className="w-5 h-5" />, label: "TikTok", color: "text-tertiary" },
    { icon: <Twitter className="w-5 h-5" />, label: "Twitter", color: "text-quaternary" },
    { icon: <Mail className="w-5 h-5" />, label: "Email", color: "text-secondary" }
  ];

  const footerLinks = [
    {
      title: "Quick Bites",
      links: ["Best Pizza 🍕", "Happy Hour Spots 🍸", "Vegan Eats 🌱", "Date Night Vibes 💕"]
    },
    {
      title: "Locations",
      links: ["Seattle", "Bellevue", "Bothell", "Redmond"]
    },
    {
      title: "About Us",
      links: ["Our Story", "Join the Team", "Press Kit", "Contact"]
    }
  ];

  return (
    <footer className="bg-gradient-to-t from-primary/10 via-background to-background border-t-2 border-primary/20">
      <div className="container mx-auto px-4 py-16">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <h3 className="font-fredoka text-2xl font-bold text-foreground mb-4">
              QuirkYourTaste 🍴
            </h3>
            <p className="font-inter text-muted-foreground mb-6 leading-relaxed">
              Seattle's quirkiest food discovery app. We're not just finding you food – we're finding you vibes! ✨
            </p>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={`${social.color} hover:scale-110 transition-transform duration-300 rounded-full`}
                  aria-label={social.label}
                >
                  {social.icon}
                </Button>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h4 className="font-fredoka text-lg font-semibold text-foreground mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href="#" 
                      className="font-inter text-muted-foreground hover:text-primary transition-colors duration-300 hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter signup */}
        <div className="bg-gradient-to-r from-secondary/20 to-accent/20 rounded-2xl p-8 mb-12 border-2 border-secondary/30">
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="font-fredoka text-2xl font-bold text-foreground mb-3">
              Stay in the Loop! 📬
            </h4>
            <p className="font-inter text-muted-foreground mb-6">
              Get the hottest food drops, exclusive deals, and insider reviews straight to your inbox. No spam, just pure food content!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="your-email@foodie.com"
                className="flex-1 px-4 py-3 rounded-full border-2 border-border bg-background text-foreground font-inter focus:outline-none focus:border-primary transition-colors duration-300"
              />
              <Button variant="secondary" className="px-6 py-3">
                Subscribe ✨
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <div className="font-inter text-muted-foreground mb-4 md:mb-0">
            © 2024 QuirkYourTaste. Made with{" "}
            <Heart className="w-4 h-4 inline text-primary animate-pulse" />{" "}
            in Seattle 🌧️
          </div>
          
          <div className="flex gap-6 font-inter text-sm">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>

        {/* Fun easter egg */}
        <div className="text-center mt-8">
          <p className="font-inter text-xs text-muted-foreground/70">
            Powered by coffee ☕ and an unhealthy obsession with good food 🤤
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;