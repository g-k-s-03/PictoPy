import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Bolt,
  Home,
  Sparkles,
  Heart,
  Video,
  BookImage,
  ClockFading,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useLocation, Link } from 'react-router';
import { ROUTES } from '@/constants/routes';
import { getVersion } from '@tauri-apps/api/app';
import { useEffect, useState } from 'react';

export function AppSidebar() {
  const location = useLocation();
  const [version, setVersion] = useState<string>('1.0.0');
  const { state, toggleSidebar } = useSidebar();
  const isCollapsed = state === 'collapsed';

  useEffect(() => {
    getVersion().then((version) => {
      setVersion(version);
    });
  }, []);

  const isActive = (path: string) => {
    // Remove leading slash from both paths for comparison
    const currentPath = location.pathname.replace(/^\//, '');
    const menuPath = path.replace(/^\//, '');

    // Handle home route specially (both '/' and '/home' should be active for home)
    if (menuPath === ROUTES.HOME || menuPath === '') {
      return currentPath === ROUTES.HOME || currentPath === '';
    }

    return currentPath === menuPath;
  };

  const menuItems = [
    { name: 'Home', path: `/${ROUTES.HOME}`, icon: Home },
    { name: 'AI Tagging', path: `/${ROUTES.AI}`, icon: Sparkles },
    { name: 'Favourites', path: `/${ROUTES.FAVOURITES}`, icon: Heart },
    { name: 'Videos', path: `/${ROUTES.VIDEOS}`, icon: Video },
    { name: 'Albums', path: `/${ROUTES.ALBUMS}`, icon: BookImage },
    { name: 'Memories', path: `/${ROUTES.MEMORIES}`, icon: ClockFading },
    { name: 'Settings', path: `/${ROUTES.SETTINGS}`, icon: Bolt },
  ];

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-border/40 border-r shadow-sm"
    >
      <SidebarHeader className="flex flex-row items-center justify-between px-3 py-3">
        {!isCollapsed && <div className="text-lg font-semibold">.</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="size-7 cursor-pointer"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </SidebarHeader>
      <SidebarSeparator className="mx-3 opacity-50" />
      <SidebarContent className="py-4">
        <SidebarMenu className="space-y-2 px-3">
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.path}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.path)}
                tooltip={item.name}
                className="rounded-sm"
              >
                <Link to={item.path} className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-border/40 mt-auto border-t py-4">
        <div className="text-muted-foreground space-y-1 px-4 text-xs">
          <div className="font-medium">PictoPy v{version}</div>
          <div>© {new Date().getFullYear()} PictoPy</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
