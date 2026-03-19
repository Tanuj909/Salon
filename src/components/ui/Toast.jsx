"use client";
import { motion } from "framer-motion";
import { X, CheckCircle, Info, AlertTriangle, AlertCircle } from "lucide-react";
import { useEffect } from "react";

const ICONS = {
  success: <CheckCircle className="text-green-500" size={20} />,
  info: <Info className="text-blue-500" size={20} />,
  warning: <AlertTriangle className="text-amber-500" size={20} />,
  error: <AlertCircle className="text-red-500" size={20} />,
};

const COLORS = {
  success: "border-green-100 bg-white/95", // White bg with border for premium look
  info: "border-blue-100 bg-white/95",
  warning: "border-amber-100 bg-white/95",
  error: "border-red-100 bg-white/95",
};

export default function Toast({ id, title, message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(id), 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 20, scale: 0.95, transition: { duration: 0.2 } }}
      className={`flex w-full max-w-sm gap-3 rounded-2xl border p-4 shadow-2xl backdrop-blur-md ${COLORS[type]}`}
    >
      <div className="flex-shrink-0 mt-0.5">{ICONS[type] || ICONS.info}</div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 leading-none">{title}</h4>
        <p className="mt-1.5 text-xs text-gray-600 line-clamp-2 leading-relaxed">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="flex-shrink-0 self-start text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}
