import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

/**
 * DashboardLayout - Clean layout matching ZIP editorial design.
 * No top navbar or footer — pages handle their own hero sections.
 * Sidebar on the left, scrollable content on the right.
 */
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white font-body text-zinc-900">
      <div className="w-full min-h-screen bg-white flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onOpen={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-white min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
