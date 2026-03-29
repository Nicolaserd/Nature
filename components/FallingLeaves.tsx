import { CSSProperties } from "react";

type LeafConfig = {
  left: number;
  delay: number;
  duration: number;
  size: number;
  drift: number;
  startRotate: number;
  endRotate: number;
  opacity: number;
};

type LeafStyle = CSSProperties & {
  "--leaf-left": string;
  "--leaf-delay": string;
  "--leaf-duration": string;
  "--leaf-size": string;
  "--leaf-drift": string;
  "--leaf-rotate-start": string;
  "--leaf-rotate-end": string;
  "--leaf-opacity": string;
};

const leaves: LeafConfig[] = [
  { left: 4, delay: -3.5, duration: 14.5, size: 12, drift: 28, startRotate: -18, endRotate: 110, opacity: 0.22 },
  { left: 10, delay: -8.1, duration: 18.2, size: 16, drift: -36, startRotate: 12, endRotate: -130, opacity: 0.2 },
  { left: 17, delay: -1.8, duration: 13.9, size: 11, drift: 40, startRotate: -26, endRotate: 100, opacity: 0.24 },
  { left: 24, delay: -10.4, duration: 20.4, size: 15, drift: -26, startRotate: 18, endRotate: -120, opacity: 0.19 },
  { left: 31, delay: -5.7, duration: 16.1, size: 13, drift: 34, startRotate: -16, endRotate: 120, opacity: 0.23 },
  { left: 38, delay: -7.3, duration: 15.4, size: 12, drift: -30, startRotate: 24, endRotate: -100, opacity: 0.21 },
  { left: 46, delay: -2.9, duration: 19.5, size: 17, drift: 44, startRotate: -12, endRotate: 134, opacity: 0.18 },
  { left: 53, delay: -12.2, duration: 17.8, size: 14, drift: -40, startRotate: 20, endRotate: -118, opacity: 0.2 },
  { left: 60, delay: -6.2, duration: 14.2, size: 11, drift: 32, startRotate: -22, endRotate: 108, opacity: 0.22 },
  { left: 67, delay: -9.5, duration: 21.1, size: 16, drift: -28, startRotate: 14, endRotate: -132, opacity: 0.18 },
  { left: 74, delay: -3.1, duration: 15.1, size: 12, drift: 35, startRotate: -19, endRotate: 115, opacity: 0.24 },
  { left: 81, delay: -11.4, duration: 18.8, size: 15, drift: -38, startRotate: 22, endRotate: -126, opacity: 0.19 },
  { left: 88, delay: -4.6, duration: 16.7, size: 13, drift: 30, startRotate: -15, endRotate: 102, opacity: 0.22 },
  { left: 95, delay: -13.6, duration: 22.1, size: 17, drift: -44, startRotate: 16, endRotate: -138, opacity: 0.18 },
];

export function FallingLeaves() {
  return (
    <div className="falling-leaves-layer" aria-hidden="true">
      {leaves.map((leaf, index) => {
        const style: LeafStyle = {
          "--leaf-left": `${leaf.left}%`,
          "--leaf-delay": `${leaf.delay}s`,
          "--leaf-duration": `${leaf.duration}s`,
          "--leaf-size": `${leaf.size}px`,
          "--leaf-drift": `${leaf.drift}px`,
          "--leaf-rotate-start": `${leaf.startRotate}deg`,
          "--leaf-rotate-end": `${leaf.endRotate}deg`,
          "--leaf-opacity": leaf.opacity.toString(),
        };

        return (
          <span key={`falling-leaf-${index + 1}`} className="falling-leaf" style={style}>
            <svg viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 1C5.5 6 3.4 15.4 7.2 23C9 26.7 12 30 12 30C12 30 15 26.7 16.8 23C20.6 15.4 18.5 6 12 1Z"
                fill="currentColor"
              />
              <path d="M12 6V29" stroke="rgba(75,54,33,0.38)" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
