import Conversations from "./Conversations";
import { motion } from "framer-motion";
import useSearchStore from "stores/SearchStore";
import SearchConversations from "./SearchConversations";
const SidebarContent = () => {
  const searchMode = useSearchStore((state) => state.searchMode);
  return (
    <>
      {searchMode && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full w-full px-1 absolute"
        >
          <SearchConversations />
        </motion.div>
      )}
      {!searchMode && (
        <motion.div
          key={"conversations"}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="h-full w-full absolute px-1 custom-scroll gutter"
        >
          <Conversations />
        </motion.div>
      )}
    </>
  );
};

export default SidebarContent;
