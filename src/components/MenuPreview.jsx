import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { fadeUp, stagger } from "../utils/motion";

export default function MenuPreview({ config, setPage }) {
  return (
    <section className="section-shell menu-preview" id="menu-preview">
      <SectionIntro
        eyebrow={config.menuIntro.eyebrow}
        title={config.menuIntro.title}
        copy={config.menuIntro.copy}
        align="center"
      />
      <motion.div className="preview-columns" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {config.menuCategories.map((category, categoryIndex) => (
          <motion.article className="preview-category" variants={fadeUp} key={categoryIndex}>
            <h3>{category.name}</h3>
            {category.items.slice(0, 2).map((item, itemIndex) => (
              <div className="preview-item" key={`${categoryIndex}-${item.image}-${itemIndex}`}>
                <img src={item.image} alt="" width="418" height="314" loading="lazy" decoding="async" />
                <span>{item.name}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </motion.article>
        ))}
      </motion.div>
      <button className="secondary-action center-action" onClick={() => setPage("menu")}>{config.menuIntro.button}</button>
    </section>
  );
}
