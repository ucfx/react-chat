import { Hamburger, XMark } from "assets/svg";
const Burger = () => {
  return (
    <label
      className="btn btn-circle swap swap-rotate bg-base-300
      hover:bg-base-100 border-transparent"
    >
      <input type="checkbox" />
      <Hamburger />
      <XMark />
    </label>
  );
};

export default Burger;
