import { motion } from 'framer-motion';
import { RefreshCcw, Sun, Moon, CalendarDays, Key } from 'lucide-react';

interface ResultData {
  sun: { sign: string; degree: number; minute: number };
  moon: { sign: string; degree: number; minute: number };
  day: string;
  anno: string;
  formatted: string;
}

interface Props {
  data: ResultData | null;
  onReset: () => void;
}

export function ResultDisplay({ data, onReset }: Props) {
  if (!data) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass-panel p-8 md:p-12 rounded-2xl w-full max-w-2xl text-center relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-32 bg-[#d4af37] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 p-32 bg-[#1e1b4b] opacity-30 blur-[100px] rounded-full pointer-events-none" />

      <motion.p variants={itemVariants} className="text-[#d4af37] tracking-[0.2em] uppercase text-xs font-semibold mb-6">
        Do what thou wilt shall be the whole of the Law
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10 text-left">
        
        <motion.div variants={itemVariants} className="flex flex-col space-y-1 bg-[#020617]/40 p-5 rounded-xl border border-[#d4af37]/10">
          <div className="flex items-center space-x-2 text-[#d4af37] mb-2">
            <Sun className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-widest text-xs">Sol</span>
          </div>
          <p className="text-2xl font-[--font-serif] text-white">
            {data.sun.degree}° {data.sun.minute}' <span className="text-[#d4af37] ml-1">{data.sun.sign}</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col space-y-1 bg-[#020617]/40 p-5 rounded-xl border border-[#d4af37]/10">
           <div className="flex items-center space-x-2 text-[#e2e8f0] mb-2">
            <Moon className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-widest text-xs">Luna</span>
          </div>
          <p className="text-2xl font-[--font-serif] text-white">
            {data.moon.degree}° {data.moon.minute}' <span className="text-[#e2e8f0] ml-1">{data.moon.sign}</span>
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col space-y-1 bg-[#020617]/40 p-5 rounded-xl border border-[#d4af37]/10">
           <div className="flex items-center space-x-2 text-[#d4af37]/70 mb-2">
            <CalendarDays className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-widest text-xs">Day</span>
          </div>
          <p className="text-xl font-[--font-serif] text-[#fcd34d]">
            {data.day}
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="flex flex-col space-y-1 bg-[#020617]/40 p-5 rounded-xl border border-[#d4af37]/10">
           <div className="flex items-center space-x-2 text-[#d4af37]/70 mb-2">
            <Key className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-widest text-xs">Anno</span>
          </div>
          <p className="text-xl font-[--font-serif] text-[#fcd34d]">
            {data.anno}
          </p>
        </motion.div>
      </div>

      <motion.div variants={itemVariants} className="mx-auto w-full pt-6 border-t border-[rgba(212,175,55,0.15)] mt-4">
        <p className="text-sm md:text-base text-[#e2e8f0]/80 font-mono mb-8 bg-[#020617]/60 p-4 rounded-lg inline-block border border-white/5">
          {data.formatted}
        </p>
      </motion.div>
      
      <motion.p variants={itemVariants} className="text-[#d4af37] tracking-[0.2em] uppercase text-xs font-semibold mt-4 mb-10">
        Love is the law, love under will
      </motion.p>
      
      <motion.button
        variants={itemVariants}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className="flex items-center space-x-2 mx-auto text-sm uppercase tracking-widest font-semibold text-[#e2e8f0]/60 hover:text-[#d4af37] transition-colors"
      >
        <RefreshCcw className="w-4 h-4" />
        <span>Calculate Another Date</span>
      </motion.button>
    </motion.div>
  );
}
