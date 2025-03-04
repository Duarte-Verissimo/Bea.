import React, { useState } from "react";

import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  BarChart2Icon,
  LayoutDashboardIcon,
  PieChartIcon,
  TrendingUpIcon,
  PuzzleIcon,
  XIcon,
  MenuIcon,
  ChevronDownIcon,
  PhoneIcon,
  PlayIcon,
} from "lucide-react";

type HeaderProps = {
  onContactClick?: () => void;
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
};

// Definição dos produtos para o menu
const products = [
  {
    name: "Visualizações",
    description: "Transforme seus dados em visualizações poderosas",
    href: "#visualizacoes",
    icon: BarChart2Icon,
  },
  {
    name: "Dashboard",
    description: "Acompanhe métricas em tempo real",
    href: "#dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    name: "Análises",
    description: "Obtenha insights valiosos dos seus dados",
    href: "#analises",
    icon: PieChartIcon,
  },
  {
    name: "Previsões",
    description: "Antecipe tendências com análise preditiva",
    href: "#previsoes",
    icon: TrendingUpIcon,
  },
  {
    name: "Integrações",
    description: "Conecte com suas ferramentas favoritas",
    href: "#integracoes",
    icon: PuzzleIcon,
  },
];

const callsToAction = [
  { name: "Ver demonstração", href: "#demo", icon: PlayIcon },
  { name: "Fale com vendas", href: "#contato", icon: PhoneIcon },
];

const Header = ({ onContactClick, onLoginClick }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleKeyDown = (callback?: () => void) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      if (callback) callback();
    }
  };

  return (
    <header className="bg-white">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="-m-1.5 p-1.5 flex items-center"
            aria-label="Ir para página inicial"
          >
            <span className="sr-only">DataViz</span>
            <svg
              className="h-8 w-auto text-blue-600"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900">
              DataViz
            </span>
          </a>
        </div>

        {/* Botão do Menu Mobile */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={handleToggleMobileMenu}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">
              {mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            </span>
            {mobileMenuOpen ? (
              <XIcon className="h-6 w-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Menu Desktop */}
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 focus:outline-none"
              onKeyDown={handleKeyDown()}
              tabIndex={0}
            >
              Produtos
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-full -left-8 z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-blue-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-gray-900"
                          tabIndex={0}
                          onKeyDown={handleKeyDown()}
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                      tabIndex={0}
                      onKeyDown={handleKeyDown()}
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <a
            href="#calculadora"
            className="text-sm font-semibold leading-6 text-gray-900"
            tabIndex={0}
            onKeyDown={handleKeyDown()}
          >
            Calculadora
          </a>
          <a
            href="#como-funciona"
            className="text-sm font-semibold leading-6 text-gray-900"
            tabIndex={0}
            onKeyDown={handleKeyDown()}
          >
            Como Funciona
          </a>
          <a
            href="#sobre"
            className="text-sm font-semibold leading-6 text-gray-900"
            tabIndex={0}
            onKeyDown={handleKeyDown()}
          >
            Sobre
          </a>
        </Popover.Group>

        {/* Botões de ação no Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <a
            href="#login"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={onLoginClick}
            tabIndex={0}
            onKeyDown={handleKeyDown(onLoginClick)}
          >
            Login <span aria-hidden="true">&rarr;</span>
          </a>
          <a
            href="#contato"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            onClick={onContactClick}
            tabIndex={0}
            onKeyDown={handleKeyDown(onContactClick)}
          >
            Contacto
          </a>
        </div>
      </nav>

      {/* Menu Mobile com Dialog */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
              <span className="sr-only">DataViz</span>
              <svg
                className="h-8 w-auto text-blue-600"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">
                DataViz
              </span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              aria-label="Fechar menu"
            >
              <span className="sr-only">Fechar menu</span>
              <XIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Produtos
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-none ${
                            open ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#calculadora"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Calculadora
                </a>
                <a
                  href="#como-funciona"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Como Funciona
                </a>
                <a
                  href="#sobre"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sobre
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#login"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => {
                    if (onLoginClick) onLoginClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  Login
                </a>
                <a
                  href="#contato"
                  className="mt-3 -mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 bg-blue-600 text-white hover:bg-blue-700"
                  onClick={() => {
                    if (onContactClick) onContactClick();
                    setMobileMenuOpen(false);
                  }}
                >
                  Contacto
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

export default Header;
