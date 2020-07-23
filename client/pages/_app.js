import 'bootstrap/dist/css/bootstrap.css';

// Wrapper for all the components of the next js components(pages)
const AppComponent = ({ Component, pageProps }) => {
  return (
    <div>
      <Component {...pageProps} />
    </div>
  );
};

export default AppComponent;
