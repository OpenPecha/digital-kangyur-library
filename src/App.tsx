import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from "./hooks/useLocalization";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import History from "./pages/History";
import HistoryDevelopment from "./pages/HistoryDevelopment";
import About from "./pages/About";
import Dashboard from "./pages/admin/Dashboard";
import KarchagAdmin from "./pages/admin/KarchagAdmin";
import EditionsAdmin from "./pages/admin/EditionsAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import NewsDetail from "./pages/NewsDetail";
import Videos from "./pages/Videos";
import TantraText from "./pages/TantraText";

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
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsDetail />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/tantra/:id" element={<TantraText />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/development" element={<HistoryDevelopment />} />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/news" element={<NewsAdmin />} />
            <Route path="/admin/karchag" element={<KarchagAdmin />} />
            <Route path="/admin/editions" element={<EditionsAdmin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LocalizationProvider>
  </QueryClientProvider>
);

export default App;
