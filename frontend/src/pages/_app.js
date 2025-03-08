import '../globals.css';
import Navbar from '../components/ui/Navbar';
import Footer from '../components/ui/Footer';

function MyApp({ Component, pageProps }) {
  return (
    <div className='bg-white'>
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
