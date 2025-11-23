'use client';

import { NavItem } from './nav-item';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiTerminal } from 'react-icons/hi';

const NAV_ITEMS = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Projetos',
    href: '/projects',
  },
];

export const Header = () => {
  return (
    <header className="absolute top-0 z-10 h-24 w-full flex items-center justify-center">
      <div className="container flex items-center justify-between">
        <motion.div
          initial={{ top: -100 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link href="/">
            <HiTerminal className="text-[#FF4858]" size={70} />
          </Link>
        </motion.div>

        <motion.div
          initial={{ top: -100 }}
          animate={{ top: 0 }}
          transition={{ duration: 0.5 }}
        >
          <nav className="flex items-center gap-4 sm:gap-10">
            {NAV_ITEMS.map(item => (
              <NavItem {...item} key={item.label} />
            ))}
          </nav>
        </motion.div>
      </div>
    </header>
  );
};
