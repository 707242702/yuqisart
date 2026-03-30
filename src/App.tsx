/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Matter from 'matter-js';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight, Github, Twitter, Instagram, PawPrint, ChevronDown, ChevronLeft, ChevronRight, PlayCircle, Dog, Mail, ExternalLink, Send } from 'lucide-react';

const AnimalFace = ({ type, color = "currentColor", size = 40, className = "" }: { type: 'CAT' | 'DOG' | 'SMILE', color?: string, size?: number, className?: string }) => {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" className={className} style={{ overflow: 'visible' }}>
      <g fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {type === 'SMILE' && (
          <>
            <circle cx="18" cy="22" r="2.5" fill={color} stroke="none" />
            <circle cx="42" cy="22" r="2.5" fill={color} stroke="none" />
            <path d="M15 35c0 8.284 6.716 15 15 15s15-6.716 15-15" />
          </>
        )}
        {type === 'CAT' && (
          <>
            <circle cx="20" cy="25" r="2" fill={color} stroke="none" />
            <circle cx="40" cy="25" r="2" fill={color} stroke="none" />
            <path d="M27 32h6l-3 3z" fill={color} stroke="none" />
            <path d="M27 35c0 3 3 3 3 3s3 0 3-3" />
            <path d="M15 32l-10-2M15 35l-10 0M45 32l10-2M45 35l10 0" strokeWidth="1" />
          </>
        )}
        {type === 'DOG' && (
          <>
            <circle cx="18" cy="22" r="3" fill={color} stroke="none" />
            <circle cx="42" cy="22" r="3" fill={color} stroke="none" />
            <ellipse cx="30" cy="32" rx="6" ry="4" fill={color} stroke="none" />
            <path d="M27 38c0 3 3 3 3 3s3 0 3-3" />
          </>
        )}
      </g>
    </svg>
  );
};

const PixelDog = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    fill="currentColor" 
    className={className}
    style={{ imageRendering: 'pixelated' }}
  >
    <path d="M3 2h2v2H3V2zm8 0h2v2h-2V2zM2 4h12v2H2V4zM2 6h2v6H2V6zm10 0h2v6h-2V6zM4 12h8v2H4v-2zM5 7h2v2H5V7zm4 0h2v2H9V7zM7 9h2v2H7V9z" />
  </svg>
);

const FloatingCompanion = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [type, setType] = useState<'CAT' | 'DOG'>('CAT');

  useEffect(() => {
    const trigger = () => {
      if (Math.random() > 0.7) {
        setType(Math.random() > 0.5 ? 'CAT' : 'DOG');
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 5000);
      }
    };
    const interval = setInterval(trigger, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, x: 0 }}
          animate={{ y: 0, x: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed bottom-0 right-10 z-[60] pointer-events-none select-none"
        >
          <div className="relative group">
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest shadow-sm border border-ink/5 opacity-0 group-hover:opacity-100 transition-opacity">
              {type === 'CAT' ? 'Meow?' : 'Woof!'}
            </div>
            <AnimalFace type={type} size={80} color="#141414" className="opacity-80" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const PageTitle = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <h2 className={`text-3xl md:text-[4vw] font-bold uppercase tracking-tighter leading-[0.9] text-ink mb-10 md:mb-12 flex flex-col items-start ${className}`}>
      <span className="whitespace-nowrap">
        {text.split("").map((c, i) => <InteractiveLetter key={`${text}-${i}`} char={c} />)}
      </span>
    </h2>
  );
};

