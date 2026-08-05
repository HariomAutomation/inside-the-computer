import { motion } from 'framer-motion';

export default function S3_Representations() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Signed Numbers & Floats</h2>
        <p className="text-white/60 text-sm">How computers represent negative numbers and decimals.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: "Two's Complement", desc: 'Flip bits + 1 to get negative. MSB = sign bit.', example: '5 = 0101, -5 = 1011', color: 'border-blue-500/30' },
          { name: 'IEEE 754 Float', desc: 'Sign | Exponent | Mantissa. Handles decimals.', example: '3.14 = 0 10000000 10010001...', color: 'border-purple-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className={`glass rounded-2xl border ${item.color} p-5`}
          >
            <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            <p className="text-[11px] text-white/60 mt-2">{item.desc}</p>
            <p className="text-[10px] text-white/40 font-mono mt-2">{item.example}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-amber-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-amber-400">Overflow Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Jab result represent karne ke bits nahi hote toh <span className="text-red-400 font-bold">overflow</span> hota hai.
          Jaise 8-bit signed mein max 127 hai — agar 127+1 karo toh -128 ban jaata hai! 🤯
        </p>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Negative Numbers Kaise Represent Hote Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Computers <span className="text-blue-400 font-bold">Two's Complement</span> use karte hain —
          sabse left bit sign hoti hai (0=positive, 1=negative). Negative number ke liye
          bits flip karo + 1 add karo. Floats ke liye <span className="text-purple-400 font-bold">IEEE 754</span> standard hai —
          sign, exponent, mantissa teen parts mein number split hota hai. 💡
        </p>
      </div>
    </div>
  );
}
