import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { fadeUp, imageLift, stagger } from "../utils/motion";

export default function FeaturedDishes({ config }) {
  return (
    <section className="section-shell">
      <SectionIntro
        eyebrow={config.featuredIntro.eyebrow}
        title={config.featuredIntro.title}
        copy={config.featuredIntro.copy}
      />
      <motion.div className="dish-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {config.featured.map((dish) => (
          <motion.article className="premium-card" variants={fadeUp} key={dish.name}>
            <div className="premium-image">
              <motion.img src={dish.image} alt={dish.name} variants={imageLift} initial="rest" whileHover="hover" />
              <span>{dish.tag}</span>
            </div>
            <div>
              <div className="card-row">
                <h3>{dish.name}</h3>
                <strong>{dish.price}</strong>
              </div>
              <p>{dish.description}</p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
