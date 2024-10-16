import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Menu, User } from 'lucide-react';
import aiVideoSrc from './ai (1).mp4';
import RegistrationForm from './registration-form';

const fontFaceStyles = `
  @font-face {
    font-family: 'Nebula';
    src: url('/path/to/Nebula-Regular.woff2') format('woff2'),
         url('/path/to/Nebula-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Nebula';
    src: url('/path/to/Nebula-Bold.woff2') format('woff2'),
         url('/path/to/Nebula-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'AIFusion';
    src: url('/path/to/AIFusion-Bold.woff2') format('woff2'),
         url('/path/to/AIFusion-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }
`;

const events = [
  { 
    name: 'AI Hackathon', 
    type: 'Technical', 
    description: 'Build innovative AI solutions in 24 hours.',
    image: 'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=600',
    fullDescription: 'Join our 24-hour AI Hackathon where you\'ll collaborate with fellow tech enthusiasts to create cutting-edge AI solutions. Whether you\'re a seasoned developer or just starting out, this event offers a unique opportunity to push the boundaries of AI technology. Prizes will be awarded for the most innovative and impactful projects.',
    date: 'October 15-16, 2024',
    location: 'Main Campus, Building A'
  },
  { 
    name: 'Decode', 
    type: 'Technical', 
    description: 'Learn the basics of machine learning algorithms.',
    image: 'https://images.pexels.com/photos/1933900/pexels-photo-1933900.jpeg?auto=compress&cs=tinysrgb&w=600',
    fullDescription: 'Dive into the world of Machine Learning with our comprehensive workshop. Led by industry experts, you\'ll gain hands-on experience with popular ML algorithms and frameworks. This workshop is perfect for beginners and intermediate practitioners looking to enhance their skills.',
    date: 'October 18, 2024',
    location: 'Tech Lab, Building B'
  },
  { 
    name: 'Create logo using HTML & CSS', 
    type: 'Technical', 
    description: 'Discuss the ethical implications of AI in society.',
    image: 'https://camo.githubusercontent.com/21bb8ae3629c4852404841252c65baa38426e4c0d01a68a0f7e6fd121d4649dc/68747470733a2f2f7777772e69696d2e66722f65636f6c652d7765622f77702d636f6e74656e742f75706c6f6164732f323031372f30312f48544d4c352e6a7067',
    fullDescription: 'Join thought leaders and ethicists in a stimulating debate on the moral implications of AI in our society. Topics will include AI bias, privacy concerns, and the future of work in an AI-driven world. This event aims to foster critical thinking about the responsible development and deployment of AI technologies.',
    date: 'October 20, 2024',
    location: 'Auditorium, Main Building'
  },
  { 
    name: 'BGMI', 
    type: 'Non-Technical', 
    description: 'Showcase of artwork created using AI tools.',
    image: 'https://mandeha.com/wp-content/uploads/2023/04/Hack-for-BGMI-mental-skills-sports-psychology-07.webp',
    fullDescription: 'Experience the intersection of art and technology at our AI Art Gallery. This exhibition features stunning pieces created by artists in collaboration with AI tools. From abstract compositions to hyper-realistic portraits, witness how AI is pushing the boundaries of creative expression.',
    date: 'October 22-24, 2024',
    location: 'Student Center Gallery'
  },
  { 
    name: 'Free Fire', 
    type: 'Non-Technical', 
    description: 'Program robots to perform dance routines.',
    image: 'https://images.hindustantimes.com/tech/img/2023/04/07/960x540/526ab8efaf60be59ccf03e314e019a3a_1671931798562_1680829788841_1680829788841.jpg',
    fullDescription: 'Watch in awe as teams showcase their programming and choreography skills in our Robo Dance Competition. Participants will program robots to perform complex dance routines, combining elements of robotics, motion control, and artistic expression. It\'s a fun and exciting way to explore the lighter side of AI and robotics!',
    date: 'October 25, 2024',
    location: 'Gymnasium'
  },
  { 
    name: 'Carrom', 
    type: 'Non-Technical', 
    description: 'Test your knowledge of AI and technology.',
    image: 'https://assets.telegraphindia.com/telegraph/2023/Feb/1675721012_carrom.jpg',
    fullDescription: 'Put your tech knowledge to the test in our AI Trivia Night! Teams will compete in rounds of questions covering AI history, current trends, and future predictions. It\'s a great opportunity to learn new facts, meet fellow AI enthusiasts, and win exciting prizes.',
    date: 'October 27, 2024',
    location: 'Student Lounge'
  },
  { 
    name: 'IPL Auction', 
    type: 'Non-Technical', 
    description: 'Explore AI-generated virtual worlds.',
    image: 'https://img1.hscicdn.com/image/upload/f_auto/lsci/db/PICTURES/CMS/322600/322606.4.jpg',
    fullDescription: 'Step into the future with our AI-powered Virtual Reality Experience. Participants will have the chance to explore intricate virtual worlds generated entirely by AI. From fantastical landscapes to futuristic cities, this immersive experience showcases the potential of AI in creating interactive digital environments.',
    date: 'October 29, 2024',
    location: 'VR Lab, Tech Building'
  },
  { 
    name: 'Treasure Hunt', 
    type: 'Non-Technical', 
    description: 'Compete in games enhanced by AI.',
    image: 'https://cdn.richmondmom.com/wp-content/uploads/2023/08/Best-Treasure-Hunt-Clues-.jpeg',
    fullDescription: 'Game on! Join our AI-powered Game Tournament featuring a variety of games enhanced or created by AI. From strategy games with adaptive AI opponents to procedurally generated adventure games, this tournament offers a unique gaming experience that showcases the potential of AI in entertainment.',
    date: 'October 31, 2024',
    location: 'eSports Arena'
  },
];

