
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, Copy } from "lucide-react";

const features = [
  {
    icon: RefreshCw,
    iconColor: "text-blue-600",
    bgColor: "bg-blue-100",
    title: "Smart Enhancement",
    description: "Our AI automatically enhances your prompts for better results across all platforms"
  },
  {
    icon: Copy,
    iconColor: "text-purple-600",
    bgColor: "bg-purple-100",
    title: "One-Click Copy",
    description: "Copy optimized prompts instantly and paste them into your favorite AI tool"
  },
  {
    icon: RefreshCw,
    iconColor: "text-green-600",
    bgColor: "bg-green-100",
    title: "Multi-Platform",
    description: "Generate prompts optimized for ChatGPT, Claude, Midjourney, and more"
  }
];

const FeatureCards = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {features.map((feature, index) => (
        <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className={`w-12 h-12 ${feature.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
            </div>
            <h3 className="font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;
