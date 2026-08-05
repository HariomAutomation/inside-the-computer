import { motion } from 'framer-motion';

export default function S2_EventLoop() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Event Loop & Concurrency</h2>
        <p className="text-white/60 text-sm">How JavaScript handles async operations with a single thread.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <svg viewBox="0 0 350 250" className="w-full max-w-md">
          {/* Call Stack */}
          <rect x="20" y="20" width="100" height="80" rx="8" fill="#3b82f620" stroke="#3b82f6" strokeWidth="1.5" />
          <text x="70" y="38" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold" fontFamily="monospace">Call Stack</text>
          <text x="70" y="55" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">main()</text>
          <text x="70" y="70" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">fetch()</text>
          <text x="70" y="85" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">onClick()</text>

          {/* Web APIs */}
          <rect x="130" y="20" width="100" height="80" rx="8" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="1.5" />
          <text x="180" y="38" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontWeight="bold" fontFamily="monospace">Web APIs</text>
          <text x="180" y="55" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">setTimeout</text>
          <text x="180" y="70" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">fetch()</text>
          <text x="180" y="85" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">DOM events</text>

          {/* Callback Queue */}
          <rect x="240" y="20" width="100" height="80" rx="8" fill="#22c55e20" stroke="#22c55e" strokeWidth="1.5" />
          <text x="290" y="38" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">Callback Queue</text>
          <text x="290" y="55" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">ready()</text>
          <text x="290" y="70" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">onLoad()</text>

          {/* Event Loop */}
          <circle cx="175" cy="170" r="35" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="1.5" />
          <text x="175" y="167" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">Event</text>
          <text x="175" y="180" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold" fontFamily="monospace">Loop</text>

          {/* Arrows */}
          <path d="M 70 100 L 70 135 L 175 135" fill="none" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arrowBlue)" />
          <path d="M 180 100 L 180 135" fill="none" stroke="#8b5cf6" strokeWidth="1" markerEnd="url(#arrowPurple)" />
          <path d="M 290 100 L 290 135 L 175 135" fill="none" stroke="#22c55e" strokeWidth="1" markerEnd="url(#arrowGreen)" />
          <path d="M 175 205 L 70 205 L 70 100" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
          <text x="120" y="218" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">push to stack</text>

          <defs>
            <marker id="arrowBlue" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" /></marker>
            <marker id="arrowPurple" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#8b5cf6" /></marker>
            <marker id="arrowGreen" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto"><path d="M 0 0 L 10 5 L 0 10 z" fill="#22c55e" /></marker>
          </defs>
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Event Loop Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          JavaScript <span className="text-blue-400 font-bold">single-threaded</span> hai but <span className="text-amber-400 font-bold">non-blocking</span>.
          Event loop Call Stack khali hone pe Callback Queue se next function uthata hai.
          <span className="text-purple-400 font-bold"> Web APIs</span> (setTimeout, fetch) background mein kaam karti hain.
          Isliye ek thread se bhi bohot kuch ho sakta hai! ⚡
        </p>
      </div>
    </div>
  );
}
