import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import AIFusionHero from './components/sections/hero/AIFusionHero.jsx';
import Snowfall from './components/effects/Snowfall.jsx';
import Footer from './components/layout/Footer.jsx';
import { events } from './utils/data';
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";

// Lazy load components
const EventList = lazy(() => import('./components/events/EventList.jsx'));
const EventDetails = lazy(() => import('./components/events/EventDetails.jsx'));
const RegistrationForm = lazy(() => import('./pages/registration-form'));

const fontFaceStyles = `
  @font-face {
    font-family: 'Nebula';
    src: url('/fonts/Nebula-Regular.woff2') format('woff2'),
         url('/fonts/Nebula-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Nebula';
    src: url('/fonts/Nebula-Bold.woff2') format('woff2'),
         url('/fonts/Nebula-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'AIFusion';
    src: url('/fonts/AIFusion-Bold.woff2') format('woff2'),
         url('/fonts/AIFusion-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;

const Main = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  
  const eventsRef = useRef(null);
  const contactRef = useRef(null);
  const subscribeRef = useRef(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fontFaceStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleRegister = () => {
    setShowRegistrationForm(true);
  };

  const handleCloseRegistration = () => {
    setShowRegistrationForm(false);
  };

  const scrollToSection = (section) => {
    const refs = {
      events: eventsRef,
      Events: eventsRef,
      contact: contactRef,
      support: contactRef,
      subscribe: contactRef
    };

    if (refs[section]?.current) {
      refs[section].current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden text-white bg-gradient-to-br from-black via-indigo-900 to-purple-900">
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'black',
            color: '#fff',
            padding: '10px',
            borderRadius: '10px',
          },
        }}
      />
      <AIFusionHero 
        scrollToSection={scrollToSection} 
        onRegister={handleRegister}
      />
      <Snowfall />
      <div className="relative z-10">
        <main className="container w-full h-full p-0 mx-auto md:p-0">
          <div ref={eventsRef}>
            <Suspense fallback={<div>Loading events...</div>}>
              <EventList 
                events={events} 
                onEventClick={setSelectedEvent} 
              />
            </Suspense>
          </div>
          {/* <div ref={subscribeRef}>
            <subscribe />
          </div> */}
        </main>

        {selectedEvent && (
          <Suspense fallback={<div>Loading event details...</div>}>
            <EventDetails 
              event={selectedEvent} 
              onClose={() => setSelectedEvent(null)} 
              onRegister={handleRegister}
            />
          </Suspense>
        )}

        {showRegistrationForm && (
          <Suspense fallback={<div>Loading registration form...</div>}>
            <RegistrationForm onClose={handleCloseRegistration} />
          </Suspense>
        )}

        <div ref={contactRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Main;