import SectionIntro from "./SectionIntro";

export default function Visit({ config, onReserve }) {
  return (
    <section className="section-shell visit-section" id="visit">
      <SectionIntro eyebrow={config.visit.eyebrow} title={config.visit.title} copy={config.visit.copy} />
      <div className="visit-grid">
        <div className="visit-card">
          <span>{config.visit.address}</span>
          <strong>{config.brand.location}</strong>
          <p>{config.visit.description}</p>
          <div className="visit-actions">
            <a className="secondary-action" href={`tel:${config.brand.phone.replace(/\s/g, "")}`}>{config.visit.call}</a>
            <button className="primary-action" onClick={onReserve}>{config.visit.reserve}</button>
          </div>
        </div>
        <div className="map-card">
          <iframe
            title={`${config.visit.maps} ${config.brand.location}`}
            src="https://www.google.com/maps?q=41.6521875,41.6334375&z=17&output=embed"
            loading="lazy"
            width="600"
            height="300"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div>
            <strong>{config.visit.maps}</strong>
            <span>{config.brand.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
