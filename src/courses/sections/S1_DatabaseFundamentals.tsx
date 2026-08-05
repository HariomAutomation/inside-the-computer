import { motion } from 'framer-motion';

export default function S1_DatabaseFundamentals() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Database Fundamentals</h2>
        <p className="text-white/60 text-sm">SQL, NoSQL, normalization — how data is stored and retrieved efficiently.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">SQL (Relational)</p>
          <p className="text-[11px] text-white/60">Tables with rows/columns. ACID transactions. Structured queries.</p>
          <p className="text-[10px] text-white/40 mt-2">PostgreSQL, MySQL, SQLite</p>
        </div>
        <div className="glass rounded-2xl border border-purple-500/30 p-5">
          <p className="font-mono font-bold text-sm text-purple-400 mb-2">NoSQL (Non-relational)</p>
          <p className="text-[11px] text-white/60">Flexible schemas. Horizontal scaling. Various data models.</p>
          <p className="text-[10px] text-white/40 mt-2">MongoDB, Redis, DynamoDB</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-green-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-green-400">SQL Basics</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`-- Create table
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(255) UNIQUE
);

-- Query
SELECT name, email
FROM users
WHERE id = 1;

-- Join
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id;`}
        </pre>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Database Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Database <span className="text-blue-400 font-bold">data organize</span> karta hai tables mein.
          <span className="text-green-400 font-bold"> SQL</span> se structured queries likh sakte ho.
          <span className="text-purple-400 font-bold"> Indexes</span> se fast lookups hoti hain (B-tree).
          <span className="text-amber-400 font-bold"> ACID</span> properties se data consistent rehta hai.
          NoSQL <span className="text-red-400 font-bold">scale</span> karna easy banata hai but flexibility trade-off hoti hai. 💾
        </p>
      </div>
    </div>
  );
}
