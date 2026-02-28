import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';

const Hero = () => {
  const targetDate = new Date('2026-03-20T08:30:00+05:30').getTime();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-bright-sky-50 to-bright-sky-200 overflow-hidden pt-16 md:pt-0">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-bright-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -20, 20, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 -right-20 w-64 h-64 md:w-96 md:h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 left-1/3 w-64 h-64 md:w-96 md:h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 text-bright-sky-700 text-xs md:text-sm font-semibold mb-4 md:mb-6 shadow-sm">
            Ignite · Inspire · Illuminate
          </span>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-bright-sky-600 to-purple-600 mb-4 drop-shadow-sm leading-tight">
            SPOORTHI<br className="md:hidden" /> <span className="text-bright-sky-500">2026</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 font-light mb-8 max-w-2xl mx-auto px-2">
            The Ultimate College Fest Experience.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-6 mb-8 md:mb-12 text-gray-600 font-medium text-sm md:text-base">
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm w-full sm:w-auto justify-center">
              <Calendar className="w-4 h-4 md:w-5 md:h-5 text-bright-sky-600" />
              <span>March 20–21, 2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 px-4 py-2 rounded-lg backdrop-blur-sm shadow-sm w-full sm:w-auto justify-center">
              <Clock className="w-4 h-4 md:w-5 md:h-5 text-bright-sky-600" />
              <span>8:30 AM IST</span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto mb-8 md:mb-12">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-white/70 backdrop-blur-md rounded-xl p-3 md:p-4 shadow-lg border border-white/40">
                <div className="text-3xl md:text-5xl font-bold text-bright-sky-600 tabular-nums">
                  {String(value).padStart(2, '0')}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-500 mt-1">{unit}</div>
              </div>
            ))}
          </div>

          <div>
            <a
              href="#register"
              className="inline-block w-full sm:w-auto bg-bright-sky-600 hover:bg-bright-sky-700 text-white font-bold py-4 px-8 rounded-xl md:rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-lg active:scale-95"
            >
              Register Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
