// components/layout/Navbar.js
'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-blue-600">MilestoneFund</span>
            </Link>
            
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/projects" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Projects
              </Link>
              <Link href="/create-project" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Start a Project
              </Link>
              <Link href="/dashboard/investor" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <Link href={'/connectwallet'}>
            <Button variant="outline" size="sm" className="mr-3">
              Connect Wallet
            </Button>
            </Link>
            <Button size="sm">
              Sign In
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/projects" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
            Projects
          </Link>
          <Link href="/create-project" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
            Start a Project
          </Link>
          <Link href="/dashboard/investor" className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
