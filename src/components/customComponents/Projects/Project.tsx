












import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { NewData } from './data';
import { Project } from './types';

import { Inter, Khand, Poppins } from 'next/font/google';
import CourseDetails from './CourseDetails';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400']
});
const khandFont = Khand({
  subsets: ['latin'],
  weight: ['700']
});

export default function GitiProjects(): JSX.Element {
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);

    const handleScroll = () => {
      projectRefs.current.forEach((ref) => {
        if (!ref) return;

        const rect = ref.getBoundingClientRect();
        const isInView = rect.top <= window.innerHeight * 0.75;

        if (isInView) {
          ref.style.opacity = '1';
          ref.style.transform = 'translateY(0)';
        }
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const renderProjectContent = (project: Project): JSX.Element => (
    <CourseDetails
      title={project.title}
      description={project.description}
      content={project.content}
      registerLink={project.registerLink}
      originalPrice={project.originalPrice}
      price={project.price}
    />
  );

  const renderImageContent = (project: Project): JSX.Element => (
    <div className="w-full max-w-[400px] mx-auto flex items-center justify-center">
      <div className="relative group w-full">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          className={`${project.image.className} transition-transform duration-300 group-hover:scale-105 bg-white w-full object-contain`}
          priority={project.image.priority}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </div>
  );

  const renderProject = (project: Project, index: number): JSX.Element => {
    const isEven = index % 2 === 0;

    return (
      <div
        ref={(el) => { projectRefs.current[index] = el }}
        key={index}
        className="grid grid-cols-1 md:grid-cols-2 gap-2 min-h-screen md:py-2 py-1 opacity-0 transform translate-y-4 transition-all duration-500 ease-out"
        style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'opacity 0.5s ease-out, transform 0.5s ease-out'
        }}
      >
        {isEven ? (
          <>
            <div className="md:order-1 order-2 flex flex-col justify-center">
              {renderProjectContent(project)}
            </div>
            <div className="md:order-2 order-1 flex items-center justify-center">
              {renderImageContent(project)}
            </div>
          </>
        ) : (
          <>
            <div className="md:order-1 order-1 flex items-center justify-center">
              {renderImageContent(project)}
            </div>
            <div className="md:order-2 order-2 flex flex-col justify-center">
              {renderProjectContent(project)}
            </div>
          </>
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative bg-black">
      <div className="w-full text-center py-4" id="#Projects">
        <h1 className={`text-3xl md:text-4xl mt-4 text-[#ff0000] ${khandFont.className}`}>
          Unique Summer Projects
        </h1>
        <p className={`text-white text-sm md:text-lg ${poppins.className}`}>
          Learn & Develop a Level Of Project Which You Can't Find Anywhere – Internet / Google / Chatgpt
        </p>
      </div>

      <div className="container mx-auto max-w-6xl px-4">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="space-y-2">
            {NewData.projects.map((project, index) => renderProject(project, index))}
          </div>
        </div>

        <style jsx global>{`
          html {
            scroll-behavior: smooth;
          }

          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: #1a1a1a;
          }

          ::-webkit-scrollbar-thumb {
            background: #ff0000;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: #e00000;
          }

          .project-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        `}</style>
      </div>
    </div>
  );
}