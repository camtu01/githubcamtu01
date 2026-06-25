import { useState, useEffect } from 'react';
import { Phone, Award, Menu, X, Landmark, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onAdminToggle: () => void;
  isAdminMode: boolean;
}

export default function Header({ onAdminToggle, isAdminMode }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Giới thiệu', href: '#intro' },
    { label: 'Sản phẩm', href: '#products' },
    { label: 'Công cụ tính', href: '#calculators' },
    { label: 'Đặt lịch tư vấn', href: '#booking' },
  ];

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3 text-slate-800 border-b border-blue-50'
          : 'bg-gradient-to-b from-blue-900/60 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand/Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white p-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center">
              <img
                id="header-logo-icon"
                src="https://upload.wikimedia.org/wikipedia/vi/thumb/3/37/Logo_VietinBank.svg/320px-Logo_VietinBank.svg.png"
                alt="VietinBank Logo"
                className="h-8 sm:h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="text-xs bg-red-500 text-white font-bold px-1.5 py-0.5 rounded shadow-sm">Bến Lức</span>
              </div>
              <p className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-mono font-bold mt-1 ${isScrolled ? 'text-slate-500' : 'text-slate-200'}`}>
                Nâng giá trị cuộc sống
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className={`font-sans text-sm font-medium transition-colors hover:text-red-500 cursor-pointer ${
                  isScrolled ? 'text-slate-700' : 'text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Admin toggle for Mrs. Cẩm Tú */}
            <button
              id="admin-toggle-btn"
              onClick={onAdminToggle}
              className={`flex items-center space-x-1 text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                isAdminMode
                  ? 'bg-amber-500 text-white shadow-sm'
                  : isScrolled
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
              }`}
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>{isAdminMode ? 'Thoát Quản Trị' : 'Góc Quản Lý'}</span>
            </button>

            <a
              id="header-phone-call"
              href="tel:0908123456"
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
            >
              <Phone className="h-4 w-4 animate-pulse" />
              <span>Hotline 24/7</span>
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              id="admin-toggle-btn-mobile"
              onClick={onAdminToggle}
              className={`p-1.5 rounded-full ${
                isAdminMode ? 'bg-amber-500 text-white' : isScrolled ? 'bg-slate-100 text-slate-700' : 'bg-white/10 text-white'
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-slate-800' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div id="mobile-nav" className="md:hidden bg-white border-b border-slate-200 py-4 px-4 shadow-lg animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-left font-sans text-base font-medium text-slate-800 hover:text-red-500 py-1"
              >
                {item.label}
              </button>
            ))}
            <hr className="border-slate-100" />
            <div className="flex flex-col space-y-2">
              <button
                id="admin-toggle-btn-mobile-drawer"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onAdminToggle();
                }}
                className={`flex items-center justify-center space-x-2 w-full py-2 rounded-lg text-sm font-medium ${
                  isAdminMode ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-800'
                }`}
              >
                <ShieldCheck className="h-4 w-4" />
                <span>{isAdminMode ? 'Chế Độ Người Dùng' : 'Đăng Nhập Góc Quản Lý'}</span>
              </button>
              <a
                href="tel:0908123456"
                className="flex items-center justify-center space-x-2 w-full bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium"
              >
                <Phone className="h-4 w-4" />
                <span>Gọi Hotline: 0908.123.456</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
