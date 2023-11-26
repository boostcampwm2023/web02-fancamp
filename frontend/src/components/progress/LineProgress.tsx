interface LineStepProps {
  maxStep: number;
  currentStep: number;
  className?: string;
}

function LineProgress({ maxStep, currentStep, className }: LineStepProps) {
  return (
    <div className={`h-[0.1875rem] w-full ${className || ''}`}>
      <div
        className="h-[0.1875rem] bg-point-blue smooth-transition"
        style={{ width: `${(100 / maxStep) * currentStep}%` }}
      />
    </div>
  );
}

export default LineProgress;
