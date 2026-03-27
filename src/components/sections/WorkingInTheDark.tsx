import MoonIcon from "@/components/icons/MoonIcon";
import TerminalIcon from "@/components/icons/TerminalIcon";

const iconGrid = [
  { id: "moon", type: "icon", Icon: MoonIcon },
  { id: "researcher-1", type: "image", src: "/cat-researcher-1.png", alt: "Researcher" },
  { id: "researcher-2", type: "image", src: "/cat-researcher-2.png", alt: "Researcher" },
  { id: "terminal", type: "icon", Icon: TerminalIcon },
  { id: "researcher-3", type: "image", src: "/cat-researcher-3.png", alt: "Researcher" },
  { id: "mascot", type: "image", src: "/octopus-mascot.png", alt: "Claude Code mascot" },
];

export default function WorkingInTheDark() {
  return (
    <section className="border-t border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: Text */}
        <div className="flex flex-col gap-6">
          <h2
            className="text-3xl font-bold text-[#f5f5f5]"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Working In The Dark
          </h2>
          <p className="text-[#a0a0a0] leading-relaxed text-base max-w-md">
            Most things get built in the dark. Not because they&apos;re hidden, because that&apos;s when the noise stops and the work starts.
            {/* The independent, late-night lab culture is what defines us. Most things get built in
            the dark — not because they&apos;re hidden, but because that&apos;s when the noise stops
            and the work starts. */}
          </p>
          <p className="text-[#a0a0a0] leading-relaxed text-base max-w-md">
            Pandemonium Research is an independent lab for people who build when everyone else is asleep. AI systems, tools, languages, infrastructure - anything worth making.
            {/* We are researchers and engineers constructing the next era of AI, systems, and tools
            when the world is asleep. It&apos;s an independent, after-hours, relentless kind of
            community. */}
          </p>
        </div>

        {/* Right: Icon grid */}
        <div className="grid grid-cols-3 gap-3">
          {iconGrid.map((item) => (
            <div
              key={item.id}
              className="aspect-square border border-[#2a2a2a] bg-[#1a1a1a] flex items-center justify-center overflow-hidden"
            >
              {item.type === "icon" && item.Icon ? (
                <item.Icon className="w-10 h-10 text-[#505050]" />
              ) : item.type === "image" && item.src ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-15 h-15 object-contain"
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
