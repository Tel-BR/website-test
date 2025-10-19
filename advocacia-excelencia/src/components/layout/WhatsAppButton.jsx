import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function WhatsAppButton({ phone }) {
  if (!phone) return null;

  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=Olá! Gostaria de agendar uma consulta.`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl z-40 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1 }}
    >
      <MessageCircle size={28} />
    </motion.button>
  );
}
