import FoldedCard from "./FoldedCard";
import NeuralNetIcon from "@/components/icons/NeuralNetIcon";
import ServerIcon from "@/components/icons/ServerIcon";
import QuestionMarkIcon from "@/components/icons/QuestionMarkIcon";
import { Intersection } from "@/lib/types";
import DevTerminalIcon from "../icons/DevTerminalIcon";
import ChartLineIcon from "../icons/ChartLineIcon";
import ShieldIcon from "../icons/ShieldIcon";

export default function IntersectionCard({
  title,
  description,
  icon,
}: Intersection) {
  return (
    <FoldedCard className="p-8 flex flex-col gap-6 h-full">
      {/* Icon */}
      <div className="w-16 h-16 text-[#a0a0a0]">
        {icon === "neural-net" && <NeuralNetIcon className="w-full h-full" />}
        {icon === "server" && <ServerIcon className="w-full h-full" />}
        {icon === "question-mark" && (
          <QuestionMarkIcon className="w-full h-full" />
        )}
        {icon === "shield" && <ShieldIcon className="w-full h-full" />}
        {icon === "chart-line" && <ChartLineIcon className="w-full h-full" />}
        {icon === "terminal" && <DevTerminalIcon className="w-full h-full" />}
      </div>

      {/* Title */}
      <h3
        className="text-xs font-bold uppercase tracking-widest text-[#f5f5f5]"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-[#a0a0a0] leading-relaxed">{description}</p>
    </FoldedCard>
  );
}
