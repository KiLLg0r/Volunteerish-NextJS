import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/layout";
import AuthStateChanged from "../components/AuthStateChanged";

import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {
        background: "#aeaeaeb",
        backgroundSecondary: "#bfc0c2",
        text: "#20232",
        textSecondary: "#282c34",
        red50: "#4c1b1b",
        red100: "#4c1b1b",
        red200: "#662424",
        red300: "#993636",
        red400: "#cc4848",
        red500: "#ff5a5a",
        red600: "#ff6b6b",
        red700: "#ff7b7b",
        red800: "#ff9c9c",
        red900: "#ffcece",
        accents0: "#bfc0c2",
        accents2: "#d4d5d6",
      },
      space: {},
      fonts: {},
    },
  });

  const darkTheme = createTheme({
    type: "dark",
    theme: {
      colors: {
        background: "#20232a",
        backgroundSecondary: "#282c34",
        text: "#eaeaeb",
        textSecondary: "#bfc0c2",
        red50: "#4c1b1b",
        red100: "#4c1b1b",
        red200: "#662424",
        red300: "#993636",
        red400: "#cc4848",
        red500: "#ff5a5a",
        red600: "#ff6b6b",
        red700: "#ff7b7b",
        red800: "#ff9c9c",
        red900: "#ffcece",
        accents0: "#282c34",
        accents2: "#d4d5d6",
      },
      space: {},
      fonts: {},
    },
  });

  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme,
        dark: darkTheme,
      }}
    >
      <NextUIProvider>
        <AuthProvider>
          <Layout>
            <AuthStateChanged>
              <Component {...pageProps} />
            </AuthStateChanged>
          </Layout>
        </AuthProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
