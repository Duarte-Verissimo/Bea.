const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 shadow-lg z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Sua Empresa. Todos os direitos reservados.
            </p>
          </div>

          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Termos de Serviço"
            >
              Termos
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Política de Privacidade"
            >
              Privacidade
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
              tabIndex={0}
              aria-label="Contacte-nos"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
