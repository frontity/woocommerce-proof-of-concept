import WooCommerceTheme from "./../types";
import Theme from "./components";
import link from "@frontity/html2react/processors/link";

const wooCommerceTheme: WooCommerceTheme = {
  name: "woocommerce-theme",
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      autoPrefetch: "no",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    },
  },
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
    },
  },
  libraries: {
    html2react: {
      processors: [link],
    },
  },
};

export default wooCommerceTheme;
