export const getInputVariants = (direction) => ({
  initial: { opacity: 0, x: direction * 70 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: direction * -70 },
});

export const errorVariants = {
  initial: { height: 0, opacity: 0, y: -20 },
  animate: { height: "fit-content", opacity: 1, y: 0 },
  exit: { height: 0, opacity: 0, y: 5 },
};
