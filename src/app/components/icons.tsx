// أيقونات SVG بسيطة (بدون مكتبات خارجية)
type IconProps = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const IconPin = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);

export const IconCalendar = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4M16 3v4" />
  </svg>
);

export const IconYoutube = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="2" y="5" width="20" height="14" rx="4" />
    <path d="m10 9 5 3-5 3z" />
  </svg>
);

export const IconFacebook = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M15 3h-2a4 4 0 0 0-4 4v3H7v3h2v8h3v-8h3l1-3h-4V7a1 1 0 0 1 1-1h2z" />
  </svg>
);

export const IconInstagram = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" />
  </svg>
);

export const IconHome = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 3 2 11h3v9h5v-6h4v6h5v-9h3z" />
  </svg>
);

export const IconChevron = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const IconArrowLeft = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2.4} className={className}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconRunner = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="14" cy="4" r="2" />
    <path d="m6 21 3-6 3 2v4M9 15l1-5 5 2 3 3M10 10 7 8l-3 2" />
  </svg>
);

export const IconScale = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M12 3v18M5 21h14M6 7h12M3 15l3-8 3 8a3 3 0 0 1-6 0zM15 15l3-8 3 8a3 3 0 0 1-6 0z" />
  </svg>
);

export const IconMedal = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="12" cy="15" r="6" />
    <path d="M8.5 10 6 3h4l2 5 2-5h4l-2.5 7" />
  </svg>
);

export const IconBook = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM4 21a2 2 0 0 1 2-2h12v2M8 7h6M8 11h6" />
  </svg>
);

export const IconTrophy = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3" />
  </svg>
);

export const IconUsers = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3.5 6" />
  </svg>
);

export const IconFile = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5" />
  </svg>
);

export const IconFolder = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);

export const IconNews = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M7 8h4v4H7zM14 8h3M14 12h3M7 16h10" />
  </svg>
);

export const IconCamera = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
    <circle cx="12" cy="13" r="3.5" />
  </svg>
);

export const IconMenu = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2.2} className={className}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconDownload = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M12 3v12M7 10l5 5 5-5M4 19h16" />
  </svg>
);

export const IconEye = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const IconPdf = ({ className }: IconProps) => (
  <svg {...base} className={className}>
    <path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6" />
    <path d="M8 13h1.5a1.5 1.5 0 0 1 0 3H8v-3zM8 16v2M13 13v5h1a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2z" />
  </svg>
);

export const IconUpload = ({ className }: IconProps) => (
  <svg {...base} strokeWidth={2} className={className}>
    <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
  </svg>
);
