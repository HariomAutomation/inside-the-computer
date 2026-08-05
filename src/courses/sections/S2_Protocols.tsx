import { motion } from 'framer-motion';
import NetworkPacketFlow from '../components/NetworkPacketFlow';

export default function S2_Protocols() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Network Protocols</h2>
        <p className="text-white/60 text-sm">Deep dive into how data is routed, secured, and optimized.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: TCP/IP Packet Flow</h3>
        <NetworkPacketFlow />
      </motion.div>

      <div className="space-y-3">
        {[
          { name: 'TLS/SSL', desc: 'Encryption, authentication, integrity', use: 'HTTPS, secure email', icon: '🔐', color: 'text-green-400' },
          { name: 'DHCP', desc: 'Automatic IP address assignment', use: 'Home/office networks', icon: '🏠', color: 'text-blue-400' },
          { name: 'NAT', desc: 'Network Address Translation', use: 'Sharing public IP', icon: '🌍', color: 'text-purple-400' },
          { name: 'Load Balancing', desc: 'Distribute traffic across servers', use: 'High availability', icon: '⚖️', color: 'text-amber-400' },
          { name: 'CDN', desc: 'Content Delivery Network', use: 'Fast global content delivery', icon: '🚀', color: 'text-cyan-400' },
          { name: 'Firewall', desc: 'Filter network traffic', use: 'Security', icon: '🧱', color: 'text-red-400' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40">{item.use}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Protocols Kyun Important Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Protocols <span className="text-green-400 font-bold">rules</span> hain computers ke beech communication ke.
          <span className="text-blue-400 font-bold"> TLS</span> secure connection banata hai.
          <span className="text-purple-400 font-bold"> NAT</span> se ek public IP se saare devices access kar sakte hain internet.
          <span className="text-amber-400 font-bold"> CDN</span> se content nearby servers se milta hai — fast loading.
          Yeh sab protocols milkar internet ko functional banate hain! 🌐
        </p>
      </div>
    </div>
  );
}
