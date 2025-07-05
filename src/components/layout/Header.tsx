import { Link, useLocation } from 'react-router-dom';
import { useRef, useLayoutEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/ui', label: 'UI Elements' },
  { to: '/hooks', label: 'Hooks' },
];

const Header = () => {
  const location = useLocation();

  const isActive = useCallback(((path: string) => 
    location.pathname === path
  ),[location.pathname]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [underlineProps, setUnderlineProps] = useState({ left: 0, width: 0 });
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useLayoutEffect(() => {
    const activeIndex = navLinks.findIndex(link => isActive(link.to));
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const el = linkRefs.current[activeIndex];
      const containerRect = containerRef.current?.getBoundingClientRect();
      const elRect = el?.getBoundingClientRect();
      if (elRect && containerRect) {
        setUnderlineProps({
          left: elRect.left - containerRect.left,
          width: elRect.width,
        });
      }
    }
  }, [isActive, location.pathname]);

  return (
    <header className="glass absolute z-50 top-10 left-1/2 w-[30%] -translate-x-1/2 p-1 rounded-[16px]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-center items-center">
          <div className="flex items-center whitespace-nowrap">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-gray-800 ml-6">
                mAIshed
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8 relative" ref={containerRef}>
              {navLinks.map((link, idx) => (
                <Link
                  key={link.to}
                  to={link.to}
                  ref={el => { linkRefs.current[idx] = el; }}
                  className={`inline-flex px-1 pt-1 border-b-2 text-sm font-medium ml-2
                  ${
                    isActive(link.to)
                      ? 'border-gray-800 hover:text-gray-800 text-gray-800'
                      : 'border-transparent hover:text-gray-500 text-gray-500'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <motion.div
                className="absolute bottom-0 h-0.5 bg-gray-800 rounded"
                animate={{ left: underlineProps.left, width: underlineProps.width }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                style={{ zIndex: 1 }}
              />
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
