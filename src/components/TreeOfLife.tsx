

export function TreeOfLife({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 135" 
      fill="none" 
      stroke="currentColor" 
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.3" strokeWidth="0.5">
        {/* Esoteric abstract circle behind the tree */}
        <circle cx="50" cy="65" r="50" />
        <circle cx="50" cy="65" r="35" />
      </g>
      
      {/* Paths (The 22 Paths of Wisdom) */}
      <g opacity="0.6" strokeWidth="1.2">
        <path d="M50 10 L80 25 M50 10 L20 25 M50 10 L50 65" />
        <path d="M80 25 L20 25 M80 25 L80 55 M80 25 L50 65" />
        <path d="M20 25 L20 55 M20 25 L50 65" />
        <path d="M80 55 L20 55 M80 55 L50 65 M80 55 L80 95" />
        <path d="M20 55 L50 65 M20 55 L20 95" />
        <path d="M50 65 L80 95 M50 65 L20 95 M50 65 L50 105" />
        <path d="M80 95 L20 95 M80 95 L50 105 M80 95 L50 125" />
        <path d="M20 95 L50 105 M20 95 L50 125" />
        <path d="M50 105 L50 125" />
      </g>
      
      {/* Nodes (The 10 Sephirot + Da'at) */}
      <g fill="currentColor" strokeWidth="1">
        <circle cx="50" cy="10" r="4.5" />  {/* Keter */}
        <circle cx="80" cy="25" r="4.5" />  {/* Chokhmah */}
        <circle cx="20" cy="25" r="4.5" />  {/* Binah */}
        
        <circle cx="50" cy="40" r="3" fill="none" strokeDasharray="1 1" /> {/* Da'at */}

        <circle cx="80" cy="55" r="4.5" />  {/* Chesed */}
        <circle cx="20" cy="55" r="4.5" />  {/* Gevurah */}
        <circle cx="50" cy="65" r="4.5" />  {/* Tiferet */}
        <circle cx="80" cy="95" r="4.5" />  {/* Netzach */}
        <circle cx="20" cy="95" r="4.5" />  {/* Hod */}
        <circle cx="50" cy="105" r="4.5" /> {/* Yesod */}
        <circle cx="50" cy="125" r="4.5" /> {/* Malkuth */}
      </g>
    </svg>
  );
}
