import { motion } from "framer-motion";
import { languageOptions } from "../data/samaConfig";

export default function LanguageModal({ config, onChoose }) {
  return (
    <div className="language-modal-backdrop">
      <motion.div className="language-modal" initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }}>
        <span>SAMA</span>
        <h2>{config.language.title}</h2>
        <p>{config.language.copy}</p>
        <div>
          {languageOptions.map((option) => (
            <button key={option.code} type="button" onClick={() => onChoose(option.code)}>
              <strong>{option.short}</strong>
              <span>{config.language[option.labelKey]}</span>
            </button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
