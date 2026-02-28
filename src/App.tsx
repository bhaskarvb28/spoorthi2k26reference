import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Events from './components/Events';
import Schedule from './components/Schedule';
import RegistrationForm from './components/RegistrationForm';
import Results from './components/Results';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 scroll-smooth">
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Schedule />
        <RegistrationForm />
        <Results />
        <Gallery />
        <Contact />
      </main>
    </div>
  );
}
