
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [promptType, setPromptType] = useState("standard");
  const [activeTab, setActiveTab] = useState("chatgpt");

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

    // Simulate prompt generation
    const enhancedPrompt = `Enhanced ${promptType} prompt: ${prompt}`;
    setPrompt(enhancedPrompt);
    
    toast({
      title: "Prompt generated!",
      description: "Your AI prompt has been enhanced and optimized."
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
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Word Weave Generator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Generate optimized prompts for any AI platform with our intelligent prompt engineering tool
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          {/* AI Platform Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-12">
              <TabsTrigger value="chatgpt" className="text-sm">ChatGPT Prompt Generator</TabsTrigger>
              <TabsTrigger value="midjourney" className="text-sm">Midjourney Prompt Generator</TabsTrigger>
              <TabsTrigger value="stable-diffusion" className="text-sm">Stable Diffusion Prompt Generator</TabsTrigger>
              <TabsTrigger value="claude" className="text-sm">Claude Prompt Generator</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-8">
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
            </TabsContent>
          </Tabs>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Smart Enhancement</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI automatically enhances your prompts for better results across all platforms
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Copy className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="font-semibold mb-2">One-Click Copy</h3>
                <p className="text-sm text-muted-foreground">
                  Copy optimized prompts instantly and paste them into your favorite AI tool
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Multi-Platform</h3>
                <p className="text-sm text-muted-foreground">
                  Generate prompts optimized for ChatGPT, Claude, Midjourney, and more
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