const AIFusionHero = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={aiVideoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 h-full flex flex-col">
        <header className="bg-black bg-opacity-50 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <div className="text-2xl font-bold font-['AIFusion'] text-white">AI FUSION</div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-white hover:text-orange-500 transition-colors">EVENTS</a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors">NEWS</a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors">STORE</a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors">ESPORTS</a>
              <a href="#" className="text-white hover:text-orange-500 transition-colors">SUPPORT</a>
            </nav>
            <div className="flex items-center space-x-4">
              {/* <User className="w-6 h-6 text-white cursor-pointer hover:text-orange-500 transition-colors" /> */}
              <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition-colors">
                REGISTER NOW
              </button>
              <Menu
                className="w-6 h-6 md:hidden text-white cursor-pointer hover:text-orange-500 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              />
            </div>
          </div>
        </header>

        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 text-white font-['AIFusion'] leading-tight">
              DEPARTMENT OF  AIML
              <br />
              <span className="text-orange-500">PRESENTING</span>
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold text-orange-500 mb-8 font-['AIFusion']">
              AI FUSION
            </h2>
            <p className="text-xl md:text-2xl text-white mb-12">
              Experience the future of AI in an immersive event like no other
            </p>
            <button className="bg-orange-600 text-white text-xl px-8 py-4 rounded-full hover:bg-orange-700 transition-colors transform hover:scale-105">
              LEARN MORE
            </button>
          </div>
        </main>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
          <div className="container mx-auto p-4">
            <div className="flex justify-end">
              <button
                className="text-white text-2xl"
                onClick={() => setMenuOpen(false)}
              >
                &times;
              </button>
            </div>
            <nav className="flex flex-col items-center space-y-6 mt-16">
              <a href="#" className="text-2xl text-white hover:text-orange-500 transition-colors">EVENTS</a>
              <a href="#" className="text-2xl text-white hover:text-orange-500 transition-colors">NEWS</a>
              <a href="#" className="text-2xl text-white hover:text-orange-500 transition-colors">STORE</a>
              <a href="#" className="text-2xl text-white hover:text-orange-500 transition-colors">ESPORTS</a>
              <a href="#" className="text-2xl text-white hover:text-orange-500 transition-colors">SUPPORT</a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};



const Snowfall = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 100; i++) {
        newParticles.push({
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speedY: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y > 100 ? 0 : particle.y + particle.speedY,
        }))
      );
      requestAnimationFrame(animateParticles);
    };

    const animation = requestAnimationFrame(animateParticles);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle, index) => (
        <div
          key={index}
          className="absolute bg-blue-200 rounded-full opacity-50"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
        />
      ))}
    </div>
  );
};

