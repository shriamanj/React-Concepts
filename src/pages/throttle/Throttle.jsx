import { useEffect, useState } from "react";

// Throttle function
function throttle(func, delay) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
}

export default function ScrollThrottleDemo() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY);
    }, 200); // throttled to update at most every 200ms

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-[200vh] bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white shadow p-4 rounded">
        <h1 className="text-lg font-bold text-gray-700">
          Throttled Scroll Y: {scrollY}px
        </h1>
      </div>

      <div className="mt-40 px-7 text-center text-xl text-gray-600">
        Scroll down to see the throttled scroll position update.
      </div>
    </div>
  );
}
