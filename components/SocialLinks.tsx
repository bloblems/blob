import React from 'react';

export default function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-12 text-base leading-base font-normal">
      <a 
        href="https://github.com/bloblems" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#f0f6f0]/50 hover:text-[#f0f6f0] transition-colors"
      >
        GITHUB
      </a>
      <a 
        href="https://www.instagram.com/bloblems" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#f0f6f0]/50 hover:text-[#f0f6f0] transition-colors"
      >
        INSTAGRAM
      </a>
      <a 
        href="https://defcad.com/users/Bloblems" 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-[#f0f6f0]/50 hover:text-[#f0f6f0] transition-colors"
      >
        DEFCAD
      </a>
    </div>
  );
}

