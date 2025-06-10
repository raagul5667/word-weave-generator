
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const navigationItems = [
  {
    href: "/ai-generator",
    title: "AI Prompt Generator",
    description: "Generate prompts for general AI use cases"
  },
  {
    href: "/chatgpt-generator",
    title: "ChatGPT Prompt Generator",
    description: "Optimized prompts for ChatGPT interactions"
  },
  {
    href: "/midjourney-generator",
    title: "Midjourney Prompt Generator",
    description: "Create detailed prompts for Midjourney AI art"
  },
  {
    href: "/claude-generator",
    title: "Claude Prompt Generator",
    description: "Structured prompts for Claude AI assistant"
  }
];

const NavigationCards = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-6xl mx-auto">
      {navigationItems.map((item) => (
        <Link key={item.href} to={item.href}>
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6 text-center">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default NavigationCards;
