import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import "./App.css";
import Landing from "./components/landing/Landing";
import ParticleBackground from "./components/animation/ParticleBackground";

const App = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
    });

    lenisRef.current = lenis;

    lenis.stop();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const timer = setTimeout(() => {
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    }, 900);

    return () => {
      lenis.destroy();
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="main-wrapper">
      <div className="animation">
        <ParticleBackground />
      </div>

      <div>
        {/* main page */}
        <Landing />
      </div>
    </div>
  );
};

export default App;
