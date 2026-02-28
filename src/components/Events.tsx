import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, Trophy, Code, Palette, Users, Clock, Award } from 'lucide-react';

const categories = ['All', 'Cultural', 'Sports', 'IT Events', 'Fine Arts'];

const eventsData = [
  {
    id: 1,
    title: 'Battle of Bands',
    category: 'Cultural',
    duration: '3 Hours',
    teamSize: '4-8',
    prize: '₹15,000',
    icon: <Music />,
    description: 'Showcase your musical talent and rock the stage.',
  },
  {
    id: 2,
    title: 'Inter-College Cricket',
    category: 'Sports',
    duration: '2 Days',
    teamSize: '11',
    prize: '₹20,000',
    icon: <Trophy />,
    description: 'The ultimate cricket showdown between colleges.',
  },
  {
    id: 3,
    title: 'Hackathon 2026',
    category: 'IT Events',
    duration: '24 Hours',
    teamSize: '2-4',
    prize: '₹25,000',
    icon: <Code />,
    description: 'Code your way to glory in this 24-hour hackathon.',
  },
  {
    id: 4,
    title: 'Canvas Painting',
    category: 'Fine Arts',
    duration: '2 Hours',
    teamSize: '1',
    prize: '₹5,000',
    icon: <Palette />,
    description: 'Express your creativity on canvas.',
  },
  {
    id: 5,
    title: 'Group Dance',
    category: 'Cultural',
    duration: '10 Mins',
    teamSize: '6-12',
    prize: '₹12,000',
    icon: <Users />,
    description: 'Synchronize your moves and win the crowd.',
  },
  {
    id: 6,
    title: 'Football Tournament',
    category: 'Sports',
    duration: '2 Days',
    teamSize: '11',
    prize: '₹18,000',
    icon: <Trophy />,
    description: 'Kick off the excitement in our football league.',
  },
  {
    id: 7,
    title: 'Code Debugging',
    category: 'IT Events',
    duration: '1 Hour',
    teamSize: '2',
    prize: '₹8,000',
    icon: <Code />,
    description: 'Find the bugs before your opponents do.',
  },
  {
    id: 8,
    title: 'Photography',
    category: 'Fine Arts',
    duration: 'All Day',
    teamSize: '1',
    prize: '₹6,000',
    icon: <Palette />,
    description: 'Capture the best moments of Spoorthi 2026.',
  },
];

const Events = () => {
  const [filter, setFilter] = useState('All');

  const filteredEvents = filter === 'All'
    ? eventsData
    : eventsData.filter(event => event.category === filter);

  return (
    <section id="events" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Categories</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore a wide range of events designed to challenge your skills and showcase your talent.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? 'bg-bright-sky-600 text-white shadow-lg transform scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={event.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-bright-sky-50 rounded-lg text-bright-sky-600 group-hover:bg-bright-sky-600 group-hover:text-white transition-colors duration-300">
                      {event.icon}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {event.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <p className="text-gray-600 mb-6 text-sm line-clamp-2">{event.description}</p>
                  
                  <div className="space-y-3 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-bright-sky-500" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-bright-sky-500" />
                      <span>Team Size: {event.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-bright-sky-700">
                      <Award size={16} />
                      <span>Prize: {event.prize}</span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                  <a href="#register" className="block w-full text-center text-bright-sky-600 font-semibold hover:text-bright-sky-700 transition-colors">
                    Register Now &rarr;
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Events;
