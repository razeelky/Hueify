import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import { ThemeProvider } from "./components/theme-provider";
import { UserProvider } from "./context/userContext";
import PrivateRoute from "./components/PrivateRoute";
import ColorPicker from "./pages/ColorPicker";
import Image from "./pages/Image";
import CarModel from "./pages/CarModel";
import ColorHistory from "./pages/HistoryPage";
import TshirtModel from "./pages/TshirtModel";
import HomeModelPage from "./pages/HomeModel.jsx";
import HelpPage from "./pages/HelpPage.jsx";
import Layout from "./components/Layout";

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Layout fullBleed><HomePage /></Layout>} />
          <Route path="/sign-in" element={<Layout><LoginPage /></Layout>} />
          <Route path="/sign-up" element={<Layout><SignUpPage /></Layout>} />
          <Route path="/image" element={<Layout><Image /></Layout>} />
          <Route path="/help" element={<Layout><HelpPage /></Layout>} />
          <Route element={<PrivateRoute />}>
            <Route path="/colors" element={<Layout><ColorPicker /></Layout>} />
            <Route path="/history" element={<Layout><ColorHistory /></Layout>} />
            <Route path="/3d-car" element={<Layout><CarModel /></Layout>} />
            <Route path="/3d-tshirt" element={<Layout><TshirtModel /></Layout>} />
            <Route path="/3d-home" element={<Layout><HomeModelPage /></Layout>} />
          </Route>
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