const EventDetails = ({ event, onClose, onRegister }) => (
  <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50">
    <div className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-lg p-6 w-full max-w-md lg:max-w-lg border border-indigo-500 animate-fadeIn">
      <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-indigo-300">{event.name}</h2>
      <img src={event.image} alt={event.name} className="w-full h-48 lg:h-64 object-cover rounded-lg mb-4" />
      <p className="mb-4 text-sm lg:text-base">{event.fullDescription}</p>
      <p className="mb-2"><strong>Type:</strong> {event.type}</p>
      <p className="mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="mb-4"><strong>Location:</strong> {event.location}</p>
      <div className="flex justify-end space-x-4">
        <button 
          className="bg-indigo-500 text-white px-4 py-2 rounded-full text-sm lg:text-base hover:bg-indigo-600 transition-colors" 
          onClick={() => {
            onRegister();
            onClose();
          }}
        >
          Register
        </button>
        <button className="bg-purple-600 px-4 py-2 rounded-full text-sm lg:text-base hover:bg-purple-700 transition-colors" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  </div>
);
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for signing up with email: ${email}`);
    setEmail('');
  };

  return (
    <footer className="bg-gradient-to-b from-indigo-900 to-black text-white pt-8 pb-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="text-center md:text-left">
            <h3 className="text-xl lg:text-2xl font-bold mb-2 text-indigo-400 font-['Nebula']">AI Fusion</h3>
            <p className="text-purple-200 mb-4 text-sm lg:text-base">Exploring the future of AI through innovative events and collaborations.</p>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href="#" className="text-white hover:text-indigo-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-indigo-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-indigo-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-indigo-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg lg:text-xl font-semibold mb-2 text-indigo-400 font-['Nebula']">Quick Links</h4>
            <ul className="space-y-2 text-sm lg:text-base">
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Events</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-purple-200 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg lg:text-xl font-semibold mb-2 text-indigo-400 font-['Nebula']">Contact Us</h4>
            <ul className="space-y-2 text-sm lg:text-base">
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 text-indigo-400" />
                <a href="mailto:info@aifusion.com" className="text-purple-200 hover:text-white transition-colors">info@aifusion.com</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 text-indigo-400" />
                <a href="tel:8600667194" className="text-purple-200 hover:text-white transition-colors">+91 8600667194</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="mr-2 text-indigo-400" />
                <span className="text-purple-200">123 Rajaram Street, Islampur City, Sangli</span>
              </li>
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg lg:text-xl font-semibold mb-2 text-indigo-400 font-['Nebula']">Newsletter</h4>
            <p className="text-purple-200 mb-2 text-sm lg:text-base">Stay updated with our latest events and AI news!</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center md:items-start space-y-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-indigo-800 text-white px-4 py-2 rounded w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm lg:text-base"
                required
              />
              <button
                type="submit"
                className="bg-indigo-500 text-white px-4 py-2 rounded w-full max-w-xs hover:bg-indigo-600 transition-colors text-sm lg:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-indigo-800 pt-4 text-center">
          <p className="text-purple-200 text-sm lg:text-base">&copy; 2024 AI Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const App = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = fontFaceStyles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleRegister = () => {
    setShowRegistrationForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900 text-white overflow-hidden">
      <AIFusionHero />
      <Snowfall />
      <div className="relative z-10">
        <main className="container mx-auto p-4 md:p-6">
          <section>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 text-center font-['Nebula']">Event List</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {events.map((event, index) => (
                <div 
                  key={event.name} 
                  className="relative h-64 md:h-80 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
                  onClick={() => setSelectedEvent(event)}
                >
                  <img src={event.image} alt={event.name} className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-xl md:text-2xl font-semibold mb-1 md:mb-2 text-indigo-300">{event.name}</h3>
                      <p className="text-purple-200 text-sm md:text-base mb-1">{event.type}</p>
                      <p className="text-white text-sm md:text-base">{event.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {selectedEvent && (
          <EventDetails 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
            onRegister={handleRegister}
          />
        )}

        {showRegistrationForm && (
          <RegistrationForm onClose={() => setShowRegistrationForm(false)} />
        )}

        <Footer />
      </div>
    </div>
  );
};

export default App;