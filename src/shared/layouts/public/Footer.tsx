import smoothScrollTo from "@/shared/lib/smoothScrollTo";

const Footer = () => {
  return (
    <footer className="relative mt-5 bg-[#1c2d56] py-5 text-white md:p-8" id="contact">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-2 md:flex-row md:gap-16">
        <div className="flex-1">
          <div className="text-sm leading-relaxed">
            <a
              href="#"
              className="mb-2 hover:text-[#efd62e] hover:no-underline"
              onClick={(event) => {
                event.preventDefault();
                smoothScrollTo("HOME", 800);
              }}
            >
              AROY THAI
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 md:flex-row md:gap-16">
        <div className="flex-1">
          <b className="mb-2 block">CONTACT US</b>
          <div className="text-sm leading-relaxed">
            <p>
              To place an order , message/ text us D&A
              <a
                className="transition-colors hover:text-[#efd62e]"
                onClick={() =>
                  window.open(
                    "https://www.facebook.com/profile.php?id=61577317643456",
                    "_blank",
                  )
                }
              >
                @ facebook A Roy Thai Food
              </a>
            </p>
          </div>
          <div className="text-sm leading-relaxed">
            <p>phone : 507-398-8077</p>
          </div>
        </div>
        <div className="flex-1">
          <b className="mb-2 block">HOURS</b>
          <div className="text-sm leading-relaxed">
            OPEN EVERY DAY: 12PM - 11PM (LAST ORDER 10:30PM)
            <br />
            AFTERNOON TEA: 2:30PM - 5:30PM
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
