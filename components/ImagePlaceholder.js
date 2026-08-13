import { Camera } from 'lucide-react';

/**
 * Beautiful placeholder component that shows a gradient background with a camera icon.
 * Swap with real <Image> when photos are available.
 *
 * @param {string}  label     - Descriptive label, e.g. "School Front View"
 * @param {number}  width     - Intended width in px (used for aspect ratio hint)
 * @param {number}  height    - Intended height in px (used for aspect ratio hint)
 * @param {string}  className - Additional Tailwind / CSS classes
 * @param {string}  variant   - 'primary' | 'dark' | 'gold' | 'cyan' — controls gradient
 */
export default function ImagePlaceholder({
  label = 'Photo',
  width = 800,
  height = 600,
  className = '',
  variant = 'primary',
}) {
  const aspectRatio = `${width}/${height}`;

  const gradients = {
    primary: 'from-[#1A2E6C] via-[#243a85] to-[#00B4D8]',
    dark:    'from-[#0D1B3E] via-[#1A2E6C] to-[#243a85]',
    gold:    'from-[#1A2E6C] via-[#F5B700]/60 to-[#C0392B]/60',
    cyan:    'from-[#00B4D8] via-[#1A2E6C] to-[#0D1B3E]',
  };

  const gradient = gradients[variant] || gradients.primary;

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${gradient} flex flex-col items-center justify-center select-none ${className}`}
      style={{ aspectRatio }}
      aria-label={label}
      role="img"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      {/* School crest watermark pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-3 text-center px-6">
        <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center backdrop-blur-sm">
          <Camera className="w-7 h-7 text-white" strokeWidth={1.5} />
        </div>
        <p className="text-white font-semibold text-sm tracking-wide font-body">{label}</p>
        <p className="text-white/50 text-xs">Photo coming soon</p>
        {/* Size hint for developers */}
        <p className="text-white/30 text-[10px] font-mono">{width} × {height}</p>
      </div>
    </div>
  );
}
