import { motion } from "framer-motion";
import SearchInput from "./SearchInput";
import Dropmenu from "components/Dropmenu";
import useSearchStore from "stores/SearchStore";

const SidebarHeader = () => {
  const searchMode = useSearchStore((state) => state.searchMode);
  const setSearchTerm = useSearchStore((state) => state.setSearchTerm);
  const setSearchMode = useSearchStore((state) => state.setSearchMode);

  return (
    <>
      <div className="w-14 h-[48px]">
        {searchMode ? (
          <motion.span
            key={"back-arrow"}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              setSearchMode(false);
              setSearchTerm("");
            }}
            className="btn btn-circle swap swap-rotate bg-base-300 hover:bg-base-100 border-transparent"
            style={{
              fontFamily: "Fira Code",
            }}
          >
            {"<-"}
          </motion.span>
        ) : (
          <motion.div
            key={"burger-menu"}
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Dropmenu />
          </motion.div>
        )}
      </div>
      <SearchInput />
    </>
  );
};

export default SidebarHeader;
