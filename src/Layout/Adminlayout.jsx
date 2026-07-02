import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar"
import { Outlet } from "react-router-dom";
import { useState } from "react";

const AdminLayout = () => {

   const [sidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="  flex ">

      <Sidebar   open={sidebarOpen}
        onClose={() => setSidebarOpen(false)} />

      <div className="flex-1   lg:ml-72 ">

          <Navbar   onMenu={() => setSidebarOpen(true)} />

          <main className=" bg-gray-100 min-h-screen">

              <Outlet />

          </main>

      </div>

    </div>

  );
};

export default AdminLayout;