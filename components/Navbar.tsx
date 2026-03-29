"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Inicio", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("#inicio");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const syncHash = () => {
      setCurrentHash(window.location.hash || "#inicio");
    };

    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const getHashFromHref = (href: string) => {
    const [, hashPart] = href.split("#");
    return hashPart ? `#${hashPart}` : "";
  };

  const handleItemClick = (href: string) => {
    const nextHash = getHashFromHref(href);
    setCurrentHash(nextHash || "#inicio");
    setIsOpen(false);
    setIsSearchOpen(false);
  };

  const isItemActive = (href: string) => {
    const [targetPath, hashPart] = href.split("#");
    const normalizedTargetPath = targetPath || "/";
    const pathMatches = pathname === normalizedTargetPath;

    if (!hashPart) {
      return pathMatches;
    }

    return pathMatches && currentHash === `#${hashPart}`;
  };

  return (
    <header className="relative sticky top-0 z-50 border-b border-[color:rgba(75,54,33,0.15)] bg-[var(--color-surface)]/95 backdrop-blur">
      <nav className="relative flex w-full items-center justify-between px-[5px] py-3">
        <Link
          href="/"
          className="ml-[50px] flex items-center gap-2 text-[var(--color-text-primary)] no-underline"
          onClick={() => setIsOpen(false)}
        >
          <PlantLogo />
          <span className="text-base font-semibold">Verde Raiz</span>
        </Link>

        <SearchField
          className="absolute left-1/2 hidden w-full max-w-xs -translate-x-1/2 min-[769px]:block lg:max-w-md"
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Buscar..."
        />

        <NavLinks
          items={navItems}
          listClassName="hidden items-center gap-4 min-[1025px]:ml-auto min-[1025px]:mr-10 min-[1025px]:flex"
          linkClassName="rounded-md px-3 py-2 text-sm no-underline transition-colors"
          isItemActive={isItemActive}
          onItemClick={handleItemClick}
        />

        <div className="mr-2 flex items-center gap-2 min-[1025px]:hidden">
          <button
            type="button"
            aria-label={isSearchOpen ? "Cerrar busqueda" : "Abrir busqueda"}
            aria-expanded={isSearchOpen}
            aria-controls="mobile-search"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[color:rgba(75,54,33,0.2)] bg-[var(--color-surface)] text-[var(--color-text-primary)] min-[769px]:hidden"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              setIsOpen(false);
            }}
          >
            <span className="sr-only">{isSearchOpen ? "Cerrar busqueda" : "Abrir busqueda"}</span>
            <SearchIcon className="h-5 w-5" />
          </button>

          <button
            type="button"
            aria-label={isOpen ? "Cerrar menu" : "Abrir menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border border-[color:rgba(75,54,33,0.2)] bg-[var(--color-surface)] text-[var(--color-text-primary)]"
            onClick={() => {
              setIsOpen((prev) => !prev);
              setIsSearchOpen(false);
            }}
          >
            <span className="sr-only">{isOpen ? "Cerrar menu" : "Abrir menu"}</span>
            <span className="relative block h-5 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-[4px]"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-in-out ${
                  isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-[14px]"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {isSearchOpen || isOpen ? (
        <div className="pointer-events-none absolute left-0 top-full z-40 w-full min-[1025px]:hidden">
          {isSearchOpen ? (
            <div
              id="mobile-search"
              className="pointer-events-auto border-t border-[color:rgba(75,54,33,0.15)] bg-[var(--color-surface)]/96 px-4 py-3 min-[769px]:hidden backdrop-blur"
            >
              <SearchField value={searchValue} onChange={setSearchValue} placeholder="Buscar..." autoFocus />
            </div>
          ) : null}

          {isOpen ? (
            <div
              id="mobile-menu"
              className="pointer-events-auto border-t border-[color:rgba(75,54,33,0.15)] bg-[var(--color-surface)]/96 backdrop-blur"
            >
              <NavLinks
                items={navItems}
                listClassName="flex flex-col px-4 py-2"
                linkClassName="block rounded-md px-3 py-2 text-center text-sm no-underline transition-colors"
                isItemActive={isItemActive}
                onItemClick={handleItemClick}
              />
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}

type SearchFieldProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  autoFocus?: boolean;
};

function SearchField({ value, onChange, placeholder, className, autoFocus = false }: SearchFieldProps) {
  return (
    <form
      role="search"
      className={className}
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="relative">
        <button
          type="submit"
          aria-label="Buscar"
          className="absolute left-2.5 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-surface)] transition-opacity hover:opacity-90"
        >
          <SearchIcon className="h-4 w-4" />
        </button>
        <input
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="h-11 w-full rounded-full border border-[color:rgba(75,54,33,0.2)] bg-[var(--color-surface)] pl-12 pr-4 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[color:rgba(75,54,33,0.55)] focus:border-[var(--color-accent)]"
        />
      </div>
    </form>
  );
}

type NavLinksProps = {
  items: NavItem[];
  listClassName: string;
  linkClassName: string;
  isItemActive: (href: string) => boolean;
  onItemClick: (href: string) => void;
};

function NavLinks({
  items,
  listClassName,
  linkClassName,
  isItemActive,
  onItemClick,
}: NavLinksProps) {
  return (
    <ul className={listClassName}>
      {items.map((item) => {
        const isActive = isItemActive(item.href);
        const stateClassName = isActive
          ? "bg-[color:rgba(96,108,56,0.24)] font-semibold"
          : "font-medium hover:bg-[color:rgba(96,108,56,0.12)] hover:text-[var(--color-accent)]";

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`${linkClassName} ${stateClassName}`}
              style={{
                color: isActive ? "var(--color-accent)" : "var(--color-text-primary)",
              }}
              onClick={() => onItemClick(item.href)}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function PlantLogo() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="plant-logo shrink-0"
    >
      <path d="M32 54V30" stroke="var(--color-text-primary)" strokeWidth="4" strokeLinecap="round" />
      <path
        className="plant-leaf leaf-base-left"
        d="M32 35C22 34 16 26 14 15C25 17 33 23 32 35Z"
        fill="var(--color-accent)"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="plant-leaf leaf-base-right"
        d="M32 35C42 34 48 26 50 15C39 17 31 23 32 35Z"
        fill="var(--color-accent)"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="plant-leaf leaf-extra-left"
        d="M31 30C24 29 20 24 19 16C26 18 31 23 31 30Z"
        fill="var(--color-accent)"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="plant-leaf leaf-extra-right"
        d="M33 30C40 29 44 24 45 16C38 18 33 23 33 30Z"
        fill="var(--color-accent)"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        className="plant-leaf leaf-extra-top"
        d="M32 25C28 21 27 15 32 9C37 15 36 21 32 25Z"
        fill="var(--color-accent)"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <ellipse cx="32" cy="55" rx="10" ry="3.5" fill="var(--color-text-primary)" opacity="0.2" />
    </svg>
  );
}

type SearchIconProps = {
  className?: string;
};

function SearchIcon({ className }: SearchIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
