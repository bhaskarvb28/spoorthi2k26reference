import { Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const coordinators = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Faculty Coordinator',
    phone: '+91 98765 43210',
    email: 'rajesh.kumar@college.edu',
  },
  {
    name: 'Sneha Reddy',
    role: 'Student President',
    phone: '+91 87654 32109',
    email: 'sneha.reddy@student.college.edu',
  },
  {
    name: 'Arjun Mehta',
    role: 'Cultural Secretary',
    phone: '+91 76543 21098',
    email: 'arjun.mehta@student.college.edu',
  },
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-bright-sky-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
          <p className="text-bright-sky-200 text-lg">
            Have questions? Reach out to our team for assistance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {coordinators.map((person, index) => (
            <div
              key={index}
              className="bg-bright-sky-800/50 backdrop-blur-sm p-8 rounded-2xl border border-bright-sky-700 hover:bg-bright-sky-800 transition-colors"
            >
              <h3 className="text-xl font-bold mb-1">{person.name}</h3>
              <p className="text-bright-sky-300 text-sm mb-6 uppercase tracking-wider font-semibold">
                {person.role}
              </p>
              <div className="space-y-3 text-bright-sky-100">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-bright-sky-400" />
                  <a href={`tel:${person.phone}`} className="hover:text-white transition-colors">
                    {person.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-bright-sky-400" />
                  <a href={`mailto:${person.email}`} className="hover:text-white transition-colors">
                    {person.email}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-bright-sky-800 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <MapPin className="text-bright-sky-400" />
            <span className="text-bright-sky-200">
              College Campus, Main Block, Bangalore - 560001
            </span>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-bright-sky-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-bright-sky-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
            <a href="#" className="text-bright-sky-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
          </div>
        </div>
        
        <div className="text-center mt-12 text-bright-sky-500 text-sm">
          &copy; 2026 Spoorthi. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Contact;