const InteractiveLetter = ({ char }: { char: string, key?: string }) => {
  return (
    <motion.span
      whileHover={{ 
        scale: 1.4,
        rotate: [0, -15, 15, -10, 0],
        y: -8,
        color: '#DB562E',
        transition: { duration: 0.4, ease: "backOut" }
      }}
      className="inline-block cursor-pointer relative"
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
};

const Sidebar = ({ activePage, setActivePage, isOpen, setIsOpen, setActiveOverlay, setShowOrderPopup }: { activePage: string, setActivePage: (page: string) => void, isOpen?: boolean, setIsOpen?: (open: boolean) => void, setActiveOverlay: (overlay: string | null) => void, setShowOrderPopup: (show: boolean) => void }) => {
  const menuItems = [
    { name: 'HOME', color: '#DB562E' },
    { name: 'PORTRAITS', color: '#8DB7D2' },
    { name: 'WINDOW ART', color: '#3C6CA2' },
    { name: 'COMMISSION', color: '#DB562E' },
    { name: 'FOR BUSINESS', color: '#8DB7D2' },
    { name: 'ABOUT', color: '#3C6CA2' }
  ];
  const footerItems = ['Location', 'FAQ', 'Credits'];
  
  const sidebarRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={sidebarRef}
      className={`h-full flex flex-col p-6 md:pt-[138px] md:pb-6 md:pl-[104px] md:pr-8 bg-bg md:bg-transparent relative overflow-y-auto md:overflow-x-hidden transition-transform duration-300 md:translate-x-0 pointer-events-auto custom-scrollbar ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
    >
      <div className="relative z-10 pointer-events-auto">
        <div className="md:hidden flex justify-end mb-8">
          <button onClick={() => setIsOpen?.(false)} className="p-4 -mr-4">
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col gap-3">
          {menuItems.map((item, index) => (
            <motion.button
              key={item.name}
              onClick={() => {
                setActivePage(item.name);
                setIsOpen?.(false);
              }}
              className={`flex items-center text-[11px] md:text-[13px] font-medium uppercase tracking-[0.2em] transition-all cursor-pointer group relative py-1 ${activePage === item.name ? 'text-ink' : 'text-ink/40'}`}
              whileHover={{ y: -1 }}
              transition={{ type: "tween", duration: 0.2 }}
            >
              <span className="relative z-10 transition-colors duration-300" style={{ color: activePage === item.name ? item.color : undefined }}>
                {item.name}
              </span>
              {activePage === item.name && (
                <motion.div 
                  layoutId="sidebar-active"
                  className="absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left"
                  style={{ backgroundColor: item.color }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
      <div className="mt-10 md:mt-12 pb-6 md:pb-8 relative z-10 pointer-events-auto">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            {footerItems.map((item, index) => {
              const footerColors: Record<string, string> = {
                'Location': '#DB562E',
                'FAQ': '#8DB7D2',
                'Credits': '#3C6CA2'
              };
              const themeColor = footerColors[item] || '#000';
              
              return (
                <motion.button 
                  key={item} 
                  onClick={() => {
                    setActiveOverlay(item);
                    setIsOpen?.(false);
                  }}
                  className="block text-[8px] md:text-[9px] uppercase tracking-[0.1em] font-medium transition-all relative text-left group py-1 text-ink/30 hover:text-ink"
                  whileHover={{ x: 4 }}
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <span className="relative z-10 group-hover:text-ink transition-colors">{item}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Highlighted Social Links */}
          <div className="flex gap-3 items-center mt-2">
            <motion.a 
              href="mailto:luyuqi0726@gmail.com" 
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center bg-[#DB562E] text-white fuzzy shadow-lg"
              style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}
            >
              <Mail size={12} strokeWidth={2} />
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/spaceyuqio/" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center bg-[#8DB7D2] text-white fuzzy shadow-lg"
              style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 40%' }}
            >
              <Instagram size={12} strokeWidth={2} />
            </motion.a>
            <motion.a 
              href="https://yuqilu.com" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: -8 }}
              whileTap={{ scale: 0.9 }}
              className="w-7 h-7 flex items-center justify-center bg-[#3C6CA2] text-white fuzzy shadow-lg"
              style={{ borderRadius: '70% 30% 30% 70% / 30% 70% 70% 30%' }}
            >
              <ExternalLink size={12} strokeWidth={2} />
            </motion.a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShapesCanvas = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  useEffect(() => {
    if (!sceneRef.current) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint, Events, Vector } = Matter;

    const engine = Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0; // Zero gravity for floating effect

    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;
    const isMobile = width < 768;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: 'transparent',
        pixelRatio: window.devicePixelRatio,
      },
    });
    renderRef.current = render;

    // Boundaries
    const wallThickness = 500;
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + wallThickness / 2, width, wallThickness, wallOptions);
    const ceiling = Bodies.rectangle(width / 2, -wallThickness / 2, width, wallThickness, wallOptions);
    const leftWall = Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, wallOptions);
    const rightWall = Bodies.rectangle(width + wallThickness / 2, height / 2, wallThickness, height, wallOptions);

    // Create shapes
    const shapes: Matter.Body[] = [];
    const commonColors = ['#8DB7D2', '#FFFFFF']; // Light Blue and White
    const darkBlue = '#3C6CA2';
    const red = '#DB562E';
    const textAreaX = isMobile ? width * 0.9 : width * 0.65;
    const textAreaY = isMobile ? height * 0.4 : height * 0.6;
    
    const shapeCount = isMobile ? 15 : 40;
    for (let i = 0; i < shapeCount; i++) {
      let color;
      // Ensure exactly 1 or 2 of dark blue and red
      if (i === 0) color = darkBlue;
      else if (i === 1) color = red;
      else if (i === 2 && Math.random() > 0.5) color = darkBlue;
      else if (i === 3 && Math.random() > 0.5) color = red;
      else color = commonColors[Math.floor(Math.random() * commonColors.length)];

      let x = Math.random() * width;
      let y = Math.random() * height;
      
      // If dark blue, avoid the text area initially
      if (color === darkBlue) {
        if (x < textAreaX && y < textAreaY) {
          if (Math.random() > 0.5) {
            x = textAreaX + Math.random() * (width - textAreaX);
          } else {
            y = textAreaY + Math.random() * (height - textAreaY);
          }
        }
      }

      const baseSize = isMobile ? 30 : 60;
      const sizeVariation = isMobile ? 40 : 120;
      const size = baseSize + Math.random() * sizeVariation;
      
      let body;
      const type = Math.floor(Math.random() * 5);
      
      if (type === 0) {
        // Organic Blob-like rectangle
        body = Bodies.rectangle(x, y, size, size * 0.7, {
          chamfer: { radius: [size * 0.3, size * 0.1, size * 0.4, size * 0.2] },
          render: { fillStyle: color }
        });
      } else if (type === 1) {
        // Soft Circle
        body = Bodies.circle(x, y, size / 2, {
          render: { fillStyle: color }
        });
      } else if (type === 2) {
        // "Ear" or "Tail" like triangle
        body = Bodies.polygon(x, y, 3, size / 2, {
          chamfer: { radius: 15 },
          render: { fillStyle: color }
        });
      } else if (type === 3) {
        // "Paw" like pill
        body = Bodies.rectangle(x, y, size * 1.2, size * 0.5, {
          chamfer: { radius: size * 0.25 },
          render: { fillStyle: color }
        });
      } else {
        // More irregular organic shape
        body = Bodies.polygon(x, y, 5, size / 2, {
          chamfer: { radius: 20 },
          render: { fillStyle: color }
        });
      }
      
      // Add random rotation
      Matter.Body.rotate(body, Math.random() * Math.PI);
      shapes.push(body);
    }

    Composite.add(engine.world, [ground, ceiling, leftWall, rightWall, ...shapes]);

    // Pick 8 random shapes to have faces
    const faceTypes = ['SMILE', 'CAT', 'DOG'];
    const availableIndices = Array.from({ length: shapes.length }, (_, i) => i);
    for (let i = 0; i < 8; i++) {
      if (availableIndices.length === 0) break;
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      const shapeIndex = availableIndices.splice(randomIndex, 1)[0];
      const body = shapes[shapeIndex] as any;
      body.hasFace = true;
      body.faceType = faceTypes[Math.floor(Math.random() * faceTypes.length)];
    }

    // Mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Draw faces on selected shapes
    Events.on(render, 'afterRender', () => {
      const context = render.context;
      shapes.forEach(body => {
        if ((body as any).hasFace) {
          const { x, y } = body.position;
          const angle = body.angle;
          const type = (body as any).faceType;
          
          context.save();
          context.translate(x, y);
          context.rotate(angle);
          
          context.fillStyle = '#15191A';
          context.strokeStyle = '#15191A';
          context.lineWidth = 2;
          context.lineCap = 'round';

          if (type === 'SMILE') {
            // Draw eyes
            context.beginPath();
            context.arc(-12, -8, 2.5, 0, Math.PI * 2);
            context.arc(12, -8, 2.5, 0, Math.PI * 2);
            context.fill();
            
            // Draw mouth
            context.beginPath();
            context.arc(0, 5, 8, 0.1 * Math.PI, 0.9 * Math.PI);
            context.stroke();
          } else if (type === 'CAT') {
            // Eyes
            context.beginPath();
            context.arc(-10, -5, 2, 0, Math.PI * 2);
            context.arc(10, -5, 2, 0, Math.PI * 2);
            context.fill();

            // Nose
            context.beginPath();
            context.moveTo(-3, 2);
            context.lineTo(3, 2);
            context.lineTo(0, 5);
            context.closePath();
            context.fill();

            // Mouth (w shape)
            context.beginPath();
            context.arc(-3, 5, 3, 0, Math.PI);
            context.stroke();
            context.beginPath();
            context.arc(3, 5, 3, 0, Math.PI);
            context.stroke();

            // Whiskers
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(-15, 2); context.lineTo(-25, 0);
            context.moveTo(-15, 5); context.lineTo(-25, 5);
            context.moveTo(15, 2); context.lineTo(25, 0);
            context.moveTo(15, 5); context.lineTo(25, 5);
            context.stroke();
          } else if (type === 'DOG') {
            // Eyes
            context.beginPath();
            context.arc(-12, -8, 3, 0, Math.PI * 2);
            context.arc(12, -8, 3, 0, Math.PI * 2);
            context.fill();

            // Big Nose
            context.beginPath();
            context.ellipse(0, 2, 6, 4, 0, 0, Math.PI * 2);
            context.fill();

            // Mouth
            context.beginPath();
            context.moveTo(0, 6);
            context.lineTo(0, 10);
            context.stroke();
            context.beginPath();
            context.arc(0, 10, 5, 0.1 * Math.PI, 0.9 * Math.PI);
            context.stroke();

            // Optional: Tongue
            context.fillStyle = '#DB562E';
            context.beginPath();
            context.ellipse(3, 12, 3, 5, 0.2, 0, Math.PI * 2);
            context.fill();
          }
          
          context.restore();
        }
      });
    });

    // Hover effect: Apply force when mouse is near
    Events.on(engine, 'beforeUpdate', () => {
      const mousePos = mouse.position;
      const radius = 300;

      shapes.forEach(body => {
        const dist = Vector.magnitude(Vector.sub(body.position, mousePos));
        if (dist < radius) {
          // Calculate force based on distance (stronger when closer)
          const strength = (1 - dist / radius) * 0.12;
          const force = Vector.mult(Vector.normalise(Vector.sub(body.position, mousePos)), strength);
          Matter.Body.applyForce(body, body.position, force);
        }

        // Dark blue shapes avoid the text area
        if (body.render.fillStyle === darkBlue) {
          if (body.position.x < textAreaX && body.position.y < textAreaY) {
            // Calculate distance to the "safe" edge
            const dx = textAreaX - body.position.x;
            const dy = textAreaY - body.position.y;
            
            // Apply a stronger force towards the bottom-right
            const repulsionStrength = 0.003;
            Matter.Body.applyForce(body, body.position, { 
              x: repulsionStrength * (dx / textAreaX), 
              y: repulsionStrength * (dy / textAreaY) 
            });
          }
        }
        
        // Balanced damping for reactive but controlled movement
        const maxVelocity = 15;
        const currentVelocity = Vector.magnitude(body.velocity);
        if (currentVelocity > maxVelocity) {
          const scaledVelocity = Vector.mult(Vector.normalise(body.velocity), maxVelocity);
          Matter.Body.setVelocity(body, scaledVelocity);
        }

        Matter.Body.setVelocity(body, {
          x: body.velocity.x * 0.96,
          y: body.velocity.y * 0.96
        });
        Matter.Body.setAngularVelocity(body, body.angularVelocity * 0.96);

        // Emergency containment: if they somehow tunnel through walls, bring them back
        if (body.position.x < 0) Matter.Body.setPosition(body, { x: 50, y: body.position.y });
        if (body.position.x > width) Matter.Body.setPosition(body, { x: width - 50, y: body.position.y });
        if (body.position.y < 0) Matter.Body.setPosition(body, { x: body.position.x, y: 50 });
        if (body.position.y > height) Matter.Body.setPosition(body, { x: body.position.x, y: height - 50 });
      });
    });

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
    runnerRef.current = runner;

    // Resize handler
    const handleResize = () => {
      if (!sceneRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      render.canvas.width = newWidth;
      render.canvas.height = newHeight;
      render.options.width = newWidth;
      render.options.height = newHeight;
      
      // Update walls
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + wallThickness / 2 });
      Matter.Body.setPosition(ceiling, { x: newWidth / 2, y: -wallThickness / 2 });
      Matter.Body.setPosition(leftWall, { x: -wallThickness / 2, y: newHeight / 2 });
      Matter.Body.setPosition(rightWall, { x: newWidth + wallThickness / 2, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden fuzzy">
      <div ref={sceneRef} className="absolute inset-0 opacity-100" />
      
      {/* Overlay Text to match the reference style */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-start select-none z-10 overflow-y-auto custom-scrollbar">
        <div className="w-full pt-20 md:pt-[138px] px-6 md:pl-[104px] md:pr-16 pb-20">
          <h1 className="text-[10vw] md:text-[8vw] landscape:text-[12vh] font-bold leading-[0.95] tracking-tighter uppercase text-ink opacity-90 pointer-events-auto flex flex-col items-start mb-8 md:mb-12">
            <span className="flex flex-wrap">{"Hand-drawn".split("").map((c, i) => <InteractiveLetter key={`c-${i}`} char={c} />)}</span>
            <span className="flex flex-wrap">{"portraits & bespoke".split("").map((c, i) => <InteractiveLetter key={`y-${i}`} char={c} />)}</span>
            <span className="flex flex-wrap">{"window art.".split("").map((c, i) => <InteractiveLetter key={`f-${i}`} char={c} />)}</span>
          </h1>
          <div className="max-w-xl">
            <p className="text-sm md:text-base leading-relaxed text-ink/60">
              Yuqi creates custom pet portraits and bespoke window art in her Seattle studio. Each piece begins with a hand-drawn illustration inspired by your companion.
            </p>
          </div>
          
          <div className="mt-16 md:mt-12 landscape:mt-4 pointer-events-auto">
            <motion.button
              onClick={() => setActivePage('PORTRAITS')}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="px-8 md:px-10 py-4 md:py-5 border-[2.5px] border-ink bg-white/20 text-ink text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all relative overflow-hidden group rounded-[2px] jitter-hover"
            >
              <motion.div 
                className="absolute inset-0 bg-ink"
                variants={{
                  hover: { y: 0 }
                }}
                initial={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              />
              <span className="relative z-10 group-hover:text-bg transition-colors flex items-center gap-4">
                BEGIN YOUR STORY
                <motion.div
                  variants={{
                    hover: { x: 8 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BeforeAfterSlider = ({ photoSrc, artSrc, client, style }: { photoSrc: string, artSrc: string, client: string, style: string }) => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - rect.left) / rect.width) * 100;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setSliderPos(Math.max(0, Math.min(100, position)));
    });
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative w-full h-full bg-ink/5 overflow-hidden group/slider select-none"
    >
      {/* Original Photo (Left) */}
      <div className="absolute inset-0">
        <img
          src={photoSrc}
          alt="Original"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Illustration (Right) - Revealed by slider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%`, borderRight: '1px solid white', willChange: 'width' }}
      >
        <img
          src={artSrc}
          alt="Illustration"
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ width: `${100 / (sliderPos / 100)}%` }}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-white z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-white backdrop-blur-md flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-0.5 h-2 bg-white" />
            <div className="w-0.5 h-2 bg-white" />
          </div>
        </div>
      </div>


    </div>
  );
};

