import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { nextReservationDates } from "../utils/date";
import { fadeUp, stagger } from "../utils/motion";

export default function ReservePage({ config, setPage }) {
  const dateOptions = useMemo(() => nextReservationDates(7, config.dates), [config.dates]);
  const timeOptions = ["13:00", "14:30", "18:30", "20:00", "21:30"];
  const [selectedDate, setSelectedDate] = useState(dateOptions[0].value);
  const [selectedTime, setSelectedTime] = useState(timeOptions[2]);
  const [guests, setGuests] = useState(2);
  const selectedDateLabel = dateOptions.find((date) => date.value === selectedDate)?.label || config.dates.today;
  const guestLabel = guests === 1 ? config.reservePage.guest : config.reservePage.guests;

  return (
    <main className="reserve-page">
      <section className="reserve-hero">
        <div className="reserve-hero-media">
          <img src="/images/sama/hero-luxury-optimized.jpg" alt={config.reservePage.imageAlt} width="1672" height="941" loading="lazy" decoding="async" />
        </div>
        <motion.div className="reserve-hero-copy" variants={stagger} initial="hidden" animate="show">
          <motion.button className="back-link" variants={fadeUp} onClick={() => setPage("home")}>{config.reservePage.back}</motion.button>
          <motion.span variants={fadeUp}>{config.reservePage.eyebrow}</motion.span>
          <motion.h1 variants={fadeUp}>{config.reservePage.title}</motion.h1>
          <motion.p variants={fadeUp}>{config.reservePage.copy}</motion.p>
        </motion.div>
      </section>

      <section className="reserve-layout">
        <form className="sharp-reserve-form" onSubmit={(event) => event.preventDefault()}>
          <div className="sharp-form-head">
            <span>{config.reservePage.quick}</span>
            <strong>{selectedDateLabel} / {selectedTime} / {guests} {guestLabel}</strong>
          </div>

          <div className="quick-contact">
            <label>
              {config.reservePage.name}
              <input type="text" placeholder={config.reservePage.namePlaceholder} required />
            </label>
            <label>
              {config.reservePage.phone}
              <input type="tel" placeholder={config.reservePage.phonePlaceholder} required />
            </label>
          </div>

          <div className="quick-reserve-row">
            <label className="quick-select">
              {config.reservePage.date}
              <select value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)}>
              {dateOptions.map((date) => (
                <option key={date.value} value={date.value}>
                  {date.label}
                </option>
              ))}
              </select>
            </label>

            <label className="quick-select">
              {config.reservePage.time}
              <select value={selectedTime} onChange={(event) => setSelectedTime(event.target.value)}>
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
              </select>
            </label>

            <div className="sharp-stepper">
              <span>{config.reservePage.guests}</span>
              <div>
                <button type="button" onClick={() => setGuests((value) => Math.max(1, value - 1))}>-</button>
                <strong>{guests}</strong>
                <button type="button" onClick={() => setGuests((value) => Math.min(8, value + 1))}>+</button>
              </div>
            </div>
          </div>

          <button className="sharp-submit" type="submit">{config.reservePage.submit}</button>
        </form>

        <aside className="reserve-map-panel">
          <span>{config.reservePage.location}</span>
          <h2>{config.brand.location}</h2>
          <p>{config.reservePage.locationCopy}</p>
          <div className="reserve-location-actions">
            <a href={`tel:${config.brand.phone.replace(/\s/g, "")}`}>{config.reservePage.call}</a>
            <a href="https://www.google.com/maps/place/Sama/@41.6521875,41.6334375,17z" target="_blank" rel="noreferrer">{config.reservePage.directions}</a>
          </div>
          <iframe
            title={config.reservePage.mapTitle}
            src="https://www.google.com/maps?q=41.6521875,41.6334375&z=17&output=embed"
            loading="lazy"
            width="600"
            height="260"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </aside>
      </section>
    </main>
  );
}
