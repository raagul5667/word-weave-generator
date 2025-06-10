
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Copy, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const ClaudeGenerator = () => {
  const [prompt, setPrompt] = useState("Convert Spanish into Japanese");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [structure, setStructure] = useState("non-xml");

  const structureOptions = [
    { value: "non-xml", label: "Non XML Structure" },
    { value: "xml", label: "XML Structure" },
    { value: "json", label: "JSON Structure" },
    { value: "markdown", label: "Markdown Structure" },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Add some text to generate your Claude prompt.",
        variant: "destructive"
      });
      return;
    }

    let enhancedPrompt = "";
    if (structure === "xml") {
      enhancedPrompt = `<task>${prompt}</task>\n\nPlease provide a detailed and helpful response.`;
    } else if (structure === "json") {
      enhancedPrompt = `{\n  "task": "${prompt}",\n  "instructions": "Please provide a detailed and helpful response"\n}`;
    } else if (structure === "markdown") {
      enhancedPrompt = `# Task\n${prompt}\n\n## Instructions\nPlease provide a detailed and helpful response.`;
    } else {
      enhancedPrompt = `${prompt}\n\nPlease provide a detailed and helpful response.`;
    }
    
    setGeneratedPrompt(enhancedPrompt);
    
    toast({
      title: "Claude prompt generated!",
      description: "Your prompt has been optimized for Claude."
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: "Copied to clipboard",
      description: "Your Claude prompt has been copied successfully."
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
            The Free Claude Prompt Generator
          </h1>
          <div className="flex justify-center gap-4 mb-8">
            <Link to="/ai-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">AI Prompt Generator</Link>
            <Link to="/chatgpt-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">ChatGPT Prompt Generator</Link>
            <Link to="/midjourney-generator" className="px-4 py-2 text-sm bg-gray-100 rounded hover:bg-gray-200">Midjourney Prompt Generator</Link>
            <span className="px-4 py-2 text-sm bg-blue-100 rounded">Claude Prompt Generator</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Input Card */}
          <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Prompt Input */}
              <div className="mb-6">
                <label className="block text-lg font-semibold mb-2">Give me a Claude Prompt to:</label>
                <Textarea
                  placeholder="Convert Spanish into Japanese"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] text-base border-2 border-gray-200 focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              {/* Structure Select */}
              <div className="mb-8">
                <label className="block text-lg font-semibold mb-2">Structure</label>
                <Select value={structure} onValueChange={setStructure}>
                  <SelectTrigger className="h-12 border-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {structureOptions.map((option) => (
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

          {/* Generated Prompt Output */}
          {generatedPrompt && (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Generated Prompt</h2>
                  <Button 
                    onClick={handleCopy}
                    variant="outline"
                    className="h-10 px-4 border-2"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4">
                  <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                    {generatedPrompt}
                  </pre>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaudeGenerator;
