
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AIGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [promptType, setPromptType] = useState("standard");
  const [loading, setLoading] = useState(false);

  const promptTypes = [
    {
      value: "standard",
      label: "Standard Prompt – For general use prompt generation"
    },
    {
      value: "reasoning",
      label: "Reasoning Prompt – For reasoning tasks and complex problem solving"
    },
    {
      value: "race",
      label: "Race Prompt – Follow the RACE Framework"
    }
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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Add some text to generate your AI prompt.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/generate-structured-prompt/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ idea: prompt, prompt_type: promptType })
      });

      if (!response.ok) throw new Error("Failed to fetch prompt");

      const data = await response.text();
      setGeneratedPrompt(data);

      toast({
        title: "AI prompt generated!",
        description: "Your prompt has been enhanced and optimized."
      });
    } catch (error) {
      console.error("Error generating prompt:", error);
      toast({
        title: "Error generating prompt",
        description: "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
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
        {/* Main Content */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Card */}
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
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
                    className="h-12 px-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg flex items-center justify-center gap-2"
                    disabled={loading}
                  >
                    {loading && <RefreshCw className="animate-spin w-5 h-5" />}
                    {loading ? "Generating..." : "Generate"}
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

            {/* Output Card */}
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
                <div className="min-h-[400px]">
                  {generatedPrompt ? (
                    <Textarea
                      value={generatedPrompt}
                      onChange={(e) => setGeneratedPrompt(e.target.value)}
                      className="min-h-[400px] text-sm font-mono border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Your generated prompt will appear here..."
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500 bg-gray-50 border-2 border-gray-200 rounded-lg">
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
