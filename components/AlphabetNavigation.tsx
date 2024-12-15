import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Project = {
  name: string;
  url: string;
};

const projects: Project[] = [
  { name: "Bloblems", url: "https://www.bloblems.com" },
  { name: "Gun Map", url: "https://www.gunmap.dev/" },
  { name: "Defense Distributed", url: "https://www.defdist.org/" },
];

const AlphabetNavigation: React.FC = () => {
  const alphabet = '#ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const getProjectsForLetter = (letter: string) => {
    if (letter === '#') {
      return projects.filter(project => /^[0-9]/.test(project.name));
    }
    return projects.filter(project => project.name.toUpperCase().startsWith(letter));
  };

  return (
    <nav className="w-full px-2 py-2 sm:px-4 sm:py-4">
      <div className="flex flex-wrap justify-center gap-1">
        {alphabet.map((letter) => {
          const letterProjects = getProjectsForLetter(letter);
          const hasProjects = letterProjects.length > 0;
          return (
            <DropdownMenu key={letter}>
              <DropdownMenuTrigger
                className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-sm sm:text-base ${
                  hasProjects ? 'text-[#f0f6f0]/50 hover:text-[#f0f6f0]' : 'text-[#f0f6f0]/5'
                } ${!hasProjects && 'cursor-default'}`}
                disabled={!hasProjects}
              >
                {letter}
              </DropdownMenuTrigger>
              {hasProjects && (
                <DropdownMenuContent className="bg-[#222323] border-[#f0f6f0]/10 p-0">
                  {letterProjects.map((project) => (
                    <DropdownMenuItem key={project.name} className="text-[#f0f6f0] hover:bg-[#f0f6f0]/10 focus:text-[#f0f6f0]">
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full"
                      >
                        {project.name}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              )}
            </DropdownMenu>
          );
        })}
      </div>
    </nav>
  );
};

export default AlphabetNavigation;

