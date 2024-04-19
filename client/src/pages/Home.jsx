import { Outlet } from "react-router-dom";
import Sidebar from "components/Sidebar";
const Home = () => {
  return (
    <div className="h-full w-full rounded-lg flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};
export default Home;
