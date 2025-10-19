import { motion } from 'framer-motion';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseStyles = 'px-8 py-4 rounded-lg font-semibold transition-all duration-300 inline-block';
  
  const variants = {
    primary: 'bg-secondary hover:bg-secondary/90 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-accent hover:bg-accent/90 text-white shadow-lg hover:shadow-xl',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
  };

  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
