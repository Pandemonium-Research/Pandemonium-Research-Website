interface NeuralNetIconProps {
  className?: string;
}

export default function NeuralNetIcon({ className = "" }: NeuralNetIconProps) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Input layer */}
      <circle cx="12" cy="22" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="40" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="58" r="5" stroke="currentColor" strokeWidth="1.5" />

      {/* Hidden layer 1 */}
      <circle cx="36" cy="15" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="33" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="51" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="65" r="5" stroke="currentColor" strokeWidth="1.5" />

      {/* Hidden layer 2 */}
      <circle cx="58" cy="25" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="58" cy="45" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="58" cy="63" r="5" stroke="currentColor" strokeWidth="1.5" />

      {/* Output layer */}
      <circle cx="72" cy="35" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="72" cy="55" r="5" stroke="currentColor" strokeWidth="1.5" />

      {/* Connections: input to hidden1 */}
      <line x1="17" y1="22" x2="31" y2="15" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="17" y1="22" x2="31" y2="33" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="17" y1="22" x2="31" y2="51" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="17" y1="40" x2="31" y2="15" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="17" y1="40" x2="31" y2="33" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="17" y1="40" x2="31" y2="51" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="17" y1="40" x2="31" y2="65" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="17" y1="58" x2="31" y2="33" stroke="currentColor" strokeWidth="0.75" opacity="0.3" />
      <line x1="17" y1="58" x2="31" y2="51" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="17" y1="58" x2="31" y2="65" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />

      {/* Connections: hidden1 to hidden2 */}
      <line x1="41" y1="15" x2="53" y2="25" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="41" y1="33" x2="53" y2="25" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="41" y1="33" x2="53" y2="45" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="41" y1="51" x2="53" y2="45" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="41" y1="51" x2="53" y2="63" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="41" y1="65" x2="53" y2="63" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />

      {/* Connections: hidden2 to output */}
      <line x1="63" y1="25" x2="67" y2="35" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="63" y1="45" x2="67" y2="35" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="63" y1="45" x2="67" y2="55" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="63" y1="63" x2="67" y2="55" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
    </svg>
  );
}
