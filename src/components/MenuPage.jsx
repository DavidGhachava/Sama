import { motion } from "framer-motion";
import { fadeUp, stagger } from "../utils/motion";

export default function MenuPage({ config, setPage, onReserve }) {
  return (
    <main className="menu-page">
      <section className="menu-hero">
        <button className="back-link" onClick={() => setPage("home")}>{config.menuPage.back}</button>
        <span>{config.menuPage.eyebrow}</span>
        <h1>{config.menuPage.title}</h1>
        <p>{config.menuPage.copy}</p>
      </section>

      <motion.section className="full-menu-grid" variants={stagger} initial="hidden" animate="show">
        {config.menuCategories.map((category) => (
          <motion.div className="menu-category-block" variants={fadeUp} key={category.name}>
            <h2>{category.name}</h2>
            <div className="menu-card-list">
              {category.items.map((item) => (
                <article className="full-menu-item" key={item.name}>
                  <div className="menu-thumb">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    <div className="card-row">
                      <h3>{item.name}</h3>
                      <strong>{item.price}</strong>
                    </div>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.section>

      <section className="menu-cta">
        <h2>{config.menuPage.ctaTitle}</h2>
        <p>{config.menuPage.ctaCopy}</p>
        <button className="primary-action" onClick={onReserve}>{config.menuPage.ctaButton}</button>
      </section>
    </main>
  );
}
