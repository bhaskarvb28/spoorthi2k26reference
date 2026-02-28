import { motion } from 'motion/react';
import { Trophy, Medal, Award } from 'lucide-react';

const resultsData = [
  {
    event: 'Battle of Bands',
    winners: [
      { rank: 1, name: 'The Riffs', college: 'RVCE', prize: '₹15,000' },
      { rank: 2, name: 'Sonic Boom', college: 'BMSCE', prize: '₹10,000' },
      { rank: 3, name: 'Echoes', college: 'PESU', prize: '₹5,000' },
    ],
  },
  {
    event: 'Hackathon 2026',
    winners: [
      { rank: 1, name: 'Code Ninjas', college: 'IIIT-B', prize: '₹25,000' },
      { rank: 2, name: 'Bit Busters', college: 'MSRIT', prize: '₹15,000' },
      { rank: 3, name: 'Debug Thugs', college: 'NITK', prize: '₹10,000' },
    ],
  },
  {
    event: 'Inter-College Cricket',
    winners: [
      { rank: 1, name: 'Team Titans', college: 'Christ University', prize: '₹20,000' },
      { rank: 2, name: 'Royal Strikers', college: 'Jain University', prize: '₹12,000' },
    ],
  },
];

const Results = () => {
  return (
    <section id="results" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Results</h2>
          <p className="text-lg text-gray-600">Celebrating the champions of Spoorthi 2026</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {resultsData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
            >
              <div className="bg-bright-sky-50 px-6 py-4 border-b border-bright-sky-100">
                <h3 className="text-xl font-bold text-bright-sky-800 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  {item.event}
                </h3>
              </div>
              <div className="p-6 space-y-6">
                {item.winners.map((winner) => (
                  <div key={winner.rank} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shadow-sm
                        ${winner.rank === 1 ? 'bg-yellow-400' : winner.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}
                      `}>
                        {winner.rank === 1 ? <Medal size={20} /> : winner.rank === 2 ? <Medal size={20} /> : <Award size={20} />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{winner.name}</p>
                        <p className="text-xs text-gray-500">{winner.college}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-md">
                        {winner.prize}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Results;
