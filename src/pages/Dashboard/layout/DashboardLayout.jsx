
import React from 'react';
import { IoMdHome, IoMdPeople, IoMdCalendar, IoMdSettings, IoMdPerson } from 'react-icons/io';
import { Sidebar, SidebarBody, SidebarLink } from '../../../components/3D_Threejs/Sidebar';
import { BackgroundLines } from '../../../components/3D_Threejs/BackgroundLines';
import { FaBook } from "react-icons/fa";


const MainLayout = ({ role, children }) => {
  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <IoMdHome className="text-2xl" /> },
    { href: '/admin/users', label: 'Users', icon: <IoMdPeople className="text-2xl" /> },
    { href: '/admin/settings', label: 'Settings', icon: <IoMdSettings className="text-2xl" /> },
    { href: '/admin/tools', label: 'Admin Tools', icon: <IoMdPerson className="text-2xl" /> },
    { href: '/', label: 'Về trang chủ', icon: <IoMdHome className="text-2xl" /> },
  ];

  const doctorLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <IoMdHome className="text-2xl" /> },
    { href: '/dashboard/patients', label: 'Patients', icon: <IoMdPeople className="text-2xl" /> },
    { href: '/dashboard/schedule', label: 'Schedule', icon: <IoMdCalendar className="text-2xl" /> },
    { href: '/dashboard/blog', label: 'Blogs', icon: <FaBook className="text-2xl" /> },
    { href: '/', label: 'Về trang chủ', icon: <IoMdHome className="text-2xl" /> },
  ];

  const links = role === 'Admin' ? adminLinks : role === 'Doctor' ? doctorLinks : [];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {role !== 'User' && (
        <div className="w-fit z-20">
          <Sidebar>
            <SidebarBody>
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </SidebarBody>
          </Sidebar>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative h-screen overflow-auto">
        {/* Background fixed full screen */}
        <div className="absolute inset-0 z-0">
          <BackgroundLines />
        </div>

        {/* Foreground content (form) */}
        <div className="relative z-10 p-6 w-full max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};


export default MainLayout;