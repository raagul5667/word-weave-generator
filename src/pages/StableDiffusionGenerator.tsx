
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const StableDiffusionGenerator = () => {
  const [idea, setIdea] = useState("a photo of a man eating spinach on a ship");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [type, setType] = useState("3d-render");

  const typeOptions = [
    { value: "3d-render", label: "3D Render" },
    { value: "photorealistic", label: "Photorealistic" },
    { value: "anime", label: "Anime" },
    { value: "oil-painting", label: "Oil Painting" },
    { value: "watercolor", label: "Watercolor" },
    { value: "sketch", label: "Sketch" },
  ];

  const handleGenerate = () => {
    if (!idea.trim()) {
      toast({
        title: "Please enter an idea",
        description: "Add some text to generate your Stable Diffusion prompt.",
        variant: "destructive"
      });
      return;
    }

    const enhancedPrompt = `${idea}, ${type} style, high quality, detailed, 8k resolution`;
    setGeneratedPrompt(enhancedPrompt);
    
    toast({
      title: "Stable Diffusion prompt generated!",
      description: "Your prompt has been optimized for Stable Diffusion."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard",
      description: "Your Stable Diffusion prompt has been copied successfully."
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
            The Free Stable Diffusion Prompt Generator
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/ai-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">AI Prompt Generator</Link>
            <Link to="/chatgpt-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">ChatGPT Prompt Generator</Link>
            <Link to="/midjourney-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Midjourney Prompt Generator</Link>
            <span className="px-4 py-2 text-sm bg-blue-100 rounded">Stable Diffusion Prompt Generator</span>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input Card */}
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

                {/* Type Select */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-2">Type</label>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Generate Button */}
                <div className="flex justify-center">
                  <Button 
                    onClick={handleGenerate}
                    className="h-12 px-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg"
                  >
                    Generate
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Generated Prompt Output */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Generated Prompt</h2>
                  {generatedPrompt && (
                    <Button 
                      onClick={handleCopy}
                      variant="outline"
                      className="h-10 px-4 border-2"
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  )}
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 min-h-[400px]">
                  {generatedPrompt ? (
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {generatedPrompt}
                    </pre>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <p>Your generated prompt will appear here...</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StableDiffusionGenerator;
