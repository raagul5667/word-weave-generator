
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
  const [generatedPrompt, setGeneratedPrompt] = useState("");
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
    setGeneratedPrompt(enhancedPrompt);
    
    toast({
      title: "AI prompt generated!",
      description: "Your prompt has been enhanced and optimized."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
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

        {/* Main Content - Two Column Layout */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Input Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                {/* Prompt Input Area */}
                <div className="mb-6">
                  <label className="block text-lg font-semibold mb-2">Give me an AI Prompt to:</label>
                  <Textarea
                    placeholder="I want a prompt that will..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[150px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                  />
                </div>

                {/* Prompt Type Select */}
                <div className="mb-8">
                  <label className="block text-lg font-semibold mb-2">Prompt Type</label>
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

                {/* Generate Button */}
                <div className="flex justify-center mb-8">
                  <Button 
                    onClick={handleGenerate}
                    className="h-12 px-12 bg-black hover:bg-gray-800 text-white font-semibold text-lg"
                  >
                    Generate
                  </Button>
                </div>

                {/* Quick Actions */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
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

export default AIGenerator;
