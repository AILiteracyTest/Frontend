interface ProgressBarProps {
  progress: number;
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="mt-4 h-2 bg-neutral-light rounded-full overflow-hidden w-full">
      <div
        className="h-full bg-primary-blue transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}
