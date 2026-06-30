interface Step {
  number: number;
  label: string;
  description: string;
}

export default function StepFlow({ steps }: { steps: Step[] }) {
  return (
    <div className="my-6 space-y-4">
      {steps.map((step, i) => (
        <div key={step.number} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#1e3a5f] text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {step.number}
            </div>
            {i < steps.length - 1 && (
              <div className="w-0.5 flex-1 bg-[#2da44e] mt-1 min-h-[1.5rem]" />
            )}
          </div>
          <div className="pb-4">
            <p className="font-semibold text-[#1e3a5f]">{step.label}</p>
            <p className="text-sm text-gray-600 mt-0.5">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
