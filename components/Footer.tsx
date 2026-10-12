"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-black border-t border-hairline pt-28 pb-10 relative overflow-hidden font-[family-name:var(--font-barlow)]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-7">
            <p className="sx-eyebrow text-white mb-6">06 — Contact</p>
            <h2 className="sx-display text-5xl sm:text-6xl lg:text-8xl text-white mb-8 leading-[0.95]">
              Initialize
              <br />
              <span className="text-white/45">Connection</span>
            </h2>
            <p className="text-white/60 mb-10 max-w-md leading-relaxed text-lg">
              Whether you need to architect scalable network infrastructure, deploy autonomous AIoT systems, or discuss tactical drone applications, my comms channels are open.
            </p>

            <div className="flex gap-4">
              <a
                href="https://www.linkedin.com/in/arrashi-satyadi-476918241/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="w-14 h-14 rounded-full border border-white text-white hover:bg-[#f0f0fa] hover:text-black transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a
                href="https://github.com/volkov501"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="w-14 h-14 rounded-full border border-white text-white hover:bg-[#f0f0fa] hover:text-black transition-colors duration-300 flex items-center justify-center"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-14">
            <p className="sx-eyebrow mb-6">Contact Info</p>

            <ul className="border-t border-hairline">
              <li className="flex items-center py-5 border-b border-hairline text-white/80 hover:text-white transition-colors duration-300">
                <Mail className="w-5 h-5 mr-5 text-white" strokeWidth={1.25} />
                <a href="mailto:folkov11@gmail.com" className="tracking-wide">folkov11@gmail.com</a>
              </li>
              <li className="flex items-center py-5 border-b border-hairline text-white/80 hover:text-white transition-colors duration-300">
                <Phone className="w-5 h-5 mr-5 text-white" strokeWidth={1.25} />
                <a href="tel:087735499904" className="tracking-wide">087735499904</a>
              </li>
              <li className="flex items-center py-5 border-b border-hairline text-white/80">
                <MapPin className="w-5 h-5 mr-5 text-white" strokeWidth={1.25} />
                <span className="tracking-wide">South Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-hairline sx-eyebrow">
          <p>© {new Date().getFullYear()} Arrashi Satyadi. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <span className="w-1.5 h-1.5 rounded-full bg-white mr-3" />
            System Online
          </div>
        </div>
      </div>
    </footer>
  );
}
