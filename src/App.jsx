import { useMemo, useState } from "react";
import { samaConfigs } from "./data/samaConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LunchHighlights from "./components/LunchHighlights";
import FeaturedDishes from "./components/FeaturedDishes";
import MenuPreview from "./components/MenuPreview";
import Gallery from "./components/Gallery";
import Visit from "./components/Visit";
import MenuPage from "./components/MenuPage";
import ReservePage from "./components/ReservePage";
import Footer from "./components/Footer";
import LanguageModal from "./components/LanguageModal";

export default function App() {
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState(() => localStorage.getItem("sama-language") || "");
  const activeLanguage = language || "en";
  const samaConfig = useMemo(() => samaConfigs[activeLanguage], [activeLanguage]);
  const showLanguageModal = !language;

  const chooseLanguage = (code) => {
    localStorage.setItem("sama-language", code);
    setLanguage(code);
  };

  const openReservation = () => {
    setPage("reserve");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <Header config={samaConfig} language={activeLanguage} setLanguage={chooseLanguage} page={page} setPage={setPage} onReserve={openReservation} />
      {page === "menu" ? (
        <MenuPage config={samaConfig} setPage={setPage} onReserve={openReservation} />
      ) : page === "reserve" ? (
        <ReservePage config={samaConfig} setPage={setPage} />
      ) : (
        <main>
          <Hero config={samaConfig} setPage={setPage} onReserve={openReservation} />
          <LunchHighlights config={samaConfig} />
          <FeaturedDishes config={samaConfig} />
          <MenuPreview config={samaConfig} setPage={setPage} />
          <Gallery config={samaConfig} />
          <Visit config={samaConfig} onReserve={openReservation} />
        </main>
      )}
      <Footer config={samaConfig} />
      {showLanguageModal && <LanguageModal config={samaConfig} onChoose={chooseLanguage} />}
    </div>
  );
}
