import ToggleTheme from "components/ToggleTheme";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Stepper from "components/Stepper";
import { motion, AnimatePresence } from "framer-motion";
import useSignup from "hooks/useSignup";
import { getInputVariants, errorVariants } from "utils/AnimationVariants";
import { Link } from "react-router-dom";
const Signup = () => {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const inputVariants = getInputVariants(direction);

  useEffect(() => {
    if (direction === 1) {
      setActive((prev) => prev + 1);
    }

    if (direction === -1) {
      setActive((prev) => prev - 1);
    }

    setTimeout(() => {
      setDirection(0);
    }, 300);
  }, [direction]);

  useEffect(() => {
    setTimeout(() => {
      setDisableButton(0);
    }, 300);
  }, [disableButton]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "all" });

  const { errors: err, signup } = useSignup();

  let isValid =
    (active === 0 && !errors.fullName) ||
    (active === 1 && !errors.username) ||
    (active === 2 && !errors.gender) ||
    (active === 3 && !errors.password) ||
    (active === 4 && !errors.confirmPassword);

  const onSubmit = async (data) => {
    setDisableButton(true);
    await signup(data);
    setDisableButton(false);
  };

  useEffect(() => {
    if (!err) return;
    console.log(err.field);
    switch (err.field) {
      case "username":
        setActive(1);
        break;
      case "confirmPassword":
        setActive(4);
        break;
      default:
        break;
    }
  }, [err]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <span className="absolute top-2 right-2">
        <ToggleTheme />
      </span>
      <Stepper
        steps={[
          "Enter Full Name",
          "Choose Username",
          "Choose Gender",
          "Enter Password",
          "Confirm Password",
        ]}
        active={active}
      />
      <form
        className="p-8 rounded shadow-xxl w-96"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="mb-6 text-4xl text-center">Sign Up</h1>

        <div className="relative h-[76px]">
          <AnimatePresence>
            {active === 0 && (
              <motion.div
                className="absolute w-[100%]"
                key={"fullname-input"}
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <label
                  className="block mb-2 text-sm font-bold "
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  className="input input-bordered border-slate-500 focus:input-primary w-full max-w-xs"
                  type="text"
                  placeholder="Fullname"
                  autoFocus
                  {...register("fullName", {
                    required: "Please enter your fullname",
                  })}
                />
              </motion.div>
            )}

            {active === 1 && (
              <motion.div
                className="absolute w-[100%]"
                key={"username-input"}
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <label
                  className="block mb-2 text-sm font-bold "
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  className="input input-bordered border-slate-500 focus:input-primary w-full max-w-xs"
                  type="text"
                  placeholder="Username"
                  autoFocus
                  {...register("username", {
                    required: "Please enter a username",
                    pattern: {
                      value: /^[a-zA-Z0-9_-]+$/,
                      message:
                        "Username can only contain letters, numbers, underscores, and hyphens",
                    },
                    validate: async (value) => {
                      if (value === "") return true;
                      const response = await fetch(`/api/users/${value}`);
                      const data = await response.json();
                      return data.available || "Username already exists";
                    },
                  })}
                />
              </motion.div>
            )}

            {active === 2 && (
              <motion.div
                className="absolute w-[100%] flex justify-between h-full"
                key={"gender-input"}
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <label className="label cursor-pointer p-2 w-[110px]">
                  <span className="label-text text-lg">Male</span>
                  <input
                    type="radio"
                    {...register("gender", { required: "Please select" })}
                    className="radio checked:bg-primary"
                    value={"male"}
                    autoFocus
                  />
                </label>

                <label className="label cursor-pointer p-2 w-[110px]">
                  <span className="label-text text-lg">Female</span>
                  <input
                    type="radio"
                    {...register("gender")}
                    className="radio checked:bg-pink-500"
                    value={"female"}
                  />
                </label>
              </motion.div>
            )}

            {active === 3 && (
              <motion.div
                className="absolute w-[100%]"
                key={"password-input"}
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <label
                  className="block mb-2 text-sm font-bold "
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="input input-bordered border-slate-500 focus:input-primary w-full max-w-xs"
                  type="password"
                  placeholder="Password"
                  autoFocus
                  {...register("password", {
                    required: "Please enter a password",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
              </motion.div>
            )}
            {active === 4 && (
              <motion.div
                className="absolute w-[100%]"
                key={"confirmPassword-input"}
                variants={inputVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <label
                  className="block mb-2 text-sm font-bold "
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  className="input input-bordered border-slate-500 focus:input-primary w-full max-w-xs"
                  type="password"
                  placeholder="Confirm Password"
                  autoFocus
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      watch("password") === value || "Password not match",
                  })}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ERRORS */}
        <div className="mt-1 text-xs text-red-500 ">
          <AnimatePresence>
            {active === 0 && errors.fullName && (
              <motion.p
                key={"fullName-error"}
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-0 overflow-hidden"
              >
                {errors.fullName.message}
              </motion.p>
            )}

            {active === 1 && errors.username && (
              <motion.div
                key={"username-error"}
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-0 overflow-hidden"
              >
                {errors.username.message}
              </motion.div>
            )}
            {active === 2 && errors.gender && (
              <motion.div
                key={"gender-error"}
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-0 overflow-hidden"
              >
                {errors.gender.message}
              </motion.div>
            )}
            {active === 3 && errors.password && (
              <motion.div
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-0 overflow-hidden"
              >
                {errors.password.message}
              </motion.div>
            )}
            {active === 4 && errors.confirmPassword && (
              <motion.div
                variants={errorVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="h-0 overflow-hidden"
              >
                {errors.confirmPassword.message}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="flex items-center justify-between mt-4 gap-4">
          {active > 0 && (
            <button
              className="btn border-slate-500 hover:border-primary"
              type="button"
              disabled={disableButton}
              onClick={() => {
                setDirection(-1);
                setDisableButton(true);
              }}
            >
              Back
            </button>
          )}

          {active < 4 && (
            <button
              className="btn btn-primary flex-1  disabled:border-slate-600"
              type="button"
              disabled={!isValid || disableButton}
              onClick={() => {
                setDirection(1);
                setDisableButton(true);
              }}
            >
              Next
            </button>
          )}

          {active === 4 && (
            <button
              className="btn btn-primary flex-1 disabled:border-slate-600"
              type="submit"
              disabled={!isValid || disableButton}
            >
              Create My Account
            </button>
          )}
        </div>
        <div className="my-2">
          <Link to="/login" className="link-primary ">
            I already have an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
