import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const FinalMessage = ({ show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="final-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <motion.div
            className="message-card"
            initial={{ y: 40, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", damping: 12 }}
          >
            <motion.p
              className="message-line line-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              Tal vez no sean reales
            </motion.p>

            <motion.p
              className="message-line line-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 0.8 }}
            >
              Pero no te quedas sin tus flores amarillas
            </motion.p>

            <motion.p
              className="message-line line-3"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 3, duration: 0.6, type: "spring", stiffness: 200 }}
            >
              TE AMO
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FinalMessage;