// ─── Real portrait gallery data ───────────────────────────────────────────────
const COMPARE = [
  { photoSrc: '/images/clean/compare-01-a.png', artSrc: '/images/clean/compare-01-b.png' },
  { photoSrc: '/images/clean/compare-02-a.png', artSrc: '/images/clean/compare-02-b.png' },
  { photoSrc: '/images/clean/compare-03-a.png', artSrc: '/images/clean/compare-03-b.png' },
  { photoSrc: '/images/clean/compare-04-a.png', artSrc: '/images/clean/compare-04-b.png' },
  { photoSrc: '/images/clean/compare-05-a.png', artSrc: '/images/clean/compare-05-b.png' },
  { photoSrc: '/images/clean/compare-06-a.png', artSrc: '/images/clean/compare-06-b.jpg' },
  { photoSrc: '/images/clean/compare-07-a.jpg', artSrc: '/images/clean/compare-07-b.jpg' },
  { photoSrc: '/images/clean/compare-08-a.png', artSrc: '/images/clean/compare-08-b.png' },
];
const PEOPLE_EXTS = ['avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','avif','jpg','png','png','png','png','jpg','jpg','jpg','jpg','png','jpg','png','jpg','png'];

// Video category overrides (video index → category)
const VIDEO_CATS: Record<number, string> = {
  1: 'PEOPLE', 2: 'PEOPLE', 7: 'PEOPLE',
  4: 'OTHERS', 6: 'OTHERS', 9: 'OTHERS', 10: 'OTHERS',
};

function buildPortraitGallery() {
  const items: any[] = [];
  // ANIMALS (skip animal-063 → goes to OTHERS)
  for (let i = 1; i <= 87; i++) {
    if (i === 63) continue;
    items.push({ type: 'image', category: 'ANIMALS', isComparison: false, src: `/images/clean/animal-${String(i).padStart(3,'0')}.avif` });
  }
  // PEOPLE
  for (let i = 1; i <= 38; i++) {
    items.push({ type: 'image', category: 'PEOPLE', isComparison: false, src: `/images/clean/people-${String(i).padStart(3,'0')}.${PEOPLE_EXTS[i-1]}` });
  }
  // OTHERS (including animal-063)
  items.push({ type: 'image', category: 'OTHERS', isComparison: false, src: `/images/clean/animal-063.avif` });
  for (let i = 1; i <= 53; i++) {
    items.push({ type: 'image', category: 'OTHERS', isComparison: false, src: `/images/clean/other-${String(i).padStart(3,'0')}.avif` });
  }
  // BEFORE & AFTER — always large
  for (let i = 0; i < COMPARE.length; i++) {
    items.push({ type: 'image', category: 'BEFORE & AFTER', isComparison: true, isLarge: true, ...COMPARE[i] });
  }
  // Splice videos into ANIMALS section with per-video category assignments
  let vidIdx = 1;
  for (let i = 7; i < 86 + vidIdx && vidIdx <= 22; i += 9) {
    const cat = VIDEO_CATS[vidIdx] || 'ANIMALS';
    items.splice(i, 0, { type: 'video', category: cat, isComparison: false, src: `/images/clean/v-${String(vidIdx).padStart(2,'0')}.mp4` });
    vidIdx++;
  }
  return items.map((item, i) => ({
    id: i + 1,
    title: item.isComparison ? `Before & After #${String(i+1).padStart(3,'0')}` : item.type === 'video' ? `Studio Reel #${String(i+1).padStart(3,'0')}` : item.category === 'PEOPLE' ? `Portrait #${String(i+1).padStart(3,'0')}` : item.category === 'OTHERS' ? `Study #${String(i+1).padStart(3,'0')}` : `Soul Study #${String(i+1).padStart(3,'0')}`,
    description: 'A unique commission from Yuqi Studio.',
    color: item.category === 'PEOPLE' ? '#8DB7D2' : item.category === 'BEFORE & AFTER' ? '#3C6CA2' : item.category === 'OTHERS' ? '#A5A198' : '#DB562E',
    isLarge: item.isLarge || (!item.isComparison && item.type !== 'video' && i % 12 === 0),
    client: ['Seattle Local','Tokyo Resident','Private Collection','Paris Studio'][i % 4],
    style: ['Contemporary Cut-out','Minimalist Line','Soul Study','Abstract Essence'][i % 4],
    ...item,
  }));
}
const ALL_PORTRAIT_DATA = buildPortraitGallery();
// ──────────────────────────────────────────────────────────────────────────────

