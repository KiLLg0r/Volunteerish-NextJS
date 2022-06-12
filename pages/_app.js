import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/layout";
import AuthStateChanged from "../components/AuthStateChanged";
import UserDataChanges from "../components/UserDataChanges";

import { NextUIProvider, createTheme } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const lightTheme = createTheme({
    type: "light",
    theme: {
      colors: {
        background: "#ffffff",
        backgroundSecondary: "#eaeaeb",
        text: "#20232a",
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
        accents0: "#eaeaeb",
        accents2: "#d4d5d6",
        gradient: "linear-gradient(to top left, $red200, $red400)",
      },
      space: {
        5: "1rem",
      },
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
        gradient: "linear-gradient(to top left, $red200, $red400)",
      },
      space: {
        5: "1rem",
      },
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
        <AuthProvider initialUserData={pageProps?.initialUserData} users={pageProps?.users}>
          <Layout>
            <AuthStateChanged>
              <UserDataChanges>
                <Component {...pageProps} />
              </UserDataChanges>
            </AuthStateChanged>
          </Layout>
        </AuthProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default MyApp;
