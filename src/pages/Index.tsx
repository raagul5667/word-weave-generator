
import Header from "@/components/Header";
import NavigationCards from "@/components/NavigationCards";
import PromptGenerator from "@/components/PromptGenerator";
import FeatureCards from "@/components/FeatureCards";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <Header 
          title="Word Weave Generator"
          description="Generate optimized prompts for any AI platform with our intelligent prompt engineering tool"
        />
        
        <NavigationCards />
        
        <PromptGenerator />
        
        <FeatureCards />
      </div>
    </div>
  );
};

export default Index;
