import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/molecules/tooltip";
import { Toaster as Sonner } from "@/components/ui/atoms/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";

import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import History from "./pages/History";
import HistoryDevelopment from "./pages/HistoryDevelopment";
import About from "./pages/About";
import Dashboard from "./pages/admin/Dashboard";
import KarchagAdmin from "./pages/admin/KarchagAdmin";
import NewsAdmin from "./pages/admin/NewsAdmin";
import VideosAdmin from "./pages/admin/VideosAdmin";
import TimelineAdmin from "./pages/admin/TimelineAdmin";
import AudioAdmin from "./pages/admin/AudioAdmin";
import CatalogAdmin from "./pages/admin/CatalogAdmin";
import UsersAdmin from "./pages/admin/UsersAdmin";
import Login from "./pages/admin/Login";
import NewsDetail from "./pages/NewsDetail";
import Videos from "./pages/Videos";
import TantraText from "./pages/TantraText";
import TextDetail from "./pages/TextDetail";
import Navbar from "./components/ui/molecules/Navbar";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/tantra/:id" element={<TantraText />} />
              <Route path="/texts/:id" element={<TextDetail />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/development" element={<HistoryDevelopment />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/admin/news" element={<ProtectedRoute><NewsAdmin /></ProtectedRoute>} />
              <Route path="/admin/videos" element={<ProtectedRoute><VideosAdmin /></ProtectedRoute>} />
              <Route path="/admin/timeline" element={<ProtectedRoute><TimelineAdmin /></ProtectedRoute>} />
              <Route path="/admin/audio" element={<ProtectedRoute><AudioAdmin /></ProtectedRoute>} />
              <Route path="/admin/catalog" element={<ProtectedRoute><CatalogAdmin /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute><UsersAdmin /></ProtectedRoute>} />
              <Route path="/admin/karchag" element={<ProtectedRoute><KarchagAdmin /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
  </QueryClientProvider>
);

export default App;
