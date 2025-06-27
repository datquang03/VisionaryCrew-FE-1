import Navbar from "./Navbar/Navbar";

const Layout = () => {
  return (
    <div className="p-4 min-h-screen">
      <Navbar />
      <div className="container mx-auto">
        {/* Main content will be rendered here */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border border-indigo-300/30">
          {/* Children components will be injected here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
Layout;
