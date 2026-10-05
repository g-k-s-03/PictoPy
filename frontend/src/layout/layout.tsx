import { Navbar } from '@/components/Navigation/Navbar/Navbar';
import { AppSidebar } from '@/components/Navigation/Sidebar/AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Outlet, useLocation } from 'react-router';
import { clearSearch } from '@/features/searchSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const SIDEBAR_OPEN_STORAGE_KEY = 'sidebarOpen';

const Layout: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(
    () => localStorage.getItem(SIDEBAR_OPEN_STORAGE_KEY) !== 'false',
  );

  useEffect(() => {
    if (location.pathname !== '/home') {
      dispatch(clearSearch());
    }
  }, [location, dispatch]);

  const handleSidebarOpenChange = (open: boolean) => {
    setSidebarOpen(open);
    localStorage.setItem(SIDEBAR_OPEN_STORAGE_KEY, String(open));
  };

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={handleSidebarOpenChange}>
      <div className="flex w-full flex-col">
        <Navbar />
        <div className="flex" style={{ height: 'calc(100vh - 56px)' }}>
          <AppSidebar />
          {/* Contain scrolling here so Navbar's parent height never exceeds 100vh — now the navbar is stuck it will not go away.
              hide-scrollbar keeps overflow-y-auto (needed for the sticky navbar) from painting a second, default scrollbar on Windows/WebView2. */}
          <div className="hide-scrollbar m-4 w-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
