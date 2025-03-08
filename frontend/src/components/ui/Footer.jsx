// components/layout/Footer.js
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-blue-600">MilestoneFund</span>
            <p className="mt-4 text-gray-600">
              Empowering creators and innovators through decentralized crowdfunding.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Platform</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/projects" className="text-base text-gray-500 hover:text-gray-900">
                  Browse Projects
                </Link>
              </li>
              <li>
                <Link href="/create-project" className="text-base text-gray-500 hover:text-gray-900">
                  Start a Project
                </Link>
              </li>
              <li>
                <Link href="/dashboard/investor" className="text-base text-gray-500 hover:text-gray-900">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link href="/faq" className="text-base text-gray-500 hover:text-gray-900">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-500 hover:text-gray-900">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-base text-gray-500 hover:text-gray-900">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} MilestoneFund. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
