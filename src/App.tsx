
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
import History from "./pages/History";
import DergeDetail from "./pages/DergeDetail";
import ChoneDetail from "./pages/ChoneDetail";
import LhasaDetail from "./pages/LhasaDetail";
import NarthangDetail from "./pages/NarthangDetail";
import PekingDetail from "./pages/PekingDetail";
import UrgaDetail from "./pages/UrgaDetail";
import About from "./pages/About";
import Audio from "./pages/Audio";
import VideoPage from "./pages/Video";
import { LocalizationProvider } from "./hooks/useLocalization";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/texts" element={<Texts />} />
            <Route path="/texts/:id" element={<TextDetail />} />
            <Route path="/texts/derge-detail" element={<DergeDetail />} />
            <Route path="/texts/chone-detail" element={<ChoneDetail />} />
            <Route path="/texts/lhasa-detail" element={<LhasaDetail />} />
            <Route path="/texts/narthang-detail" element={<NarthangDetail />} />
            <Route path="/texts/peking-detail" element={<PekingDetail />} />
            <Route path="/texts/urga-detail" element={<UrgaDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="/history" element={<History />} />
            <Route path="/audio" element={<Audio />} />
            <Route path="/video" element={<VideoPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default App;
