import ToggleTheme from "components/ToggleTheme";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { errorVariants } from "utils/AnimationVariants";
import useLogin from "hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "all" });
  const { login, errors: err } = useLogin();

  const onSubmit = (data) => {
    login(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="absolute top-2 right-2">
        <ToggleTheme />
      </span>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-8 rounded shadow-xxl w-96"
      >
        <h1 className="mb-6 text-4xl text-center">Login</h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-4"
        >
          <label className="block mb-2 text-sm font-bold " htmlFor="username">
            Username
          </label>
          <input
            className="input input-bordered mb-1 border-slate-500 focus:input-primary w-full max-w-xs"
            type="text"
            placeholder="Username"
            {...register("username", {
              required: "Please enter your username",
            })}
            autoFocus
          />
          <AnimatePresence>
            {errors.username && (
              <motion.p
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-red-500 text-sm"
              >
                {errors.username.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="mb-6"
        >
          <label className="block mb-2 text-sm font-bold " htmlFor="password">
            Password
          </label>
          <input
            className="input input-bordered mb-1 border-slate-500 focus:input-primary w-full max-w-xs"
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Please enter your password",
            })}
          />
          <AnimatePresence>
            {errors.password && (
              <motion.p
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: "fit-content", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: 5 }}
                className="text-red-500 text-sm"
              >
                {errors.password.message}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="mb-6">
          <Link to="/signup" className="link-primary ">
            I don't have an account
          </Link>
        </div>
        <div className="flex items-center justify-between">
          <button className="btn btn-primary w-full" type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
