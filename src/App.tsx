
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AIGenerator from "./pages/AIGenerator";
import ChatGPTGenerator from "./pages/ChatGPTGenerator";
import MidjourneyGenerator from "./pages/MidjourneyGenerator";
import StableDiffusionGenerator from "./pages/StableDiffusionGenerator";
import ClaudeGenerator from "./pages/ClaudeGenerator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-generator" element={<AIGenerator />} />
          <Route path="/chatgpt-generator" element={<ChatGPTGenerator />} />
          <Route path="/midjourney-generator" element={<MidjourneyGenerator />} />
          <Route path="/stable-diffusion-generator" element={<StableDiffusionGenerator />} />
          <Route path="/claude-generator" element={<ClaudeGenerator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
