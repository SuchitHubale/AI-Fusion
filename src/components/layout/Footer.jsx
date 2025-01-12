import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnxH4gvns5l63imF4As5zN8h3sg1Zx2ou6lXXFghPCCvvZI29Ds0-cAu6cXoOa2SLh/exec';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setSubmitMessage('Thank you for subscribing!');
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="py-8 text-white bg-gradient-to-b from-indigo-900 to-black">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 mb-8 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4 text-indigo-400 font-['Nebula']">AI Fusion</h3>
            <p className="mb-4 text-purple-200">Join Us for Exciting Competitions and Fun Games!<br/>
Connect with us for a chance to win thrilling prizes while exploring cutting-edge technology and creativity.<br/>
Don’t miss out on the fun—be part of AI FUSION 2024 now!🌟</p>
            <div className="flex justify-center space-x-4 md:justify-start">
              <a href="#" className="text-white transition-colors hover:text-indigo-400">
                <Facebook size={20} />
              </a>
              <a href="https://x.com/ritindia1983?t=TzFgeiGp_NNE5pjH-ZD7HA&s=08" className="text-white transition-colors hover:text-indigo-400">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/invites/contact/?igsh=n1zft5ow7y4u&utm_content=sn0gvjg" className="text-white transition-colors hover:text-indigo-400">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/school/rajarambapu-institute-of-technology-rajaramnagar-sakharale/" className="text-white transition-colors hover:text-indigo-400">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4 text-indigo-400 font-['Nebula']">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center justify-center md:justify-start">
                <Mail size={16} className="mr-2 text-indigo-400" />
                <a href="mailto:saai@ritindia.edu" className="text-purple-200 transition-colors hover:text-white">saai@ritindia.edu</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone size={16} className="mr-2 text-indigo-400" />
                <a href="tel:+917709763974" className="text-purple-200 transition-colors hover:text-white">+91 7709763974</a>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <MapPin size={16} className="mr-2 text-indigo-400" />
                <span className="text-purple-200">Rajaram Nagar, Islampur City, Sangli</span>
              </li>
            </ul>
          </div>

          <div className="text-center md:text-left">
            <h4 className="text-xl font-semibold mb-4 text-indigo-400 font-['Nebula']">Newsletter</h4>
            <p className="mb-4 text-purple-200">Stay updated with our latest events and AI news!</p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-3 md:items-start">
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full max-w-xs px-4 py-2 text-white bg-indigo-800 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <button
                type="submit"
                className="w-full max-w-xs px-4 py-2 text-white transition-colors bg-indigo-500 rounded hover:bg-indigo-600 disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
              {submitMessage && (
                <p className="mt-2 text-sm text-indigo-300">{submitMessage}</p>
              )}
            </form>
          </div>
        </div>
        <div className="pt-4 text-center border-t border-indigo-800">
          <p className="text-purple-200">&copy; 2024 AI Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;