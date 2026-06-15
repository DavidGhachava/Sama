export function todayISO() {
  return new Date().toISOString().split("T")[0];
}

export function nextReservationDates(days = 21, dates = { today: "Today", tomorrow: "Tomorrow", locale: "en" }) {
  const formatter = new Intl.DateTimeFormat(dates.locale || "en", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    const value = date.toISOString().split("T")[0];
    const prefix = index === 0 ? dates.today : index === 1 ? dates.tomorrow : formatter.format(date);
    return { label: prefix, value };
  });
}
