const Header = () => {
  return (
    // <header className="flex justify-between items-center px-12 py-8 bg-[#c8d7b5]">
    // <header className="flex justify-between items-center px-12 py-8 bg-white">
    // <header className="flex justify-between items-center px-12 py-8 bg-gradient-to-b from-[#d0f79e] to-[#f8f7e7]">

    <header className="flex flex-col md:flex-row justify-between items-center px-4 md:px-40 py-5  bg-[#fff]">
      <div className="text-2xl md:text-3xl font-bold tracking-widest flex items-center mb-4 md:mb-0">
        <span className="text-[#efd62e] font-sans px-1">A ROY</span>
        <span className="ml-2">THAIFOOD</span>
      </div>
      <nav className="flex gap-6 ">
        <a
          href="#"
          className="text-base font-medium text-[#000000cc] hover:text-[#efd62e] transition-colors"
        >
          HOME
        </a>
        <a
          href="#"
          className="text-base font-medium text-[#000000cc] hover:text-[#efd62e] transition-colors"
        >
          MENU
        </a>
        <a
          href="#"
          className="text-base font-medium text-[#000000cc] hover:text-[#efd62e] transition-colors"
        >
          SPECIALS
        </a>
        <a
          href="#"
          className="text-base font-medium text-[#000000cc] hover:text-[#efd62e] transition-colors"
        >
          CONTACT
        </a>
      </nav>
    </header>
  );
};

export default Header;
