import { Check, Copy, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { M3_CLOVER_PATH, M3_SCALLOP_PATH, ScallopPfp } from './components/M3Shapes';
import { InstagramIcon, TelegramIcon, TikTokIcon } from './components/SocialIcons';
import { CARD_PROFILE } from './data/portfolio';

export default function App() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = CARD_PROFILE.name;
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CARD_PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const socialButtons = [
    {
      label: 'Instagram',
      href: CARD_PROFILE.instagramUrl,
      icon: <InstagramIcon className="h-4 w-4" />,
    },
    {
      label: 'TikTok',
      href: CARD_PROFILE.tiktokUrl,
      icon: <TikTokIcon className="h-4 w-4" />,
    },
    {
      label: 'Telegram',
      href: CARD_PROFILE.telegramUrl,
      icon: <TelegramIcon className="h-4 w-4" />,
    },
  ];

  return (
    <main className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-[var(--md-sys-color-surface)] p-4 sm:p-6">
      {/* Subtle Ambient Material Design 3 Geometric Background Shapes */}
      <motion.svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        animate={{ rotate: [0, 12, 0], y: [0, -8, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 text-[var(--md-sys-color-primary-container)]/50 sm:h-80 sm:w-80"
      >
        <path d={M3_SCALLOP_PATH} fill="currentColor" />
      </motion.svg>

      <motion.svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        animate={{ rotate: [0, -14, 0], y: [0, 8, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-14 -bottom-16 h-64 w-64 text-[var(--md-sys-color-tertiary-container)]/80 sm:h-80 sm:w-80"
      >
        <path d={M3_CLOVER_PATH} fill="currentColor" />
      </motion.svg>

      {/* Single-Page Read-Only Material 3 Presentation Card */}
      <motion.section
        aria-label="Personal Presentation Card"
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        className="relative z-10 flex w-full max-w-md flex-col items-center rounded-[36px] bg-[var(--md-sys-color-surface-container-low)] px-6 py-9 text-center shadow-sm sm:px-10 sm:py-11"
      >
        {/* Material Design 3 Scallop Profile Photo */}
        <ScallopPfp name={CARD_PROFILE.name} pfpUrl={CARD_PROFILE.pfpUrl} />

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.3, ease: [0.2, 0, 0, 1] }}
          className="font-display mt-7 text-3xl font-bold tracking-tight text-[var(--md-sys-color-on-surface)] sm:text-4xl"
        >
          {CARD_PROFILE.name}
        </motion.h1>

        {/* Animated Material Design 3 Social Buttons (Instagram, TikTok, Telegram) */}
        <div className="mt-7 flex w-full flex-wrap items-center justify-center gap-2.5">
          {socialButtons.map((item, idx) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.12 + idx * 0.05,
                type: 'spring',
                stiffness: 380,
                damping: 24,
              }}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.94 }}
              className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary-container)] px-4 py-2.5 text-sm font-semibold text-[var(--md-sys-color-on-primary-container)] whitespace-nowrap shrink-0 transition-colors hover:bg-[var(--md-sys-color-primary)] hover:text-[var(--md-sys-color-on-primary)]"
            >
              {item.icon}
              <span>{item.label}</span>
            </motion.a>
          ))}
        </div>

        {/* Animated Email Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, type: 'spring', stiffness: 360, damping: 24 }}
          className="mt-3 flex w-full items-center justify-center gap-2"
        >
          <motion.a
            href={`mailto:${CARD_PROFILE.email}`}
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="inline-flex min-h-[46px] flex-1 items-center justify-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--md-sys-color-on-primary)] transition-colors hover:bg-[var(--md-sys-color-primary-hover)]"
          >
            <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="truncate">{CARD_PROFILE.email}</span>
          </motion.a>

          <motion.button
            type="button"
            onClick={handleCopyEmail}
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.92 }}
            aria-label={copied ? 'Email copied' : 'Copy email address'}
            title={copied ? 'Copied!' : 'Copy email'}
            className="inline-flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface)] transition-colors hover:bg-[var(--md-sys-color-primary-container)] hover:text-[var(--md-sys-color-on-primary-container)]"
          >
            {copied ? (
              <Check className="h-4 w-4 text-[var(--md-sys-color-primary)]" aria-hidden="true" />
            ) : (
              <Copy className="h-4 w-4" aria-hidden="true" />
            )}
          </motion.button>
        </motion.div>
      </motion.section>
    </main>
  );
}
