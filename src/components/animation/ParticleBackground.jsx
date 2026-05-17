import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const isTouchDevice = () =>
  typeof window !== "undefined" &&
  (navigator.maxTouchPoints > 0 || "ontouchstart" in window);

const ParticleBackground = () => {
  const [init, setInit] = useState(false);
  const isTouch = isTouchDevice();

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: -1 },
      background: {
        color: { value: "#0F0F0F" },
      },
      particles: {
        number: {
          value: 100,
          density: { enable: true, area: 750 },
        },
        color: { value: "#7d7d7d" },
        shape: { type: "circle" },
        opacity: {
          value: 0.5,
          random: false,
        },
        size: {
          value: 2,
          random: true,
        },
        links: {
          enable: true,
          distance: 150,
          color: "#f3f3f3",
          opacity: 0.2,
          width: 1,
        },
        move: {
          enable: true,
          speed: 4,
          direction: "none",
          outModes: { default: "out" },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: !isTouch,
            mode: "repulse",
          },
          onClick: {
            enable: !isTouch,
            mode: "push",
          },
        },
        modes: {
          repulse: { distance: 200, duration: 0.4 },
          push: { quantity: 4 },
        },
      },
      retina_detect: true,
    }),
    [isTouch],``
  );

  if (init) {
    return <Particles id="tsparticles" options={options} />;
  }

  return null;
};

export default ParticleBackground;
