import { motion } from "framer-motion";
import SectionIntro from "./SectionIntro";
import { fadeUp, stagger } from "../utils/motion";

export default function Gallery({ config }) {
  return (
    <section className="section-shell" id="gallery">
      <SectionIntro
        eyebrow={config.galleryIntro.eyebrow}
        title={config.galleryIntro.title}
        copy={config.galleryIntro.copy}
      />
      <motion.div className="sama-gallery" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
        {config.gallery.map((image, index) => (
          <motion.figure
            className={index === 0 ? "wide" : ""}
            variants={fadeUp}
            whileHover={{ y: -8, scale: 1.018 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            key={image}
          >
            <img src={image} alt={`${config.galleryIntro.alt} ${index + 1}`} />
          </motion.figure>
        ))}
      </motion.div>
    </section>
  );
}
