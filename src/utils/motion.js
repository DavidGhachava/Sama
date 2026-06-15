export const fadeUp = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11 } },
};

export const imageLift = {
  rest: { scale: 1 },
  hover: { scale: 1.045, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};
