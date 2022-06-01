import "../styles/globals.css";
import { AuthProvider } from "../context/AuthContext";
import Layout from "../components/layout";
import AuthStateChanged from "./AuthStateChanged";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AuthStateChanged>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthStateChanged>
    </AuthProvider>
  );
}

export default MyApp;
