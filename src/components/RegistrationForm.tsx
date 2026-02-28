import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    usn: '',
    department: '',
    year: '',
    event: '',
    teamMembers: '',
    phone: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const events = [
    'Battle of Bands',
    'Inter-College Cricket',
    'Hackathon 2026',
    'Canvas Painting',
    'Group Dance',
    'Football Tournament',
    'Code Debugging',
    'Photography',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          fullName: '',
          usn: '',
          department: '',
          year: '',
          event: '',
          teamMembers: '',
          phone: '',
        });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <section id="register" className="py-20 bg-bright-sky-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-bright-sky-600 px-8 py-6 text-white text-center">
            <h2 className="text-3xl font-bold">Event Registration</h2>
            <p className="mt-2 text-bright-sky-100">Sign up now to participate in Spoorthi 2026</p>
          </div>

          <div className="p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h3>
                <p className="text-gray-600 mb-8">
                  You have successfully registered for the event. We'll contact you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-bright-sky-700 bg-bright-sky-100 hover:bg-bright-sky-200"
                >
                  Register for another event
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      id="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="usn" className="block text-sm font-medium text-gray-700">
                      USN
                    </label>
                    <input
                      type="text"
                      name="usn"
                      id="usn"
                      required
                      value={formData.usn}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                      placeholder="1XX22CS001"
                    />
                  </div>

                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      id="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                      placeholder="Computer Science"
                    />
                  </div>

                  <div>
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                      Year
                    </label>
                    <select
                      name="year"
                      id="year"
                      required
                      value={formData.year}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                    >
                      <option value="">Select Year</option>
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="event" className="block text-sm font-medium text-gray-700">
                    Select Event
                  </label>
                  <select
                    name="event"
                    id="event"
                    required
                    value={formData.event}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                  >
                    <option value="">Choose an event...</option>
                    {events.map((event) => (
                      <option key={event} value={event}>
                        {event}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="teamMembers" className="block text-sm font-medium text-gray-700">
                    Team Members (Optional)
                  </label>
                  <textarea
                    name="teamMembers"
                    id="teamMembers"
                    rows={3}
                    value={formData.teamMembers}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-bright-sky-500 focus:ring-bright-sky-500 sm:text-sm px-4 py-2 border"
                    placeholder="Enter names of team members separated by commas"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-bright-sky-600 hover:bg-bright-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bright-sky-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                        Registering...
                      </>
                    ) : (
                      'Submit Registration'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
