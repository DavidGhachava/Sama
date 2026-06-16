import { motion } from "framer-motion";
import { fadeUp, stagger } from "../utils/motion";

export default function Hero({ config, setPage, onReserve }) {
  return (
    <section className="sama-hero" id="home">
      <div className="hero-media">
        <img src={config.brand.heroImage} alt={config.hero.imageAlt} width="1672" height="941" fetchPriority="high" decoding="async" />
      </div>
      <motion.div className="hero-copy-block" variants={stagger} initial="hidden" animate="show">
        <motion.span variants={fadeUp}>{config.hero.eyebrow}</motion.span>
        <motion.h1 variants={fadeUp}>SAMA</motion.h1>
        <motion.p variants={fadeUp}>{config.hero.copy}</motion.p>
        <motion.div className="hero-mobile-points" variants={fadeUp}>
          {config.hero.points.map((point) => <span key={point}>{point}</span>)}
        </motion.div>
        <motion.div className="hero-buttons" variants={fadeUp}>
          <button className="primary-action" onClick={onReserve}>{config.hero.reserve}</button>
          <button className="secondary-action" onClick={() => setPage("menu")}>{config.hero.menu}</button>
        </motion.div>
      </motion.div>
      <motion.div className="hero-meta" variants={stagger} initial="hidden" animate="show">
        {config.notes.map((note) => (
          <motion.div variants={fadeUp} key={note.value}>
            <strong>{note.value}</strong>
            <span>{note.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
