import { motion } from 'framer-motion';

interface NavLinkProps {
    children: React.ReactNode;
    idx: number;
    isSelected: boolean;
    onClick: () => void;
}

const NavLink = ({ children, idx, isSelected, onClick }: NavLinkProps) => {
  return (
    <motion.li 
      key={idx} 
      className={`cursor-pointer text-md bg-none transition-colors duration-200 text-center ${
        isSelected 
          ? 'text-gray-800' 
          : 'text-gray-400'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        scale: isSelected ? 1.2 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      {children}
    </motion.li>
  )
}

export default NavLink