const PortraitsPage = ({ setActivePage, setShowOrderPopup }: { setActivePage: (page: string) => void, setShowOrderPopup: (show: boolean) => void }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filter, setFilter] = useState('ALL');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMaterialVideo, setShowMaterialVideo] = useState(false);
  
  const categories = [
    { name: 'ANIMALS',       color: '#DB562E', hoverColor: '#FF7A50', shape: '60% 40% 30% 70% / 60% 30% 70% 40%' },
    { name: 'BEFORE & AFTER',color: '#3C6CA2', hoverColor: '#5A8CC2', shape: '70% 30% 30% 70% / 30% 70% 70% 30%' },
    { name: 'PEOPLE',        color: '#8DB7D2', hoverColor: '#A8D1ED', shape: '40% 60% 70% 30% / 40% 50% 60% 40%' },
    { name: 'OTHERS',        color: '#A5A198', hoverColor: '#C5C1B8', shape: '50% 50% 50% 50% / 50% 50% 50% 50%' },
    { name: 'ALL',           color: '#15191A', hoverColor: '#2A2F30', shape: '30% 70% 70% 30% / 30% 30% 70% 70%' },
  ];
  
  const allPortraits = useMemo(() => ALL_PORTRAIT_DATA, []);

  const filteredPortraits = filter === 'ALL' 
    ? allPortraits 
    : allPortraits.filter(p => p.category === filter);

  const handleFilterChange = (cat: string) => {
    if (cat === filter) return;
    setFilter(cat);
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => setShowScrollTop(el.scrollTop > 300);
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={scrollRef} className="h-full overflow-y-auto font-sans bg-bg relative scroll-smooth custom-scrollbar">
      <div className="w-full pt-24 md:pt-[138px] px-6 md:pl-[104px] md:pr-16">
        <PageTitle text="Custom Pet Portraits" />
        <div className="max-w-xl">
          <p className="text-sm md:text-base leading-relaxed text-ink/60">
            The Studio's portraits are hand-drawn illustrations based on your favorite photos. Each piece is delivered as a high-resolution digital file, ready for you to print or share.
          </p>
        </div>
          <div className="w-full h-[1px] bg-ink/5 mt-6 md:mt-8 mb-8" />
          
          <div className="flex flex-col md:flex-row justify-end items-start md:items-end gap-6 md:gap-8 mb-12 md:mb-24">
            {/* Balloon Navigation */}
            <div className="flex gap-3 md:gap-6 items-center flex-wrap">
              <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-ink/40 mr-1 md:mr-2">Filter by Palette</span>
              {categories.map((cat) => (
                <div key={cat.name} className="relative group">
                  <motion.button
                    onMouseEnter={() => handleFilterChange(cat.name)}
                    onClick={() => handleFilterChange(cat.name)}
                    whileHover={{ 
                      scale: 1.4, 
                      rotate: [0, -10, 10, 0],
                      backgroundColor: cat.hoverColor 
                    }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-6 h-6 md:w-8 md:h-8 transition-all shadow-md relative fuzzy ${
                      filter === cat.name ? 'ring-2 ring-offset-4 ring-ink/40' : 'hover:ring-2 hover:ring-offset-2 hover:ring-ink/10'
                    }`}
                    style={{ 
                      backgroundColor: cat.color,
                      borderRadius: cat.shape
                    }}
                  >
                    {filter === cat.name && (
                      <motion.div 
                        layoutId="active-filter"
                        className="absolute inset-0 bg-white/20"
                        style={{ borderRadius: cat.shape }}
                      />
                    )}
                  </motion.button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] bg-ink text-bg px-2 py-1 rounded shadow-xl">
                      {cat.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[180px] md:auto-rows-[220px]">
            {filteredPortraits.map((p) => (
              <motion.div
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                whileHover={{ y: -4, zIndex: 10 }}
                className={`group cursor-pointer relative overflow-hidden bg-ink/5 ${
                  p.isLarge ? 'col-span-2 row-span-2' : 'col-span-1 row-span-1'
                }`}
              >
                <div className="w-full h-full relative overflow-hidden">
                  {p.isComparison ? (
                    <div className="flex h-full w-full relative">
                      <div className="w-1/2 h-full relative overflow-hidden border-r border-white/10">
                        <img src={p.photoSrc} alt="Original" className="w-full h-full object-cover grayscale" />
                      </div>
                      <div className="w-1/2 h-full relative overflow-hidden">
                        <img src={p.artSrc} alt="Illustration" className="w-full h-full object-cover" />
                      </div>
                      <div className="absolute top-2 left-2 bg-accent-orange text-[7px] text-white px-1.5 py-0.5 rounded-full uppercase font-bold tracking-widest">B&A</div>
                    </div>
                  ) : p.type === 'video' ? (
                    <video
                      src={p.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={p.src}
                      alt={p.title}
                      className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-ink/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <p className="text-[7px] text-white/60 uppercase tracking-[0.3em] mb-1">{p.category}</p>
                    <p className="text-[10px] text-white font-bold uppercase tracking-tighter">{p.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Scroll to top button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
              className="fixed bottom-8 right-8 z-[50] w-12 h-12 bg-ink text-bg rounded-full flex items-center justify-center shadow-xl hover:bg-accent-orange transition-colors"
            >
              <ChevronDown size={20} className="rotate-180" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-40 mb-10 md:mb-20 py-16 md:py-32 border-t border-ink/10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-8"
          >
            <h3 className="text-3xl md:text-7xl font-bold uppercase tracking-tighter max-w-3xl leading-[0.9]">
              Every soul has a story.<br />Let's draw yours.
            </h3>
            <p className="text-xs md:text-sm text-[#444] tracking-widest max-w-md mx-auto leading-loose">
              Custom portraits for pets, people, and the things you love.
            </p>
            <motion.button
              onClick={() => setActivePage('FOR BUSINESS')}
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className="mt-8 md:mt-12 px-8 md:px-12 py-4 md:py-6 border-[2.5px] border-ink bg-white/20 text-ink text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] rounded-full transition-all relative overflow-hidden group jitter-hover"
            >
              <motion.div 
                className="absolute inset-0 bg-ink"
                variants={{
                  hover: { y: 0 }
                }}
                initial={{ y: "100%" }}
                transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              />
              <span className="relative z-10 group-hover:text-bg transition-colors flex items-center gap-4 mx-auto">
                Get Started
                <motion.div
                  variants={{
                    hover: { x: 8 }
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <ArrowRight size={16} />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Lightbox / Expanded View */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20 bg-bg/98 backdrop-blur-2xl"
            onClick={() => setSelectedId(null)}
          >
            {/* Navigation Buttons */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredPortraits.findIndex(p => p.id === selectedId);
                const prevIndex = (currentIndex - 1 + filteredPortraits.length) % filteredPortraits.length;
                setSelectedId(filteredPortraits[prevIndex].id);
              }}
              className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 p-4 hover:bg-ink/5 rounded-full transition-all z-[110] group"
            >
              <ChevronLeft size={32} className="text-ink/20 group-hover:text-ink transition-colors" />
            </button>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                const currentIndex = filteredPortraits.findIndex(p => p.id === selectedId);
                const nextIndex = (currentIndex + 1) % filteredPortraits.length;
                setSelectedId(filteredPortraits[nextIndex].id);
              }}
              className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 p-4 hover:bg-ink/5 rounded-full transition-all z-[110] group"
            >
              <ChevronRight size={32} className="text-ink/20 group-hover:text-ink transition-colors" />
            </button>

            <motion.div 
              layoutId={`portrait-${selectedId}`}
              className="relative max-w-6xl w-full bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row md:h-[85vh] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-30 p-4 md:p-3 hover:bg-ink/5 rounded-full transition-colors"
              >
                <X size={28} className="md:w-6 md:h-6" />
              </button>
              
              <div className="w-full md:w-3/5 h-[40vh] md:h-auto overflow-hidden bg-ink/5">
                {(() => {
                  const sel = allPortraits.find(p => p.id === selectedId);
                  if (!sel) return null;
                  if (sel.isComparison) return <BeforeAfterSlider photoSrc={sel.photoSrc} artSrc={sel.artSrc} client={sel.client} style={sel.style} />;
                  if (sel.type === 'video') return <video src={sel.src} autoPlay loop muted playsInline className="w-full h-full object-cover" />;
                  return <img src={sel.src} alt="Selected Portrait" className="w-full h-full object-cover" />;
                })()}
              </div>
              
              <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col h-full overflow-y-auto bg-white custom-scrollbar">
                <div className="mb-8">
                  <h3 className="text-[10px] uppercase tracking-[0.4em] text-[#999] mb-2">
                    {allPortraits.find(p => p.id === selectedId)?.category}
                  </h3>
                  <h2 className="text-4xl md:text-5xl font-bold uppercase leading-tight tracking-tighter mb-6">
                    {allPortraits.find(p => p.id === selectedId)?.title}
                  </h2>

                  <button 
                    onClick={() => {
                      setShowOrderPopup(true);
                    }}
                    className="w-full py-4 bg-[#DB562E] text-white uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-ink transition-all shadow-lg flex items-center justify-center gap-3 mb-8"
                  >
                    ORDER A SOUL-STUDY →
                  </button>
                  
                  <div className="space-y-4 border-t border-b border-ink/5 py-6 mb-8">
                    {[
                      { label: 'Type', value: 'Custom Digital Pet Portrait' },
                      { label: 'Format', value: 'High-resolution JPG or PNG (Square 1:1 by default)' },
                      { label: 'Turnaround', value: 'Digital delivery within 3–5 days' },
                      { label: 'Usage', value: 'Personal use rights included (Perfect for prints, frames, or gifts)' },
                      { label: 'Includes', value: '1/1 Unique Commission' }
                    ].map((row) => (
                      <div key={row.label} className="flex flex-col gap-0.5">
                        <span className="text-[8px] uppercase text-ink/40 tracking-[0.2em] font-bold">{row.label}</span>
                        <span className="text-[11px] font-medium tracking-tight text-ink">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 mb-12">
                  {[
                    { 
                      id: 'Art', 
                      title: 'Modern Minimalist Tribute', 
                      content: 'Turn your beloved companion into a contemporary piece of art. Each portrait is carefully hand-drawn from your pet’s photo, capturing their spirit in a clean, minimalist style that fits beautifully into modern home decor.' 
                    },
                    { 
                      id: 'HowItWorks', 
                      title: 'How It Works', 
                      content: (
                        <ul className="space-y-3">
                          <li><span className="font-bold uppercase text-[9px] tracking-widest block mb-1">Order</span> Select your commission type.</li>
                          <li><span className="font-bold uppercase text-[9px] tracking-widest block mb-1">Upload</span> Share 1-3 clear photos of your pet via the inquiry button.</li>
                          <li><span className="font-bold uppercase text-[9px] tracking-widest block mb-1">Creation</span> Yuqi hand-draws your custom illustration with a focus on character and soul.</li>
                          <li><span className="font-bold uppercase text-[9px] tracking-widest block mb-1">Delivery</span> Receive your high-resolution file, ready for any personal printing project.</li>
                        </ul>
                      )
                    },
                    { 
                      id: 'Notes', 
                      title: 'Important Notes', 
                      content: (
                        <div className="space-y-2 italic">
                          <p>"One pet per portrait. For multi-pet compositions, please reach out via a custom inquiry."</p>
                          <p>"Background colors and minor details are artistically adjusted to ensure the best minimalist result."</p>
                        </div>
                      )
                    }
                  ].map((item) => (
                    <div key={item.id} className="border-b border-ink/5">
                      <div 
                        onMouseEnter={() => setActiveAccordion(item.id)}
                        className="w-full py-4 flex justify-between items-center text-[11px] font-bold uppercase tracking-[0.2em] hover:text-accent-orange transition-colors cursor-default"
                      >
                        {item.title}
                        <ChevronDown 
                          size={14} 
                          className={`transition-transform duration-300 ${activeAccordion === item.id ? 'rotate-180' : ''}`} 
                        />
                      </div>
                      <AnimatePresence>
                        {activeAccordion === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="pb-6 text-xs leading-relaxed text-[#444]">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="p-8 border-t border-ink/5 bg-white">
                  <p className="text-center text-[10px] leading-relaxed text-[#444] italic px-4">
                    "Each soul is unique. Whether you prefer a digital keepsake or a physical window silhouette, Yuqi tailors every line to your companion's spirit."
                  </p>
                  <p className="text-center mt-4 text-[8px] uppercase tracking-[0.2em] text-[#999] font-bold">
                    📍 HAND-FINISHED IN SEATTLE
                  </p>
                </div>
              </div>

              {/* Material Video Overlay */}
              <AnimatePresence>
                {showMaterialVideo && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-50 flex items-center justify-center p-12 bg-bg/90 backdrop-blur-md"
                  >
                    <div className="relative w-full max-w-md aspect-square bg-black rounded-lg overflow-hidden shadow-2xl">
                      <button 
                        onClick={() => setShowMaterialVideo(false)}
                        className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                      >
                        <X size={20} />
                      </button>
                      <video 
                        controls
                        className="w-full h-full object-cover"
                      >
                        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-motion-of-liquid-gold-34444-large.mp4" type="video/mp4" />
                      </video>
                      <div className="absolute bottom-4 left-4 right-4 text-center">
                        <p className="text-[10px] text-white/60 uppercase tracking-widest">Material Showcase: 3D Printed PLA</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

const WindowArtPage = ({ setActivePage }: { setActivePage: (page: string) => void }) => {
  const [slide, setSlide] = React.useState(0);
  const [direction, setDirection] = React.useState(1);

  const slides = [
    {
      title: 'Personal, Not Generic',
      text: "Each piece is shaped from your pet's real posture — no templates, no repeats. Just something that feels like yours.",
      img: '/images/window art/PersonalNotGeneric.png',
    },
    {
      title: 'Made for Everyday Spaces',
      text: 'Thin, lightweight, and easy to place — it fits naturally into your home without taking up space or attention.',
      img: '/images/window art/MadeforEverydaySpaces.png',
    },
    {
      title: 'A Thoughtful Gift',
      text: 'A simple way to turn a pet into something you can keep close — subtle, personal, and easy to live with.',
      img: '/images/window art/omni-d2c1fe81-16a6-46ec-b8d0-18d0d58c3b2d.png',
    },
  ];

  const goTo = (next: number) => {
    setDirection(next > slide ? 1 : -1);
    setSlide(next);
  };

  const sizes = [
    { label: 'Small', size: '12cm', price: '$45', dim: 44 },
    { label: 'Medium', size: '17cm', price: '$60', dim: 62, popular: true },
    { label: 'Large', size: '25cm', price: '$75', dim: 88 },
  ];

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? '55%' : '-55%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? '-55%' : '55%', opacity: 0 }),
  };

  return (
    <div className="h-full overflow-y-auto font-sans bg-bg custom-scrollbar pb-24">
      <div className="w-full pt-24 md:pt-[138px] px-6 md:pl-[104px] md:pr-16">

        {/* ── TITLE ── */}
        <div className="mb-8 md:mb-16">
          <PageTitle text="Custom Window Art" />
          <div className="w-full h-[1px] bg-ink/5 mt-6 md:mt-8" />
        </div>

        {/* ── MAIN LAYOUT ── */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Left: description + sizes + CTA */}
          <div className="lg:w-1/3 flex flex-col items-start gap-10">
            <p className="text-sm md:text-base leading-relaxed text-ink/60 max-w-sm">
              A custom pet silhouette made to live quietly in your home — personal, lightweight, and easy to place anywhere. No installation, no tools. Just a small piece that feels like it belongs.
            </p>

            {/* Sizes */}
            <div className="w-full">
              <p className="text-[9px] uppercase tracking-[0.4em] font-bold text-ink/35 mb-6">Choose Your Size</p>
              <div className="flex items-end gap-8 mb-1">
                {sizes.map((s) => (
                  <div key={s.label} className="flex flex-col items-start gap-2">
                    <div
                      className="bg-ink/6 rounded-sm flex items-center justify-center relative"
                      style={{ width: s.dim, height: s.dim }}
                    >
                      <AnimalFace
                        type={s.label === 'Small' ? 'CAT' : s.label === 'Medium' ? 'DOG' : 'SMILE'}
                        color="#DB562E"
                        size={s.dim * 0.55}
                      />
                      {s.popular && (
                        <span className="absolute -top-4 left-0 text-[7px] font-bold uppercase tracking-widest text-accent-orange">★ Popular</span>
                      )}
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-wider text-ink/60">{s.label}</p>
                    <p className="text-xs font-bold text-ink">{s.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col items-start gap-3">
              <button
                onClick={() => setActivePage('COMMISSION')}
                className="flex px-10 py-5 bg-ink text-bg uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-accent-orange transition-all rounded-full items-center gap-3 w-fit"
              >
                Start Your Order <ArrowRight size={14} />
              </button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#DB562E] uppercase pl-10">
                From $45
              </span>
              <span className="text-[9px] text-ink/30 uppercase tracking-widest pl-10">
                Hand-finished in Seattle · ~1 week
              </span>
            </div>
          </div>

          {/* Right: carousel */}
          <div className="lg:w-2/3 flex flex-col gap-0">

            {/* Image */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-ink/5">
              <AnimatePresence custom={direction} mode="wait">
                <motion.img
                  key={slide}
                  src={slides[slide].img}
                  alt={slides[slide].title}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.32, 0, 0.67, 0] }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Text + nav bar below image */}
            <div className="flex items-start justify-between gap-8 pt-6 border-t border-ink/8 mt-0">
              <div className="flex-1 min-h-[80px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={slide}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-[8px] uppercase tracking-[0.4em] font-bold text-ink/30">
                      {String(slide + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-ink">
                      {slides[slide].title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ink/55 max-w-md">
                      {slides[slide].text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2 flex-shrink-0 pt-1">
                <button
                  onClick={() => goTo((slide - 1 + slides.length) % slides.length)}
                  className="w-10 h-10 border border-ink/15 hover:border-ink/50 flex items-center justify-center transition-colors"
                  aria-label="Previous"
                >
                  <ArrowRight size={13} className="rotate-180 text-ink/60" />
                </button>
                <button
                  onClick={() => goTo((slide + 1) % slides.length)}
                  className="w-10 h-10 border border-ink/15 hover:border-ink/50 flex items-center justify-center transition-colors"
                  aria-label="Next"
                >
                  <ArrowRight size={13} className="text-ink/60" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const CommissionPage = ({ setShowOrderPopup }: { setShowOrderPopup: (show: boolean) => void }) => {
  const steps = [
    { 
      num: '01', 
      title: 'PHOTOS', 
      content: 'Share 2-5 clear photos of your pet (eye-level and natural light are best).' 
    },
    { 
      num: '02', 
      title: 'TYPE', 
      content: 'Choose your artwork: Digital Portrait ($80) or 3D Window Art (From $45).' 
    },
    { 
      num: '03', 
      title: 'DETAILS', 
      content: 'Specify your preferred size and any custom color requests.' 
    }
  ];

  return (
    <div className="h-full overflow-y-auto font-sans bg-bg custom-scrollbar pb-24">
      <div className="w-full pt-24 md:pt-[138px] px-6 md:pl-[104px] md:pr-16">
        <div className="mb-8 md:mb-16">
          <PageTitle text="Commission Artwork" />
          <div className="w-full h-[1px] bg-ink/5 mt-6 md:mt-8" />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left Side: Intro & Action */}
          <div className="lg:w-1/3 flex flex-col items-start">
            <p className="text-sm md:text-base leading-relaxed text-ink/60 mb-12 max-w-sm text-left">
              Yuqi creates custom artwork based on a photo of your pet. Available as a digital portrait or a bespoke physical window silhouette.
            </p>
            
            <div className="hidden lg:flex flex-col items-start gap-3">
              <button
                onClick={() => setShowOrderPopup(true)}
                className="flex px-10 py-5 bg-ink text-bg uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-accent-orange transition-all rounded-full items-center gap-3 w-fit"
              >
                START YOUR ORDER <ArrowRight size={14} />
              </button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#DB562E] uppercase pl-10">
                COMMISSIONS START FROM $45
              </span>
            </div>
          </div>

          {/* Right Side: Steps */}
          <div className="lg:w-2/3">
            <div className="mb-12">
              <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-accent-orange mb-8">Ready to collaborate?</h3>
              <div className="space-y-12">
                {steps.map((step, i) => (
                  <div key={i} className="group flex gap-8 md:gap-12 items-start border-b border-ink/5 pb-12 last:border-0">
                    <span className="text-4xl md:text-6xl font-bold text-ink/5 group-hover:text-accent-orange/20 transition-colors duration-500 leading-none">
                      {step.num}
                    </span>
                    <div className="space-y-3">
                      <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-ink">{step.title}</h4>
                      <p className="text-sm md:text-base text-ink/60 leading-relaxed max-w-xl">
                        {step.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex flex-col items-start gap-3 pt-8">
              <button
                onClick={() => setShowOrderPopup(true)}
                className="px-10 py-5 bg-ink text-bg uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-accent-orange transition-all rounded-full"
              >
                START YOUR ORDER →
              </button>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#DB562E] uppercase pl-10">
                COMMISSIONS START FROM $45
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BusinessPage = () => {
  const tabs = [
    { 
      num: '01',
      id: 'Consultation', 
      label: 'CONSULTATION', 
      title: 'CONSULTATION.', 
      content: 'The Studio discusses your commercial space, brand identity, and visual goals to ensure the artwork aligns with your business environment.', 
      color: '#DB562E',
      timeline: '1-2 Days',
      deliverables: 'Conceptual Proposal & Site Quote'
    },
    { 
      num: '02',
      id: 'Execution', 
      label: 'CREATION', 
      title: 'CREATION.', 
      content: 'Using high-precision 3D printing and hand-drawn digital art, the Studio transforms approved concepts into physical pieces with our signature 5mm poetic shadows.', 
      color: '#8DB7D2',
      timeline: '3-5 Days',
      deliverables: 'Custom Digital Illustration & 3D Printed Pieces'
    },
    { 
      num: '03',
      id: 'Partnership', 
      label: 'DELIVERY', 
      title: 'DELIVERY.', 
      color: '#3C6CA2', 
      content: "Finished pieces are hand-checked and delivered with a simple 'Peel & Stick' system, allowing for instant, tool-free application on windows or mirrors.",
      timeline: 'Varies by Project',
      deliverables: 'Ready-to-apply Art & Application Guide'
    }
  ];

  return (
    <div className="h-full flex flex-col font-sans bg-bg overflow-y-auto custom-scrollbar pb-24">
      <div className="w-full pt-24 md:pt-[138px] px-6 md:pl-[104px] md:pr-16">
        <div className="mb-8 md:mb-16">
          <PageTitle text="Art for Pet-Friendly Spaces" />
          <div className="w-full h-[1px] bg-ink/5 mt-6 md:mt-8" />
        </div>

        <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
          {/* Left Side: Intro & Action */}
          <div className="lg:w-1/3">
            <p className="text-sm md:text-base leading-relaxed text-ink/60 mb-12 max-w-sm">
              The Studio creates custom decorative artwork and window displays for pet-friendly businesses, including pet stores, grooming salons, veterinary clinics, and cafés.
            </p>
            
            <motion.a 
              href={`mailto:luyuqi0726@gmail.com?subject=${encodeURIComponent("Business Inquiry - Yuqi's Art")}&body=${encodeURIComponent("Hi Yuqi,\n\nI am interested in collaborating with you for a business project.\n\n[Please describe your project here]")}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="hidden lg:inline-block px-10 py-5 bg-ink text-bg uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-accent-orange transition-all rounded-full"
            >
              INQUIRE FOR COLLABORATION →
            </motion.a>
          </div>

          {/* Right Side: Process */}
          <div className="lg:w-2/3">
            <div className="mb-12">
              <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-accent-orange mb-8">Service Process</h3>
              <div className="space-y-12">
                {tabs.map((tab, i) => (
                  <div key={i} className="group flex gap-8 md:gap-12 items-start border-b border-ink/5 pb-12 last:border-0">
                    <span className="text-4xl md:text-6xl font-bold text-ink/5 group-hover:text-accent-orange/20 transition-colors duration-500 leading-none">
                      {tab.num}
                    </span>
                    <div className="space-y-4 flex-1">
                      <h4 className="text-lg md:text-xl font-bold uppercase tracking-tight text-ink">{tab.label}</h4>
                      <p className="text-sm md:text-base text-ink/60 leading-relaxed max-w-xl">
                        {tab.content}
                      </p>
                      
                      <div className="pt-4 grid grid-cols-2 gap-6">
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink/40">Timeline</p>
                          <p className="text-xs font-bold text-ink/80">{tab.timeline}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-ink/40">Deliverables</p>
                          <p className="text-xs font-bold text-ink/80">{tab.deliverables}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:hidden flex justify-start pt-8">
              <motion.a 
                href={`mailto:luyuqi0726@gmail.com?subject=${encodeURIComponent("Business Inquiry - Yuqi's Art")}&body=${encodeURIComponent("Hi Yuqi,\n\nI am interested in collaborating with you for a business project.\n\n[Please describe your project here]")}`}
                className="px-10 py-5 bg-ink text-bg uppercase text-[10px] font-bold tracking-[0.4em] hover:bg-accent-orange transition-all rounded-full"
              >
                INQUIRE FOR COLLABORATION →
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => (
  <div className="bg-bg overflow-y-auto h-full custom-scrollbar">
    <div className="w-full pt-24 md:pt-[138px] px-6 md:pl-[104px] md:pr-16">
      <PageTitle text="About the Studio" />
      
      <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start text-left">
        <div className="w-full md:w-[45%] aspect-[4/5] bg-ink/5 overflow-hidden shadow-sm relative group">
          <img 
            src="https://picsum.photos/seed/yuqi-studio/1000/1250?grayscale" 
            alt="Yuqi's Studio" 
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-[3s]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 border-[10px] md:border-[20px] border-bg/20 pointer-events-none" />
        </div>
        <div className="w-full md:w-[55%]">
          <div className="space-y-8 md:space-y-12">
            <section className="relative pl-6 md:pl-0">
              <div className="absolute left-0 md:-left-8 top-0 w-1 h-full bg-accent-orange/20" />
              <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-accent-orange mb-4">Vision.</h3>
              <p className="text-sm md:text-base leading-relaxed text-ink/60">
                The studio explores the connection between people and their animals through simple, modern artwork. Yuqi focuses on capturing the character of each pet in a clean, artistic way.
              </p>
            </section>

            <section className="relative pl-6 md:pl-0">
              <div className="absolute left-0 md:-left-8 top-0 w-1 h-full bg-accent-blue-light/20" />
              <h3 className="text-[12px] uppercase tracking-[0.4em] font-bold text-accent-orange mb-4">Artist.</h3>
              <p className="text-sm md:text-base leading-relaxed text-ink/60">
                Yuqi is an artist and designer based in Seattle. Her work combines digital illustration with paper-cut inspired design to create unique pieces for homes and businesses.
              </p>
            </section>

            <div className="pt-8 md:pt-12 border-t border-ink/10">
              <h3 className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-4 md:mb-6 text-ink/60">Studio Credentials</h3>
              <div className="flex flex-wrap gap-x-4 md:gap-x-8 gap-y-3 md:gap-y-4 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#333]">
                <span className="flex items-center gap-2">BESPOKE DESIGN</span>
                <span className="text-ink/10">•</span>
                <span className="flex items-center gap-2">SEATTLE CRAFTED</span>
                <span className="text-ink/10">•</span>
                <span className="text-ink/10">•</span>
                <span className="flex items-center gap-2">DIGITAL PRECISION</span>
              </div>
            </div>

            <div className="pt-8 md:pt-12 border-t border-ink/10">
              <h3 className="text-[10px] md:text-[12px] uppercase tracking-[0.3em] font-bold mb-6 text-ink/60">Studio Mascots</h3>
              <div className="flex gap-8">
                <motion.div 
                  whileHover={{ y: -5, rotate: [0, -5, 5, 0] }}
                  className="flex flex-col items-center gap-2"
                >
                  <AnimalFace type="CAT" color="#DB562E" size={48} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">Mochi</span>
                </motion.div>
                <motion.div 
                  whileHover={{ y: -5, rotate: [0, 5, -5, 0] }}
                  className="flex flex-col items-center gap-2"
                >
                  <AnimalFace type="DOG" color="#3C6CA2" size={48} />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-ink/40">Bento</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activePage, setActivePage] = useState('HOME');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeOverlay, setActiveOverlay] = useState<string | null>(null);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderProductType, setOrderProductType] = useState<'DIGITAL PORTRAIT' | 'WINDOW ART'>('DIGITAL PORTRAIT');
  const [orderPortraitStyle, setOrderPortraitStyle] = useState<'AUTHENTIC' | 'ARTISTIC' | null>(null);
  const [orderWindowColor, setOrderWindowColor] = useState<string | null>(null);
  const [orderWindowSize, setOrderWindowSize] = useState<string | null>(null);
  const [isCustomColor, setIsCustomColor] = useState(false);
  const [customColorText, setCustomColorText] = useState('');
  const [hasUploadedPhoto, setHasUploadedPhoto] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const renderContent = () => {
    switch (activePage) {
      case 'HOME':
        return <ShapesCanvas setActivePage={setActivePage} />;
      case 'PORTRAITS':
        return <PortraitsPage setActivePage={setActivePage} setShowOrderPopup={setShowOrderPopup} />;
      case 'WINDOW ART':
        return <WindowArtPage setActivePage={setActivePage} />;
      case 'COMMISSION':
        return <CommissionPage setShowOrderPopup={setShowOrderPopup} />;
      case 'FOR BUSINESS':
        return <BusinessPage />;
      case 'ABOUT':
        return <AboutPage />;
      default:
        return <ShapesCanvas setActivePage={setActivePage} />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[100dvh] w-full bg-bg text-ink overflow-hidden">

      <FloatingCompanion />
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 md:p-6 landscape:p-2 landscape:px-6 border-b border-ink/5 bg-bg z-[60]">
        <button 
          onClick={() => setActivePage('HOME')}
          className="text-lg landscape:text-base font-bold tracking-tighter uppercase"
        >
          YUQI'S ART
        </button>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2"
        >
          <Menu size={20} className="landscape:w-4 landscape:h-4" />
        </button>
      </header>

      {/* Footer Overlays - Glassmorphism Popups */}
      <AnimatePresence>
        {activeOverlay && (
          <>
            {/* Backdrop for mobile */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveOverlay(null)}
              className="fixed inset-0 z-[90] bg-ink/5 backdrop-blur-[2px]"
            />
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="fixed bottom-10 md:bottom-24 left-4 right-4 md:left-[300px] md:right-auto z-[100] md:w-[450px] bg-[#F2EEE6]/98 md:bg-white/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-6 md:p-8 pointer-events-auto"
            >
              <button 
                onClick={() => setActiveOverlay(null)}
                className="absolute top-4 right-4 p-4 md:p-2 hover:bg-ink/5 rounded-full transition-colors z-50"
              >
                <X size={24} className="md:w-5 md:h-5" />
              </button>
              
              {activeOverlay === 'Location' && (
              <div className="space-y-6">
                <div className="flex gap-6 items-center border-b border-ink/5 pb-6">
                  <div className="w-1/4 aspect-square bg-ink/5 overflow-hidden rounded-lg">
                    <img 
                      src="https://picsum.photos/seed/seattle-minimal/400/400?grayscale&blur=2" 
                      alt="Seattle Minimal" 
                      className="w-full h-full object-cover opacity-60"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="w-3/4">
                    <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40 mb-1">Location</h2>
                    <h3 className="text-lg font-bold uppercase tracking-widest text-ink">Base in Seattle</h3>
                    <p className="text-[11px] leading-relaxed text-ink/70 mt-2">
                      Yuqi Studio is located in Seattle, WA. We take pride in being a local creative hub for the Pacific Northwest pet community.
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">Local Pickup</h4>
                    <p className="text-[10px] leading-relaxed text-ink/70">
                      Free local pickup is available for all physical orders. Once your Window Art is ready, we will coordinate a convenient time for you to collect it from our studio.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-ink/40">Global Shipping</h4>
                    <p className="text-[10px] leading-relaxed text-ink/70">
                      Not in Seattle? No problem. We offer worldwide shipping for all Window Art pieces and instant digital delivery for Portraits.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeOverlay === 'FAQ' && (
              <div className="space-y-6">
                <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">FAQ</h2>
                <div className="space-y-4">
                  {[
                    { 
                      q: "What are the pricing options?", 
                      a: (
                        <div className="space-y-1 mt-1">
                          <p>Portraits: $80 (1/1 Digital Commission)</p>
                          <p>Window Art: $45 (12cm) / $60 (17cm) / $75 (25cm)</p>
                        </div>
                      )
                    },
                    { 
                      q: "What photos should I prepare?", 
                      a: <>Clear photos with natural lighting work best. For <span className="font-bold">Digital Portraits</span>, <span className="font-bold">1</span>-<span className="font-bold">3</span> photos are ideal. For <span className="font-bold">Window Art</span>, please share <span className="font-bold">2</span>–<span className="font-bold">5</span> clear photos to capture your companion's unique silhouette.</> 
                    },
                    { 
                      q: "What is the expected turnaround time?", 
                      a: <>Hand-drawn creation and production are usually completed within <span className="font-bold">1</span> week.</> 
                    },
                    { 
                      q: "Do you offer international shipping?", 
                      a: <>Yes. While local pickup in Seattle is preferred for <span className="font-bold">Window Art</span>, we provide global shipping for all physical commissions.</> 
                    },
                    { 
                      q: "Can I request a custom color or size?", 
                      a: <>Yes. <span className="font-bold">Window Art</span> is available in multiple sizes and custom spray-paint finishes can be requested to match your interior perfectly.</> 
                    },
                    { 
                      q: "How do I install Window Art?", 
                      a: <>No installation needed. It's designed to be easily placed and removed without leaving any marks, making it both simple and stylish.</> 
                    },
                    { 
                      q: "Do you offer custom sizes?", 
                      a: <>Yes! We can accommodate custom dimensions for both portraits and window art. Please <a href="mailto:luyuqi0726@gmail.com?subject=Inquiry: Custom Size Project" className="text-accent-orange underline underline-offset-2">email us</a> for a bespoke quote.</> 
                    }
                  ].map((faq, i) => (
                    <div key={i} className="space-y-1.5">
                      <p className="text-[10px] font-medium uppercase tracking-wider text-ink/90">{faq.q}</p>
                      <div className="text-[10px] leading-relaxed text-ink/70">{faq.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeOverlay === 'Credits' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">Design & Art</h2>
                  <p className="text-[10px] leading-relaxed text-ink/70">
                    All artwork, window displays, and website design by Yuqi.
                  </p>
                </div>
                <div className="space-y-1">
                  <h2 className="text-[10px] font-bold uppercase tracking-[0.2em] text-ink/40">Technology</h2>
                  <p className="text-[10px] leading-relaxed text-ink/70">
                    Crafted with digital precision and hand-finished in the Pacific Northwest.
                  </p>
                </div>
                <div className="space-y-1 pt-2">
                  <p className="text-[9px] uppercase tracking-widest text-ink/30 font-bold">
                    © 2026 Yuqi Studio. All rights reserved.
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
      </AnimatePresence>


      {/* Sidebar - Responsive */}
      <aside className={`fixed inset-0 md:fixed md:top-0 md:left-0 md:bottom-0 w-full md:w-[280px] flex-shrink-0 z-[70] border-r border-ink/5 ${isMobileMenuOpen ? 'block' : 'hidden md:block'}`}>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage} 
          isOpen={isMobileMenuOpen} 
          setIsOpen={setIsMobileMenuOpen}
          setActiveOverlay={setActiveOverlay}
          setShowOrderPopup={setShowOrderPopup}
        />
      </aside>

      {/* Main Content - Expanded */}
      <main className="flex-1 relative overflow-hidden md:ml-[280px]">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full"
        >
          {renderContent()}
        </motion.div>
      </main>

      {/* Order Popup */}
      <AnimatePresence>
        {showOrderPopup && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-ink/60 backdrop-blur-md"
            onClick={() => {
              setShowOrderPopup(false);
              setOrderProductType('DIGITAL PORTRAIT');
              setOrderPortraitStyle(null);
              setOrderWindowColor(null);
              setOrderWindowSize(null);
              setIsCustomColor(false);
              setCustomColorText('');
              setHasUploadedPhoto(false);
              setUploadedFileName('');
              setCustomerEmail('');
              setOrderSubmitted(false);
            }}
          >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-[#F2EEE6] w-full max-w-2xl p-8 md:p-12 rounded-2xl shadow-2xl border border-ink/5 relative overflow-y-auto max-h-[90vh] custom-scrollbar"
                onClick={(e) => e.stopPropagation()}
              >
              <button 
                onClick={() => {
                  setShowOrderPopup(false);
                  setOrderProductType('DIGITAL PORTRAIT');
                  setOrderPortraitStyle(null);
                  setOrderWindowColor(null);
                  setOrderWindowSize(null);
                  setIsCustomColor(false);
                  setCustomColorText('');
                  setHasUploadedPhoto(false);
                  setUploadedFileName('');
                  setCustomerEmail('');
                  setOrderSubmitted(false);
                  setShowOrderPopup(false);
                }}
                className="absolute top-4 right-4 md:top-6 md:right-6 p-4 md:p-2 hover:bg-ink/5 rounded-full transition-colors z-50"
              >
                <X size={24} className="md:w-5 md:h-5" />
              </button>

              {orderSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4 gap-8"
                >
                  <AnimalFace type="SMILE" color="#DB562E" size={72} />
                  <div className="space-y-4">
                    <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent-orange">SUBMITTED!</p>
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter leading-tight">
                      Thank you for<br />sharing your story.
                    </h3>
                    <p className="text-sm text-ink/50 leading-relaxed max-w-sm mx-auto">
                      Yuqi will reach out to you via email soon.
                    </p>
                  </div>
                  <button
                    onClick={() => { setOrderSubmitted(false); setShowOrderPopup(false); }}
                    className="mt-4 px-10 py-4 border-[2px] border-ink text-ink text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-ink hover:text-bg transition-all rounded-[2px]"
                  >
                    Close
                  </button>
                </motion.div>
              ) : (
              <>
              <div className="mb-10 flex justify-between items-start">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter mb-2">Order Your Soul-Study</h3>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-widest text-ink/40">Hand-drawn in Seattle. Shipped Worldwide.</p>
                </div>
                <motion.div
                  whileHover={{ scale: 1.1, color: '#DB562E' }}
                  animate={{ 
                    y: [0, -5, 0],
                    rotate: [0, -2, 2, 0]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="block cursor-pointer transition-colors duration-300"
                >
                  <AnimalFace type="DOG" color="currentColor" size={48} className="text-ink hover:text-accent-orange" />
                </motion.div>
              </div>
              
              <form className="space-y-10" onSubmit={(e) => { 
                e.preventDefault(); 
                const isValid = customerEmail && (orderProductType === 'DIGITAL PORTRAIT'
                  ? (orderPortraitStyle && hasUploadedPhoto)
                  : ((orderWindowColor || (isCustomColor && customColorText)) && orderWindowSize && hasUploadedPhoto));
                
                if (!isValid) return;

                setOrderSubmitted(true);
                setOrderProductType('DIGITAL PORTRAIT');
                setOrderPortraitStyle(null);
                setOrderWindowColor(null);
                setOrderWindowSize(null);
                setIsCustomColor(false);
                setCustomColorText('');
                setHasUploadedPhoto(false);
                setUploadedFileName('');
                setCustomerEmail('');

                const productLabel = orderProductType === 'DIGITAL PORTRAIT'
                  ? `Digital Portrait — ${orderPortraitStyle} style`
                  : `Window Art — ${orderWindowSize}, ${orderWindowColor || customColorText} color`;
                const emailBody = encodeURIComponent(
                  `Hi Yuqi,\n\nI'd like to commission a ${productLabel}.\n\nMy email: ${customerEmail}\n\nPlease find my pet photo(s) attached.\n\nLooking forward to hearing from you!`
                );
                const emailSubject = encodeURIComponent(`Commission Request: ${orderProductType}`);
                window.location.href = `mailto:luyuqi0726@gmail.com?subject=${emailSubject}&body=${emailBody}`;
              }}>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">1. Product Type</label>
                    <div className="flex flex-wrap gap-6">
                      {[
                        { id: 'DIGITAL PORTRAIT', label: 'DIGITAL PORTRAIT ($80)' },
                        { id: 'WINDOW ART', label: 'BESPOKE WINDOW ART (FROM $45)' }
                      ].map(item => (
                        <label key={item.id} className="flex items-center gap-3 cursor-pointer group">
                          <input 
                            type="radio" 
                            name="productType" 
                            className="sr-only peer" 
                            checked={orderProductType === item.id}
                            onChange={() => setOrderProductType(item.id as any)}
                          />
                          <div className="w-4 h-4 rounded-full border border-ink/20 peer-checked:bg-accent-orange peer-checked:border-accent-orange transition-all" />
                          <span className="text-xs uppercase tracking-wider font-medium group-hover:text-accent-orange transition-colors">{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {orderProductType === 'DIGITAL PORTRAIT' ? (
                    <div className="space-y-6">
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">2. Select Style</label>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => setOrderPortraitStyle('AUTHENTIC')}
                          className="text-left group/card flex flex-col"
                        >
                          <div className={`w-full aspect-square bg-ink/5 rounded-lg overflow-hidden border-2 transition-all relative ${orderPortraitStyle === 'AUTHENTIC' ? 'border-ink shadow-lg scale-[1.02]' : 'border-transparent'}`}>
                            <img src="/images/clean/compare-01-b.png" alt="Authentic art" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover/card:opacity-0" />
                            <img src="/images/clean/compare-01-a.png" alt="Authentic original" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover/card:opacity-100" />
                          </div>
                          <span className="text-[9px] text-ink/40 uppercase tracking-wider mt-2 block">Natural Colors From Your Photo</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setOrderPortraitStyle('ARTISTIC')}
                          className="text-left group/card flex flex-col"
                        >
                          <div className={`w-full aspect-square bg-ink/5 rounded-lg overflow-hidden border-2 transition-all relative ${orderPortraitStyle === 'ARTISTIC' ? 'border-ink shadow-lg scale-[1.02]' : 'border-transparent'}`}>
                            <img src="/images/clean/compare-06-b.jpg" alt="Artistic art" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover/card:opacity-0" />
                            <img src="/images/clean/compare-06-a.png" alt="Artistic original" className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover/card:opacity-100" />
                          </div>
                          <span className="text-[9px] text-ink/40 uppercase tracking-wider mt-2 block">Yuqi Signature Series: Limited Palette Edition</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">2. Window Art Options</label>
                      <p className="text-[9px] text-ink/40 leading-relaxed -mt-2">Shape is auto-generated from your pet's pose — no rigid frames, every silhouette is unique.</p>
                      
                      <div className="w-full aspect-video bg-ink/5 rounded-lg overflow-hidden">
                        <video
                          src="/images/window art/材质的细节动图.MOV"
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { name: 'Red', src: '/images/clean/window-red.jpg' },
                            { name: 'Blue', src: '/images/clean/window-blue.jpg' },
                            { name: 'Dark Green', src: '/images/clean/window-darkgreen.jpg' },
                            { name: 'Lime Green', src: '/images/clean/window-limegreen.jpg' },
                          ].map(color => (
                            <button
                              key={color.name}
                              type="button"
                              onClick={() => {
                                setOrderWindowColor(color.name);
                                setIsCustomColor(false);
                              }}
                              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${orderWindowColor === color.name && !isCustomColor ? 'border-ink shadow-md scale-[1.02]' : 'border-transparent'}`}
                            >
                              <img src={color.src} alt={color.name} className="w-full h-full object-cover" />
                            </button>
                          ))}
                          
                          <button
                            type="button"
                            onClick={() => {
                              setIsCustomColor(true);
                              setOrderWindowColor(null);
                            }}
                            className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${isCustomColor ? 'text-accent-orange underline underline-offset-4' : 'text-ink/40 hover:text-ink'}`}
                          >
                            Need a specific color? <span className="underline">[Request a custom palette]</span>
                          </button>
                        </div>

                        <AnimatePresence>
                          {isCustomColor && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="overflow-hidden"
                            >
                              <input 
                                type="text"
                                value={customColorText}
                                onChange={(e) => setCustomColorText(e.target.value)}
                                placeholder="Specify your color preference here..."
                                className="w-full bg-white border border-ink/10 rounded-lg px-4 py-3 text-[11px] focus:outline-none focus:border-accent-orange transition-all"
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="space-y-4 pt-6 border-t border-ink/5">
                          <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">Select Size</label>
                          <div className="grid grid-cols-2 gap-3">
                            {[
                              { id: '12CM', label: 'Small · 12cm · $45' },
                              { id: '17CM', label: 'Medium · 17cm · $60  ★ Popular' },
                              { id: '25CM', label: 'Large · 25cm · $75' },
                            ].map(size => (
                              <button
                                key={size.id}
                                type="button"
                                onClick={() => setOrderWindowSize(size.id)}
                                className={`py-3 px-4 rounded-lg border text-[10px] font-bold uppercase tracking-widest transition-all ${
                                  orderWindowSize === size.id 
                                    ? 'bg-ink text-bg border-ink shadow-md' 
                                    : 'bg-white text-ink/60 border-ink/10 hover:border-accent-orange'
                                }`}
                              >
                                {size.label}
                              </button>
                            ))}
                          </div>
                          <p className="text-[9px] uppercase tracking-widest text-ink/40 mt-2">
                            Need a specific size? <a href="mailto:luyuqi0726@gmail.com?subject=Inquiry: Custom Size Project" className="text-accent-orange underline underline-offset-2">Email Yuqi</a> to discuss your project.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">3. Upload Photo</label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setUploadedFileName(file.name);
                          setHasUploadedPhoto(true);
                        }
                      }}
                    />
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-xl p-10 text-center transition-all cursor-pointer group ${
                        hasUploadedPhoto
                          ? 'bg-accent-orange/5 border-accent-orange/30'
                          : 'bg-ink/5 border-ink/10 hover:border-accent-orange'
                      }`}
                    >
                      <Send size={24} className={`mx-auto mb-4 transition-colors ${hasUploadedPhoto ? 'text-accent-orange' : 'text-ink/20 group-hover:text-accent-orange'}`} />
                      <p className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${hasUploadedPhoto ? 'text-accent-orange' : 'text-ink/40 group-hover:text-ink'}`}>
                        {hasUploadedPhoto ? uploadedFileName : 'Drop photo here or Click to Browse'}
                      </p>
                      <p className="text-[8px] uppercase tracking-widest text-ink/20 mt-2">JPG, PNG up to 10MB</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-ink/60">4. Your Email</label>
                    <input
                      type="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full bg-ink/5 border border-ink/10 rounded-lg px-4 py-3 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent-orange transition-colors"
                    />
                    <p className="text-[8px] uppercase tracking-widest text-ink/30">Yuqi will reply to confirm your order details.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ink/5">
                  <p className="text-[10px] uppercase tracking-widest text-ink/40 mb-6 text-center italic">
                    Portraits from $80. Window Art from $45. Yuqi will confirm details after reviewing your photos.
                  </p>
                  <button
                    type="submit"
                    disabled={!customerEmail || (
                      orderProductType === 'DIGITAL PORTRAIT'
                        ? (!orderPortraitStyle || !hasUploadedPhoto)
                        : (!hasUploadedPhoto || (!orderWindowColor && (!isCustomColor || !customColorText)) || !orderWindowSize)
                    )}
                    className={`w-full py-5 uppercase text-[11px] font-bold tracking-[0.3em] rounded-full transition-all shadow-xl ${
                      customerEmail && (orderProductType === 'DIGITAL PORTRAIT' ? (orderPortraitStyle && hasUploadedPhoto) : (hasUploadedPhoto && (orderWindowColor || (isCustomColor && customColorText)) && orderWindowSize))
                        ? 'bg-ink text-bg hover:bg-accent-orange'
                        : 'bg-ink/20 text-ink/40 cursor-not-allowed'
                    }`}
                  >
                    Submit Request
                  </button>
                  {!(customerEmail && (orderProductType === 'DIGITAL PORTRAIT' ? (orderPortraitStyle && hasUploadedPhoto) : (hasUploadedPhoto && (orderWindowColor || (isCustomColor && customColorText))))) && (
                    <p className="text-[8px] uppercase tracking-widest text-center text-accent-orange/60 font-bold mt-4">
                      Please complete all steps to continue
                    </p>
                  )}
                </div>
              </form>
              </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
