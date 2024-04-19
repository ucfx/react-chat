import Signup from "pages/Signup";
import Login from "pages/Login";
import useThemeStore from "stores/ThemeStore";
import useAuthStore from "stores/AuthStore";
import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "components/Loader";
import Home from "pages/Home";
import Chat from "components/Chat";
import NoConversationSelected from "components/Chat/NoConversationSelected";

const App = () => {
  const theme = useThemeStore((state) => state.theme);
  const authUser = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);

  return (
    <div className=" h-[100vh] flex justify-center items-center relative">
      <Loader loading={loading} />

      {!loading && (
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          >
            <Route path="/" element={<NoConversationSelected />} index />
            <Route path="/:username" element={<Chat />} />
          </Route>
          <Route
            path="/login"
            element={authUser ? <Navigate to={"/"} /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to={"/"} /> : <Signup />}
          />
        </Routes>
      )}

      <Toaster
        toastOptions={{
          className: theme === "dark" ? "bg-neutral text-neutral-content" : "",
          style: {
            boxShadow:
              "0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05),0 0 10px rgba(0, 0, 0,0.15)",
          },
        }}
      />
    </div>
  );
};
export default App;
