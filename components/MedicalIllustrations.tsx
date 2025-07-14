const MEDICAL_COLOR = "#25BA7E"

export const MedicalHeartIllustration = () => (
  <div className="absolute top-4 left-8 z-0 opacity-60">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
    >
      <path
        d="M50 75C50 75 25 55 25 35C25 25 35 15 50 25C65 15 75 25 75 35C75 55 50 75 50 75Z"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill={MEDICAL_COLOR}
        opacity="0.1"
      />
      <path
        d="M50 75C50 75 25 55 25 35C25 25 35 15 50 25C65 15 75 25 75 35C75 55 50 75 50 75Z"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 45L35 45L40 35L45 55L50 25L55 65L60 45L65 45L70 45"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill="none"
      />
      <rect x="47" y="30" width="6" height="2" fill={MEDICAL_COLOR} opacity="0.3" />
      <rect x="49" y="28" width="2" height="6" fill={MEDICAL_COLOR} opacity="0.3" />
    </svg>
  </div>
)

export const StethoscopeIllustration = () => (
  <div className="absolute bottom-16 left-8 z-0 opacity-60">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
    >
      <path
        d="M25 15C25 10.5817 28.5817 7 33 7H37C41.4183 7 45 10.5817 45 15V25C45 29.4183 41.4183 33 37 33H33C28.5817 33 25 29.4183 25 25V15Z"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M55 15C55 10.5817 58.5817 7 63 7H67C71.4183 7 75 10.5817 75 15V25C75 29.4183 71.4183 33 67 33H63C58.5817 33 55 29.4183 55 25V15Z"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M35 33V45C35 50 40 55 45 55H55C60 55 65 50 65 45V33"
        stroke={MEDICAL_COLOR}
        strokeWidth="2"
        fill="none"
      />
      <path d="M50 55V70" stroke={MEDICAL_COLOR} strokeWidth="2" fill="none" />
      <circle cx="50" cy="80" r="8" stroke={MEDICAL_COLOR} strokeWidth="2" fill="none" />
      <circle cx="50" cy="80" r="4" fill={MEDICAL_COLOR} opacity="0.3" />
    </svg>
  </div>
)

export const ThermometerIllustration = () => (
  <div className="absolute top-4 right-8 z-0 opacity-60">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
    >
      <rect x="45" y="15" width="10" height="60" stroke={MEDICAL_COLOR} strokeWidth="2" fill="none" rx="5" />
      <line x1="55" y1="25" x2="60" y2="25" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="55" y1="35" x2="62" y2="35" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="55" y1="45" x2="60" y2="45" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="55" y1="55" x2="62" y2="55" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="55" y1="65" x2="60" y2="65" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <circle cx="50" cy="80" r="8" stroke={MEDICAL_COLOR} strokeWidth="2" fill={MEDICAL_COLOR} opacity="0.2" />
      <rect x="47" y="40" width="6" height="32" fill={MEDICAL_COLOR} opacity="0.3" rx="3" />
    </svg>
  </div>
)

export const SyringeIllustration = () => (
  <div className="absolute bottom-16 right-8 z-0 opacity-60">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
    >
      <rect x="20" y="40" width="50" height="20" stroke={MEDICAL_COLOR} strokeWidth="2" fill="none" rx="2" />
      <rect x="15" y="45" width="10" height="10" stroke={MEDICAL_COLOR} strokeWidth="2" fill="none" rx="1" />
      <line x1="10" y1="50" x2="15" y2="50" stroke={MEDICAL_COLOR} strokeWidth="2" />
      <line x1="70" y1="50" x2="85" y2="50" stroke={MEDICAL_COLOR} strokeWidth="2" />
      <path d="M85 50L90 48V52Z" fill={MEDICAL_COLOR} opacity="0.3" />
      <line x1="30" y1="40" x2="30" y2="35" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="40" y1="40" x2="40" y2="35" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="50" y1="40" x2="50" y2="35" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <line x1="60" y1="40" x2="60" y2="35" stroke={MEDICAL_COLOR} strokeWidth="1" />
      <rect x="22" y="42" width="25" height="16" fill={MEDICAL_COLOR} opacity="0.2" rx="1" />
    </svg>
  </div>
)

export const MedicalIllustrationsBackground = () => (
  <>
    <MedicalHeartIllustration />
    <StethoscopeIllustration />
    <ThermometerIllustration />
    <SyringeIllustration />
  </>
)
