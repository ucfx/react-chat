const Stepper = ({ steps, active }) => {
  return (
    <div className={"mb-11 flex flex-col"}>
      <ul className="steps w-full min-h-[64px]">
        {steps.map((step, index) => {
          return (
            <li
              key={index}
              className={`w-[100px] step ${
                index <= active ? "step-primary" : ""
              } `}
            >
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Stepper;
