import { useState } from "react";
import useAuthStore from "stores/AuthStore";
import toast from "react-hot-toast";

const useLogin = () => {
  const [errors, setErrors] = useState(null);

  const loginUser = useAuthStore((state) => state.login);

  const login = async (data) => {
    setErrors(null);
    const success = handleValidation(data);

    if (!success) return;

    const tlId = toast.loading("Logging in...");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast.dismiss(tlId);
    if (res.ok) {
      const resData = await res.json();
      console.log(resData.user);
      // set user in store
      loginUser(resData.user);
      toast.success("Welcome back!");
    } else {
      const err = await res.json();
      console.log(err);
      setErrors(err);
      toast.error(err.message);
    }
  };

  return { errors, login };
};

export default useLogin;

const handleValidation = ({ username, password }) => {
  if (!username || !password) {
    toast.error("All fields are required");
    return false;
  }
  return true;
};
