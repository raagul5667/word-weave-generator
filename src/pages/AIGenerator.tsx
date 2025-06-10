
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [promptType, setPromptType] = useState("standard");

  const promptTypes = [
    { value: "standard", label: "Standard Prompt – For general use prompt generation" },
    { value: "reasoning", label: "Reasoning Prompt – For reasoning tasks and complex problem solving" },
    { value: "race", label: "Race Prompt – Follow the RACE Framework" },
  ];

  const quickActions = [
    "Create a LinkedIn post",
    "Draft a product description", 
    "Write customer support response",
    "Write marketing copy",
    "Write a blog post outline",
    "Create presentation outline",
    "Create a proposal",
    "Write a professional email"
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Add some text to generate your AI prompt.",
        variant: "destructive"
      });
      return;
    }

    const enhancedPrompt = `Enhanced ${promptType} prompt: ${prompt}`;
    setPrompt(enhancedPrompt);
    
    toast({
      title: "AI prompt generated!",
      description: "Your prompt has been enhanced and optimized."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    toast({
      title: "Copied to clipboard",
      description: "Your prompt has been copied successfully."
    });
  };

  const handleQuickAction = (action: string) => {
    setPrompt(`I want a prompt that will ${action.toLowerCase()}`);
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
            AI Prompt Generator
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <span className="px-4 py-2 text-sm bg-blue-100 rounded">AI Prompt Generator</span>
            <Link to="/chatgpt-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">ChatGPT Prompt Generator</Link>
            <Link to="/midjourney-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Midjourney Prompt Generator</Link>
            <Link to="/claude-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Claude Prompt Generator</Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Prompt Input Area */}
              <div className="mb-6">
                <Textarea
                  placeholder="I want a prompt that will..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[200px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="flex-1">
                  <Select value={promptType} onValueChange={setPromptType}>
                    <SelectTrigger className="h-12 border-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {promptTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleGenerate}
                    className="h-12 px-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
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
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-3 text-sm text-left justify-start hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
