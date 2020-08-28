const LandingPage = ({ currentUser }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are NOT signed in</h1>
  );
};

// Called by browser - when redirected or called by other components
// Called during SSR by the parent component(AppComponent)
LandingPage.getInitialProps = async (context) => {
  return {}
};

export default LandingPage;
