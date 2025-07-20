import React from 'react';
import Link from 'next/link';
import BrainCircuitIcon from '../icons/BrainCircuit'; // Adjust path if needed

const Footer = () => {
  return (
    <footer className="bg-black text-gray-300 font-sans relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5">
        <BrainCircuitIcon className="w-full h-full text-purple-500" />
      </div>
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: About Us */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
              About Us
            </h3>
            <p className="text-sm leading-relaxed">
              HyperKuvid Labs is a rogue collective of curious minds shipping AI weirdness, hacker podcasts, and open-source chaos. Built by devs, for devs.
            </p>
          </div>

          {/* Column 2: Projects */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
              Projects
            </h3>
            <ul className="space-y-2 text-sm">
              <li>Gideon – Emotional LLM Aggregator</li>
              <li>NeoMaze – Gesture-controlled AI Game</li>
              <li>KuvidCast – Dev Podcast [QA testing]</li>
              <li>
                <Link href="https://github.com/Mantissa" className="hover:text-purple-400 transition-colors duration-300 underline">
                  View all projects on GitHub &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-bold text-white mb-4 border-b-2 border-purple-500 pb-2">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:pradheep.raop@gmail.com" className="hover:text-purple-400 transition-colors duration-300">
                  Email: pradheep.raop@gmail.com
                </a>
              </li>
              <li>
                <a href="https://github.com/Mantissa" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">
                  GitHub: @Mantissa
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/pradheep-rao-88a339250/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-colors duration-300">
                  LinkedIn: Pradheep Rao
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} HyperKuvid Labs – Made with late nights and neural spikes.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;