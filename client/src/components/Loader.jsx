import { motion, AnimatePresence } from "framer-motion";
const Loader = ({ loading }) => {
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute flex justify-center items-center h-screen w-full z-50"
        >
          <span className="absolute animate-spin rounded-full h-10 w-10 border-2 border-r-transparent border-l-transparent border-primary" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
