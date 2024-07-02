import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;
