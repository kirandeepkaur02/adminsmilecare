import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar"
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (

    <div className="  flex ">

      <Sidebar   />

      <div className="flex-1 ">

          <Navbar />

          <main className=" bg-gray-100 min-h-screen">

              <Outlet />

          </main>

      </div>

    </div>

  );
};

export default AdminLayout;