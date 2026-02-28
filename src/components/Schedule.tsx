import { useState } from 'react';
import { motion } from 'motion/react';

const scheduleData = {
  day1: [
    { time: '08:30 AM', event: 'Inauguration Ceremony', location: 'Main Auditorium' },
    { time: '10:00 AM', event: 'Battle of Bands (Round 1)', location: 'Open Air Theatre' },
    { time: '11:00 AM', event: 'Hackathon Kickoff', location: 'CS Lab 1' },
    { time: '01:00 PM', event: 'Lunch Break', location: 'Food Court' },
    { time: '02:00 PM', event: 'Inter-College Cricket', location: 'Sports Ground' },
    { time: '04:00 PM', event: 'Canvas Painting', location: 'Art Gallery' },
    { time: '06:00 PM', event: 'Cultural Night', location: 'Main Auditorium' },
  ],
  day2: [
    { time: '09:00 AM', event: 'Hackathon Presentations', location: 'CS Lab 1' },
    { time: '10:00 AM', event: 'Group Dance Finals', location: 'Main Auditorium' },
    { time: '11:30 AM', event: 'Code Debugging', location: 'CS Lab 2' },
    { time: '01:00 PM', event: 'Lunch Break', location: 'Food Court' },
    { time: '02:00 PM', event: 'Football Finals', location: 'Sports Ground' },
    { time: '04:00 PM', event: 'Battle of Bands (Finals)', location: 'Open Air Theatre' },
    { time: '06:30 PM', event: 'Valedictory & Prize Distribution', location: 'Main Auditorium' },
  ],
};

const Schedule = () => {
  const [activeDay, setActiveDay] = useState<'day1' | 'day2'>('day1');

  return (
    <section id="schedule" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Event Schedule</h2>
          <p className="text-lg text-gray-600">Don't miss a moment of the action.</p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-white p-1 rounded-full shadow-md inline-flex">
            <button
              onClick={() => setActiveDay('day1')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === 'day1'
                  ? 'bg-bright-sky-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Day 1 (March 20)
            </button>
            <button
              onClick={() => setActiveDay('day2')}
              className={`px-8 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeDay === 'day2'
                  ? 'bg-bright-sky-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Day 2 (March 21)
            </button>
          </div>
        </div>

        <div className="relative">
          {/* Vertical Line - Desktop (Center) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>
          
          {/* Vertical Line - Mobile (Left) */}
          <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200 md:hidden"></div>

          <div className="space-y-8">
            {scheduleData[activeDay].map((item, index) => (
              <div key={index} className="relative">
                {/* Desktop Layout */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`hidden md:flex items-center justify-between w-full ${
                    index % 2 === 0 ? 'flex-row-reverse' : ''
                  }`}
                >
                  <div className="w-5/12">
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-bright-sky-500 hover:shadow-lg transition-shadow">
                      <h3 className="text-lg font-bold text-gray-900">{item.event}</h3>
                      <p className="text-gray-500 text-sm mt-1">{item.location}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-bright-sky-600 rounded-full border-4 border-white shadow-sm z-10"></div>
                  
                  <div className="w-5/12 text-center">
                    <div className={`text-bright-sky-600 font-bold text-lg ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      {item.time}
                    </div>
                  </div>
                </motion.div>

                {/* Mobile Layout */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex md:hidden ml-4 pl-8 relative"
                >
                  {/* Dot */}
                  <div className="absolute left-[-5px] top-6 w-3 h-3 bg-bright-sky-600 rounded-full border-2 border-white shadow-sm z-10"></div>
                  
                  <div className="w-full">
                    <span className="inline-block px-2 py-1 bg-bright-sky-100 text-bright-sky-700 text-xs font-bold rounded mb-2">
                      {item.time}
                    </span>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                      <h3 className="text-base font-bold text-gray-900">{item.event}</h3>
                      <p className="text-gray-500 text-xs mt-1 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                        {item.location}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
