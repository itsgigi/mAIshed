import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ParallaxText from '../ui/ParallaxText';
import Orb from '../ui/Orb';
import SpotlightCard from '../ui/SpotlightCard';

interface SidebarProps {
  items: string[];
  direction: number;
  sidebarKey: string;
}

const Sidebar = ({ items, direction, sidebarKey }: SidebarProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Helper to get section ID from item based on route
  const getSectionId = (item: string) => {
    if (sidebarKey === '/hooks') return item;
    // For /ui and others, use lowercase
    return item.toLowerCase();
  };

  // Function to scroll to a section
  const scrollToSection = (itemName: string) => {
    const sectionId = getSectionId(itemName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Intersection Observer to track which section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        let maxIntersectionRatio = 0;
        let mostVisibleSection: string | null = null;

        entries.forEach((entry) => {
          if (entry.intersectionRatio > maxIntersectionRatio) {
            maxIntersectionRatio = entry.intersectionRatio;
            mostVisibleSection = entry.target.id;
          }
        });

        if (mostVisibleSection) {
          const itemName = items.find(item => 
            getSectionId(item) === mostVisibleSection
          );
          if (itemName) {
            setSelectedItem(itemName);
          }
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1], // Multiple thresholds for better detection
        rootMargin: '-10% 0px -10% 0px' // Adjust the trigger area
      }
    );

    // Observe all sections
    items.forEach(item => {
      const sectionId = getSectionId(item);
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Set initial selected item to the first item
    if (items.length > 0 && !selectedItem) {
      setSelectedItem(items[0]);
    }

    return () => observer.disconnect();
  }, [items, sidebarKey, selectedItem]);

  return (
    <aside className={`fixed left-5 z-50 ${sidebarKey === '/' ? 'opacity-0 xl:opacity-100' : 'opacity-100'}`}>
      <SpotlightCard className="custom-sidebar-spotlight-card h-screen" spotlightColor="rgba(84, 181, 255, 0.5)" sidebar>
        <nav className='h-full flex items-center justify-center'>
          {sidebarKey === '/' ? (
            <motion.div
              key={sidebarKey}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "200px", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="overflow-hidden opacity-0 items-center flex flex-col h-full"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -40 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: -40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={0}
                  forceHoverState={false}
                />
              </motion.div>
              <div className='h-full flex items-center -mt-20'>
                <div className='relative left-0 h-[50vh] flex flex-col justify-between'>
                  <ParallaxText baseVelocity={1}>{['message', 'input', 'list', 'speed-dial', 'dot']}</ParallaxText>
                  <ParallaxText baseVelocity={-1}>{['message', 'speed-dial', 'dot', 'inputl', 'list']}</ParallaxText>
                  <ParallaxText baseVelocity={1}>{['dot', 'list', 'input', 'message', 'speed-dial']}</ParallaxText>
                  <ParallaxText baseVelocity={-1}>{['speed-dial', 'input', 'list', 'dot', 'input']}</ParallaxText>
                  <ParallaxText baseVelocity={1}>{['stream', 'autocomplete', 'moderation']}</ParallaxText>
                  <ParallaxText baseVelocity={-1}>{['moderation', 'stream', 'autocomplete']}</ParallaxText>
                  <ParallaxText baseVelocity={1}>{['moderation', 'autocomplete', 'stream']}</ParallaxText>
                  <ParallaxText baseVelocity={-1}>{['autocomplete', 'stream', 'moderation']}</ParallaxText>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={sidebarKey}
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="overflow-hidden items-center flex flex-col h-full"
            >
              <motion.div
                initial={{ scale: 0, opacity: 0, x: -40 }}
                animate={{ scale: 1, opacity: 1, x: 0 }}
                exit={{ scale: 0, opacity: 0, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <Orb
                  hoverIntensity={0.5}
                  rotateOnHover={true}
                  hue={0}
                  forceHoverState={false}
                />
              </motion.div>
              <div className='h-full flex items-center -mt-40'>
                <motion.ul
                  className="flex flex-col gap-3 mx-3"
                  initial={{ x: 40 * direction, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -40 * direction, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                >
                  { items.map((item, idx) => (
                    <motion.li 
                      key={idx} 
                      className={`cursor-pointer text-sm transition-colors mx-1 duration-200 text-center ${
                        selectedItem === item 
                          ? 'text-gray-800 font-semibold' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => scrollToSection(item)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        scale: selectedItem === item ? 1.2 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20
                      }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          )}
        </nav>
    </SpotlightCard>
    </aside>
  )
}

export default Sidebar;
