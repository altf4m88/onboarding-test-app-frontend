import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { AppProps } from 'next/app';
import Layout from '../components/layout';
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
