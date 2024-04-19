import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
const Sidebar = () => {
  return (
    <div className="bg-base-300 min-w-[340px] shadow-[rgba(0,_0,_0,_0.4)_0px_0px_30px] flex flex-col">
      <div className="flex gap-2 p-4 border-b-2 border-[rgba(0,0,0,0.35)]">
        <SidebarHeader />
      </div>
      <div className="relative h-full overflow-hidden">
        <SidebarContent />
      </div>
    </div>
  );
};

export default Sidebar;
