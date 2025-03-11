import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

type HeaderProps = {
  onContactClick?: () => void;
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
};

type Product = {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
};

// Definição dos produtos para o menu
const products: Product[] = [];

const callsToAction = [
  { name: "Ver demonstração", href: "#demo", icon: PlayIcon },
  { name: "Fale com vendas", href: "#contato", icon: PhoneIcon },
];

const navigation = products;

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
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link
              to="/"
              className="-m-1.5 p-1.5"
              tabIndex={0}
              aria-label="Homepage"
            >
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-900"
                tabIndex={0}
                aria-label={item.name}
                onKeyDown={handleKeyDown()}
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <SignedIn>
              <div
                tabIndex={0}
                aria-label="Opções da conta"
                onKeyDown={handleKeyDown(() => {})}
                role="button"
              >
                <UserButton
                  appearance={{ elements: { userButtonAvatarBox: "h-8 w-8" } }}
                />
              </div>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button
                  className="text-sm font-semibold text-gray-900"
                  tabIndex={0}
                  aria-label="Entrar"
                  onKeyDown={handleKeyDown()}
                >
                  Entrar <span aria-hidden="true">&rarr;</span>
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
