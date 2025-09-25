import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ smooth = true }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const navbar = document.querySelector("header");
    const navbarHeight = navbar ? navbar.offsetHeight : 80;

    const scrollToElement = () => {
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
          window.scrollTo({ top: y, behavior: smooth ? "smooth" : "auto" });
        }
      } else {
        window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
      }
    };

    if (hash) {
      // Delay scroll to ensure page content is rendered
      setTimeout(scrollToElement, 0);
    } else {
      scrollToElement();
    }
  }, [pathname, hash, smooth]);

  return null;
};

export default ScrollToTop;