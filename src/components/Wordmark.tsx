export default function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`font-serif text-xl font-bold italic leading-normal tracking-tight ${className}`}>
      De Vrijdenkers
    </span>
  );
}
