import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Work from "./components/Work";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Background3D from "./components/Background3D";
import Education from "./components/Education";
import Preloader from "./components/Preloader";
import BackToTop from "./components/BackToTop";
import GridBackground from "./components/GridBackground";
import StatsSection from "./components/StatsSection";

function App() {
  const [loading, setLoading] = useState(true);

  // Prevention of scroll during preloader
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [loading]);

  return (
    <div className="min-h-screen font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-500/30 dark:selection:text-indigo-200 cursor-none">
      <AnimatePresence mode="wait">
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <CustomCursor />
      <Background3D />
      <GridBackground />
      <BackToTop />
      <Header />
      <main>
        <Hero />
        <Work />
        <Education />
        <About />
        <StatsSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
