import { useState } from "react";
import useAuthStore from "stores/AuthStore";
import toast from "react-hot-toast";
const useSignup = () => {
  const [errors, setErrors] = useState(null);

  const login = useAuthStore((state) => state.login);

  const signup = async (data, reset) => {
    const success = handleValidation(data);

    setErrors(null);
    if (!success) return;

    const tlId = toast.loading("Creating Account...");

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    toast.dismiss(tlId);
    if (res.ok) {
      const resData = await res.json();
      console.log(resData);
      // set user in store
      login(resData.user);

      toast.success("Account created successfully!");
    } else {
      const err = await res.json();
      console.log(err);
      setErrors(err);
      toast.error(err.message);
    }
  };

  return { errors, signup };
};

export default useSignup;

const handleValidation = ({
  fullName,
  username,
  gender,
  password,
  confirmPassword,
}) => {
  if (!fullName || !username || !gender || !password || !confirmPassword) {
    toast.error("All fields are required");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
};
