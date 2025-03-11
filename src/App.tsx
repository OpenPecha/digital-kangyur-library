
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import Texts from "./pages/Texts";
import TextDetail from "./pages/TextDetail";
import News from "./pages/News";

// History pages
import HistoryDevelopment from "./pages/HistoryDevelopment";
import HistoryTranslation from "./pages/HistoryTranslation";
import HistoryManuscripts from "./pages/HistoryManuscripts";
import HistoryPrintedEditions from "./pages/HistoryPrintedEditions";
import HistoryCommentary from "./pages/HistoryCommentary";

// Media pages
import Audio from "./pages/Audio";
import Video from "./pages/Video";

// About page
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/texts" element={<Texts />} />
          <Route path="/texts/:id" element={<TextDetail />} />
          <Route path="/news" element={<News />} />
          
          {/* History routes */}
          <Route path="/history/development" element={<HistoryDevelopment />} />
          <Route path="/history/translation" element={<HistoryTranslation />} />
          <Route path="/history/manuscripts" element={<HistoryManuscripts />} />
          <Route path="/history/printed-editions" element={<HistoryPrintedEditions />} />
          <Route path="/history/commentary" element={<HistoryCommentary />} />
          
          {/* Media routes */}
          <Route path="/audio" element={<Audio />} />
          <Route path="/video" element={<Video />} />
          
          {/* About route */}
          <Route path="/about" element={<About />} />
          <Route path="/about/team" element={<About />} />
          <Route path="/about/project" element={<About />} />
          <Route path="/about/contact" element={<About />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
