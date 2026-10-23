import { motion } from 'framer-motion';

export default function Loader({ progress }) {
  return (
    <motion.div
      className="loader-wrapper"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.img
        src="/logo.png"
        alt="Bellavierre"
        className="loader-logo"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      />

      <div className="loader-bar-track">
        <motion.div
          className="loader-bar-fill"
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <motion.p
        className="loader-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Bellavierre Real Estate
      </motion.p>
    </motion.div>
  );
}
