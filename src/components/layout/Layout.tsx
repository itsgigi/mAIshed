import React from 'react';
/* import Footer from './Footer'; */
import { TbFishHook, TbBlocks, TbHome } from "react-icons/tb";
import Sidebar from './Sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dock from './Dock';
import Threads from '../ui/Threads';

const navOrder = ['/', '/ui', '/hooks'];
const sidebarItemsMap: Record<string, string[]> = {
  '/': [],
  '/ui': ['Message', 'Input', 'Chat List', 'Speed Dial', 'Blinkin Dot'],
  '/hooks': ['useStreamResponses', 'useAIAutoComplete', 'useAIModeration'],
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [prevPath, setPrevPath] = React.useState(location.pathname);
  const [direction, setDirection] = React.useState(1);

  React.useEffect(() => {
    if (location.pathname !== prevPath) {
      const prevIdx = navOrder.indexOf(prevPath);
      const currIdx = navOrder.indexOf(location.pathname);
      setDirection(currIdx > prevIdx ? 1 : -1);
      setPrevPath(location.pathname);
    }
  }, [location.pathname, prevPath]);

  const items = sidebarItemsMap[location.pathname] || [];

  const itemsDock = [
    { icon: <TbHome size={18} />, label: 'Home', onClick: () => navigate('/'), isSelected: location.pathname === '/' },
    { icon: <TbBlocks size={18} />, label: 'Ui Elements', onClick: () => navigate('/ui'), isSelected: location.pathname === '/ui' },
    { icon: <TbFishHook size={18} />, label: 'Hooks', onClick: () => navigate('/hooks'), isSelected: location.pathname === '/hooks' },
  ];

  return (
    <div className='h-screen w-screen flex-1 relative text-black'>
      <div className='z-0 absolute w-screen h-screen'>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
      </div>
      <Dock 
        items={itemsDock}
        panelHeight={68}
        baseItemSize={50}
        magnification={70}
      />

        <AnimatePresence mode="wait" initial={false}>
          <Sidebar items={items} direction={direction} sidebarKey={location.pathname} key={location.pathname} />
        </AnimatePresence>
        {children}
      {/* <Footer /> */}
    </div>
  );
}

export default Layout;