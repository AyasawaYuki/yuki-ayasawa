import { motion } from 'motion/react';
import { useId, useState } from 'react';

// Smooth 12-lobe Material Design 3 Scallop (Cookie) path in 0..100 coordinate space
export const M3_SCALLOP_PATH =
  'M50 3 C55.2 3, 57.5 9.2, 62.5 10.5 C67.5 11.8, 71.8 6.8, 76.4 9.6 C81 12.4, 79.4 18.8, 83.2 22.8 C87 26.8, 93.4 25.5, 95.4 30.6 C97.4 35.7, 92.2 40.2, 93.2 45.4 C94.2 50.6, 98.8 54.4, 96.2 59.8 C93.6 65.2, 87.8 65.4, 85.8 70.4 C83.8 75.4, 86.8 81.2, 82 85.2 C77.2 89.2, 72 84.6, 67 87.4 C62 90.2, 61.2 96.4, 55.2 97.2 C49.2 98, 46 92, 40 92 C34 92, 30.4 97.2, 25 94.4 C19.6 91.6, 21.8 85.4, 17 81.4 C12.2 77.4, 6.8 78.2, 4.8 73 C2.8 67.8, 8.2 63.8, 7 58 C5.8 52.2, 1.4 48.8, 3.2 43 C5 37.2, 11 36.8, 13 31.8 C15 26.8, 11.2 20.8, 16.2 16.8 C21.2 12.8, 26.4 17.2, 31.4 14.2 C36.4 11.2, 37.2 4.8, 43.2 3.8 C45.4 3.4, 47.7 3, 50 3 Z';

// Secondary subtle M3 Clover path for ambient canvas accents
export const M3_CLOVER_PATH =
  'M50 8 C66 8, 74 18, 70 30 C82 26, 92 34, 92 50 C92 66, 82 74, 70 70 C74 82, 66 92, 50 92 C34 92, 26 82, 30 70 C18 74, 8 66, 8 50 C8 34, 18 26, 30 30 C26 18, 34 8, 50 8 Z';

interface ScallopPfpProps {
  name: string;
  pfpUrl: string;
}

export function ScallopPfp({ name, pfpUrl }: ScallopPfpProps) {
  const clipId = useId().replace(/:/g, '');
  const [imageError, setImageError] = useState(false);

  const initials = name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative h-48 w-48 sm:h-52 sm:w-52">
        {/* Soft rotating Material 3 Scallop halo */}
        <motion.svg
          viewBox="0 0 100 100"
          aria-hidden="true"
          animate={{ rotate: 360 }}
          transition={{ duration: 44, repeat: Infinity, ease: 'linear' }}
          className="pointer-events-none absolute -inset-3 h-[calc(100%+24px)] w-[calc(100%+24px)] text-[var(--md-sys-color-primary-container)]"
        >
          <path d={M3_SCALLOP_PATH} fill="currentColor" opacity="0.65" />
        </motion.svg>

        {/* Read-only Scallop PFP with tactile M3 spring hover/tap motion */}
        <motion.div
          whileHover={{ scale: 1.04, rotate: 4 }}
          whileTap={{ scale: 0.96, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 340, damping: 20 }}
          className="relative h-full w-full"
        >
          <svg
            viewBox="0 0 100 100"
            role="img"
            aria-label={`${name} profile picture`}
            className="h-full w-full drop-shadow-xs"
          >
            <defs>
              <clipPath id={clipId}>
                <path d={M3_SCALLOP_PATH} />
              </clipPath>
            </defs>

            <path d={M3_SCALLOP_PATH} className="fill-[var(--md-sys-color-primary-container)]" />

            {!imageError ? (
              <image
                href={pfpUrl}
                x="0"
                y="0"
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#${clipId})`}
                onError={() => setImageError(true)}
              />
            ) : (
              <g clipPath={`url(#${clipId})`}>
                <path d={M3_SCALLOP_PATH} className="fill-[var(--md-sys-color-primary-container)]" />
                <text
                  x="50"
                  y="50"
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="font-display fill-[var(--md-sys-color-on-primary-container)] text-[22px] font-bold"
                >
                  {initials || 'YA'}
                </text>
              </g>
            )}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}
