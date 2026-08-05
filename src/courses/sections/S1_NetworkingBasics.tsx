import { motion } from 'framer-motion';

export default function S1_NetworkingBasics() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Networking Fundamentals</h2>
        <p className="text-white/60 text-sm">TCP/IP, HTTP, DNS — how computers communicate across the world.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'TCP/IP', desc: 'Reliable, ordered data delivery. 3-way handshake.', layer: 'Transport', color: 'border-blue-500/30' },
          { name: 'HTTP/HTTPS', desc: 'Request-response protocol for the web. TLS encryption.', layer: 'Application', color: 'border-green-500/30' },
          { name: 'DNS', desc: 'Domain names → IP addresses. Hierarchical resolution.', layer: 'Application', color: 'border-purple-500/30' },
          { name: 'WebSocket', desc: 'Full-duplex persistent connection. Real-time data.', layer: 'Application', color: 'border-amber-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-xl border ${item.color} p-4`}
          >
            <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            <p className="text-[10px] text-white/40 mt-1">Layer: {item.layer}</p>
            <p className="text-[11px] text-white/60 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Networking Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Jab tum <span className="text-blue-400 font-bold">google.com</span> type karte ho, DNS se pehle IP address milta hai.
          Phir <span className="text-green-400 font-bold">TCP</span> connection establish hota hai (3-way handshake).
          <span className="text-purple-400 font-bold"> HTTP</span> request jaati hai, server response deta hai.
          <span className="text-amber-400 font-bold"> HTTPS</span> mein data encrypted hota hai (TLS).
          Yeh sab milliseconds mein hota hai! ⚡
        </p>
      </div>
    </div>
  );
}
