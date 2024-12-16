'use client'

import React, { useEffect, useRef, useCallback } from 'react';

const characters = ".,-*:;!loea#ḂLOBLEMS";
const NUM_PARTICLES = 300;

class Follower {
  x: number;
  y: number;
  acc_x: number;
  acc_y: number;

  constructor() {
    this.x = Math.floor(Math.random() * 100);
    this.y = Math.floor(Math.random() * 100);
    this.acc_x = 0;
    this.acc_y = 0;
  }

  update(mouseX: number, mouseY: number) {
    if (this.x < mouseX) {
      this.acc_x += 0.1;
    } else {
      this.acc_x -= 0.1;
    }
    if (this.y < mouseY) {
      this.acc_y += 0.1;
    } else {
      this.acc_y -= 0.1;
    }
    this.acc_x *= 0.99;
    this.acc_y *= 0.99;
    this.x += this.acc_x;
    this.y += this.acc_y;
    return new Particle(Math.floor(this.x), Math.floor(this.y));
  }

  draw(ascii: string[][]) {
    if (this.x >= 0 && this.x < ascii[0].length && this.y >= 0 && this.y < ascii.length) {
      ascii[Math.floor(this.y)][Math.floor(this.x)] = '@';
    }
  }
}

class Particle {
  x: number;
  y: number;
  c: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.c = characters.length - 1;
  }

  update() {
    this.c -= 1;
    return this.c >= 0;
  }

  draw(ascii: string[][]) {
    if (this.x >= 0 && this.x < ascii[0].length && this.y >= 0 && this.y < ascii.length) {
      ascii[this.y][this.x] = characters[this.c];
    }
  }
}

export default function ASCIIAnimation() {
  const canvasRef = useRef<HTMLPreElement>(null);
  const animationRef = useRef<number>();
  const followersRef = useRef<Follower[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const charWidth = parseFloat(canvas.dataset.charWidth || '8.4');
    const charHeight = parseFloat(canvas.dataset.charHeight || '20');

    const cols = Math.floor(width / charWidth);
    const rows = Math.floor(height / charHeight);

    const ascii: string[][] = Array.from({ length: rows }, () => Array(cols).fill(' '));

    followersRef.current.forEach(follower => {
      const newParticle = follower.update(mouseRef.current.x, mouseRef.current.y);
      particlesRef.current.push(newParticle);
      follower.draw(ascii);
    });

    particlesRef.current = particlesRef.current.filter(particle => {
      if (particle.update()) {
        particle.draw(ascii);
        return true;
      }
      return false;
    });

    canvas.textContent = ascii.map(row => row.join('')).join('\n');

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  const setup = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    // Calculate and store charWidth and charHeight
    const testSpan = document.createElement('span');
    testSpan.style.font = getComputedStyle(canvas).font;
    testSpan.textContent = 'X';
    document.body.appendChild(testSpan);
    const charWidth = testSpan.getBoundingClientRect().width;
    const charHeight = testSpan.getBoundingClientRect().height;
    document.body.removeChild(testSpan);

    const cols = Math.floor(width / charWidth);
    const rows = Math.floor(height / charHeight);

    // Store calculated values
    canvas.dataset.charWidth = charWidth.toString();
    canvas.dataset.charHeight = charHeight.toString();

    followersRef.current = Array.from({ length: NUM_PARTICLES }, () => new Follower());
    particlesRef.current = [];
    mouseRef.current = { x: Math.floor(cols / 2), y: Math.floor(rows / 2) };

    animate();
  }, [animate]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeObserver = new ResizeObserver(() => {
      if (canvas) {
        setup();
      }
    });

    resizeObserver.observe(canvas);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const testSpan = document.createElement('span');
      testSpan.style.font = getComputedStyle(canvas).font;
      testSpan.textContent = 'X';
      document.body.appendChild(testSpan);
      const charWidth = testSpan.getBoundingClientRect().width;
      document.body.removeChild(testSpan);

      mouseRef.current = {
        x: Math.floor((e.clientX - rect.left) / charWidth),
        y: Math.floor((e.clientY - rect.top) / 20) // Assuming 20px line height
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', setup);

    setup();

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', setup);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [setup]);

  return (
    <pre
      ref={canvasRef}
      className="fixed inset-0 m-0 p-0 font-mono text-[14px] leading-[20px] overflow-hidden whitespace-pre text-[#616161] [text-shadow:0_0_8px_#f0f6f0] bg-[#222323] w-full"
    />
  );
}

