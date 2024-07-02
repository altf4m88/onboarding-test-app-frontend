import Navbar from './Navbar';
import Head from 'next/head';

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Head>
        <title>Cat Facts</title>
        <meta name="description" content="Cat facts application" />
        <link rel="icon" href="../images/logo.webp" />
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
