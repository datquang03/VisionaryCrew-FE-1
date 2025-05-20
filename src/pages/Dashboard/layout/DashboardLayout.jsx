
import React from 'react';
import { IoMdHome, IoMdPeople, IoMdCalendar, IoMdSettings, IoMdPerson } from 'react-icons/io';
import { Sidebar, SidebarBody, SidebarLink } from '../../../components/3D_Threejs/Sidebar';
import { BackgroundLines } from '../../../components/3D_Threejs/BackgroundLines';

const MainLayout = ({ role, children }) => {
  // Define sidebar items based on role
  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: <IoMdHome className="text-2xl" /> },
    { href: '/admin/users', label: 'Users', icon: <IoMdPeople className="text-2xl" /> },
    { href: '/admin/settings', label: 'Settings', icon: <IoMdSettings className="text-2xl" /> },
    { href: '/admin/tools', label: 'Admin Tools', icon: <IoMdPerson className="text-2xl" /> },
    { href: '/', label: 'Về trang chủ', icon: <IoMdHome className="text-2xl" /> },
];

const doctorLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: <IoMdHome className="text-2xl" /> },
    { href: '/dashboard', label: 'Patients', icon: <IoMdPeople className="text-2xl" /> },
    { href: '/dashboard', label: 'Schedule', icon: <IoMdCalendar className="text-2xl" /> },
    { href: '/dashboard', label: 'Settings', icon: <IoMdSettings className="text-2xl" /> },
    { href: '/', label: 'Về trang chủ', icon: <IoMdHome className="text-2xl" /> },
  ];

  const links = role === 'Admin' ? adminLinks : role === 'Doctor' ? doctorLinks : [];

  return (
    <div className="flex min-h-screen w-full">
  {/* Sidebar */}
  {role !== 'User' && (
    <div className="w-fit">
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
  <div className="flex-1 relative">
    <BackgroundLines />
    <div className="relative z-10 container mx-auto p-6">
      {children}
    </div>
  </div>
</div>

  );
};

export default MainLayout;