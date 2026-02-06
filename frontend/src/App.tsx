import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/molecules/tooltip";
import { Toaster as Sonner } from "@/components/ui/atoms/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/admin/ProtectedRoute";
import React, { Suspense, lazy } from "react";

// Lazy load pages and components
const Index = lazy(() => import("./pages/Index"));
const Catalog = lazy(() => import("./pages/Catalog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const News = lazy(() => import("./pages/News"));
const History = lazy(() => import("./pages/History"));
const HistoryDevelopment = lazy(() => import("./pages/HistoryDevelopment"));
const About = lazy(() => import("./pages/About"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const KarchagAdmin = lazy(() => import("./pages/admin/KarchagAdmin"));
const NewsAdmin = lazy(() => import("./pages/admin/NewsAdmin"));
const VideosAdmin = lazy(() => import("./pages/admin/VideosAdmin"));
const TimelineAdmin = lazy(() => import("./pages/admin/TimelineAdmin"));
const AudioAdmin = lazy(() => import("./pages/admin/AudioAdmin"));
const CatalogAdmin = lazy(() => import("./pages/admin/CatalogAdmin"));
const UsersAdmin = lazy(() => import("./pages/admin/UsersAdmin"));
const Login = lazy(() => import("./pages/admin/Login"));
const NewsDetail = lazy(() => import("./pages/NewsDetail"));
const Videos = lazy(() => import("./pages/Videos"));
const TantraText = lazy(() => import("./pages/TantraText"));
const TextDetail = lazy(() => import("./pages/TextDetail"));
const Search = lazy(() => import("./pages/Search"));
const Navbar = lazy(() => import("./components/ui/molecules/Navbar"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/search" element={<Search />} />
              <Route path="/news" element={<News />} />
              <Route path="/news/:id" element={<NewsDetail />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/tantra/:id" element={<TantraText />} />
              <Route path="/texts/:id" element={<TextDetail />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/development" element={<HistoryDevelopment />} />
              <Route path="/about" element={<About />} />
              <Route path="/admin/login" element={<Login />} />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/news"
                element={
                  <ProtectedRoute>
                    <NewsAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/videos"
                element={
                  <ProtectedRoute>
                    <VideosAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/timeline"
                element={
                  <ProtectedRoute>
                    <TimelineAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/audio"
                element={
                  <ProtectedRoute>
                    <AudioAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/catalog"
                element={
                  <ProtectedRoute>
                    <CatalogAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <UsersAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/karchag"
                element={
                  <ProtectedRoute>
                    <KarchagAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/karchag/:mainId"
                element={
                  <ProtectedRoute>
                    <KarchagAdmin />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/karchag/:mainId/:subId"
                element={
                  <ProtectedRoute>
                    <KarchagAdmin />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
