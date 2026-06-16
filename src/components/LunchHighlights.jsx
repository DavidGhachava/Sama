import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { fadeUp, imageLift, stagger } from "../utils/motion";

export default function LunchHighlights({ config }) {
  return (
    <section className="section-shell" id="lunch">
      <SectionIntro
        eyebrow={config.lunchIntro.eyebrow}
        title={config.lunchIntro.title}
        copy={config.lunchIntro.copy}
      />
      <motion.div className="lunch-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {config.lunchSets.map((set) => (
          <motion.article className="lunch-card" variants={fadeUp} key={set.image}>
            <motion.img src={set.image} alt={set.name} width="418" height="314" loading="lazy" decoding="async" variants={imageLift} initial="rest" whileHover="hover" />
            <div className="lunch-panel">
              <span>{set.note}</span>
              <h3>{set.name}</h3>
              <ul>
                {set.items.map((item, index) => <li key={`${set.image}-${index}`}>{item}</li>)}
              </ul>
              <strong>{set.price}</strong>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
