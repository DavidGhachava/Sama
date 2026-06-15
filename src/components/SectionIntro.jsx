import { motion } from "framer-motion";
import { fadeUp } from "../utils/motion";

export default function SectionIntro({ eyebrow, title, copy, align = "left" }) {
  return (
    <motion.div
      className={`section-intro section-intro--${align}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-12% 0px" }}
    >
      <span>{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </motion.div>
  );
}
