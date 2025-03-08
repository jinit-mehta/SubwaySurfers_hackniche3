// components/layout/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-white">TrustChain</span>
            <p className="mt-4 text-white">
              Empowering creators and innovators through decentralized crowdfunding.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 on hover:text-white tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/projects" className="text-base text-gray-500 on hover:text-white">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/create-project" className="text-base text-gray-500 hover:text-white">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link href="/dashboard/investor" className="text-base text-gray-500 hover:text-white">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 on hover:text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/faq" className="text-base text-gray-500 hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} TrustChain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
