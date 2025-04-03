import { motion } from "framer-motion";
const containerVariants = {
  initial: { x: "100%" },
  animate: {
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      bounce: 1,
    },
  },
  exit: {
    x: "100%",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.5,
      bounce: 1,
    },
  },
};
export default function ShoppingCart({ toggle }: { toggle: () => void }) {
  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-[100] overflow-y-hidden "
        onClick={toggle}
      ></div>
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-96 h-full fixed top-0 right-1 z-[100] shadow-lg rounded-lg py-1"
      >
        <div className="w-full h-full bg-white rounded-lg "></div>
      </motion.div>
    </>
  );
}
