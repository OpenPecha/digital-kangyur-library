
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { BookOpen, FileText, Video, Mic, NewspaperIcon } from 'lucide-react';

const navigationItems = [
  {
    title: "Karchag Content",
    icon: BookOpen,
    path: "/admin/karchag"
  },
  {
    title: "Audio",
    icon: Mic,
    path: "/admin/audio"
  },
  {
    title: "Video",
    icon: Video,
    path: "/admin/video"
  },
  {
    title: "Kangyur Texts",
    icon: FileText,
    path: "/admin/texts"
  },
  {
    title: "News",
    icon: NewspaperIcon,
    path: "/admin/news"
  }
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar>
          <SidebarHeader className="p-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Content Management</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        tooltip={item.title}
                      >
                        <Link to={item.path} className="w-full">
                          <item.icon />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
