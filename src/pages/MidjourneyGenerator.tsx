
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const MidjourneyGenerator = () => {
  const [idea, setIdea] = useState("a photo of a man eating spinach on a ship");
  const [orientation, setOrientation] = useState("horizontal");

  const orientationOptions = [
    { value: "horizontal", label: "Horizontal" },
    { value: "vertical", label: "Vertical" },
    { value: "square", label: "Square" },
    { value: "portrait", label: "Portrait" },
    { value: "landscape", label: "Landscape" },
  ];

  const handleGenerate = () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter an idea",
        description: "Add some text to generate your Midjourney prompt.",
        variant: "destructive"
      });
      return;
    }

    const enhancedPrompt = `${idea} --ar ${orientation === 'horizontal' ? '16:9' : orientation === 'vertical' ? '9:16' : '1:1'} --v 6`;
    setIdea(enhancedPrompt);
    
    toast({
      title: "Midjourney prompt generated!",
      description: "Your prompt has been optimized for Midjourney."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(idea);
    toast({
      title: "Copied to clipboard",
      description: "Your Midjourney prompt has been copied successfully."
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to generators
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            The Free Midjourney Prompt Generator
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/ai-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">AI Prompt Generator</Link>
            <Link to="/chatgpt-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">ChatGPT Prompt Generator</Link>
            <span className="px-4 py-2 text-sm bg-blue-100 rounded">Midjourney Prompt Generator</span>
            <Link to="/claude-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Claude Prompt Generator</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Idea Input */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Idea</label>
                <Textarea
                  placeholder="a photo of a man eating spinach on a ship"
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                  className="min-h-[150px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Orientation Select */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-2">Orientation</label>
                <Select value={orientation} onValueChange={setOrientation}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {orientationOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Generate Button */}
              <div className="flex gap-2 justify-center">
                <Button 
                  onClick={handleGenerate}
                  className="h-12 px-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg"
                >
                  Generate
                </Button>
                <Button 
                  onClick={handleCopy}
                  variant="outline"
                  className="h-12 px-4 border-2"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MidjourneyGenerator;
