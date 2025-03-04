import Header from "./Header";

const HomePage = () => {
  const handleGetStarted = () => {
    console.log("Get Started clicked");
    // Implementar navegação para página de registro ou onboarding
  };

  const handleContactSales = () => {
    console.log("Contact Sales clicked");
    // Implementar abertura de formulário de contato
  };

  const handleLogin = () => {
    console.log("Login clicked");
    // Implementar navegação para página de login
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        onContactClick={handleContactSales}
        onLoginClick={handleLogin}
        onGetStartedClick={handleGetStarted}
      />
    </div>
  );
};

export default HomePage;
