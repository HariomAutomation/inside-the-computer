import { motion } from 'framer-motion';
import BinaryConverter from '../components/BinaryConverter';

export default function S4_BinaryMath() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Binary Math</h2>
        <p className="text-white/60 text-sm">Computers only understand 0s and 1s. Let's learn why.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Try It: Binary ↔ Decimal Converter</h3>
        <BinaryConverter initialValue={42} />
      </motion.div>

      <div className="grid grid-cols-8 gap-2">
        {Array.from({ length: 256 }, (_, i) => i).map((n) => (
          <motion.div
            key={n}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: n * 0.002 }}
            className="binary-bulb w-8 h-8 rounded-lg flex items-center justify-center text-[8px] font-mono glass border border-white/5"
          >
            {n}
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-amber-400">Binary Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Binary sirf do digits use karta hai — <span className="text-green-400 font-bold">0</span> aur
          <span className="text-green-400 font-bold"> 1</span>. Har position ka value 2 ke power pe hota hai
          (1, 2, 4, 8, 16...). Jaise <span className="text-primary-400 font-mono font-bold">1010</span> = 8+0+2+0 = 10.
          Computer kyunki transistors use karta hai jo sirf ON (1) ya OFF (0) ho sakte hain,
          isliye binary use karna padta hai. Tumhare phone ke processor mein <span className="text-purple-400 font-bold">billions</span> of transistors
          sirf 0 aur 1 handle karte hain! 💡
        </p>
      </div>
    </div>
  );
}
