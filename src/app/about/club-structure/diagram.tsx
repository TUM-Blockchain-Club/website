import React, { useMemo } from "react";
import { motion } from "framer-motion";

/**
 * ClubStructureDiagram — v1.0.0
 * -----------------------------------------------------------------------------
 * • A Blockchain Club structure diagram with animated cards and connectors.
 * • Cards are animated with framer-motion for hover effects.
 * • Cards are positioned using absolute coordinates for a fixed layout.
 * • Connectors are lines with bi-directional arrow heads, using SVG markers.
 * -----------------------------------------------------------------------------
 */
export default function ClubStructureDiagram({  className = 'w-full',
    onSelect,
  }: {
    className?: string;
    onSelect?: (deptName: string) => void;
  }) {

  const neon = "#672EB3";
  const cardBg = "transparent";

  // Helper to wrap description text to fit the card width
  function wrapText(text: string, maxWidthPx: number, avgCharPx = 7) {
    const words = text.replace(/\n/g, " \n ").split(/\s+/);
    const lines = [];
    let current = "";
    words.forEach((w) => {
      if (w === "\n") {
        lines.push(current.trim());
        current = "";
        return;
      }
      const tentative = current ? `${current} ${w}` : w;
      if (tentative.length * avgCharPx > maxWidthPx) {
        lines.push(current.trim());
        current = w;
      } else current = tentative;
    });
    if (current) lines.push(current.trim());
    return lines;
  }

  /** Card component */
  const Card = ({ id, x, y, w = 190, h = 90, label, desc }: { id: string; x: number; y: number; w?: number; h?: number; label: string; desc?: string }) => {
    const labelY = y + 26;
    const descLines = useMemo(() => (desc ? wrapText(desc, w - 24) : []), [desc, w]);
    const descStartY = descLines.length === 3 && h === hMed ? labelY + 30: labelY + 18;
    const fontsize = descLines.length === 3 && h === hMed ? 13 : 12;

    return (
      <motion.g
        id={id}
        initial={{ scale: 1, filter: `drop-shadow(0 0 4px ${neon})` }}
        whileHover={{ scale: 1.06, filter: `drop-shadow(0 0 8px ${neon})` }}
        transition={{ type: "spring", stiffness: 250, damping: 20 }}
        onClick={() => onSelect?.(id)}
        style={{ cursor: "pointer" }}
      >
        <rect x={x} y={y} width={w} height={h} rx={10} fill={cardBg} stroke={neon} strokeWidth={2} />
        <text x={x + w / 2} y={labelY} textAnchor="middle" fontSize={16} fontWeight={700} fill="#ffffff">
          {label}
        </text>
        {descLines.map((line, i) => (
          <text key={`${id}-d-${i}`} x={x + w / 2} y={descStartY + i * 14} textAnchor="middle" fontSize={fontsize} fontWeight={400} fill="#c0bbd6">
            {line}
          </text>
        ))}
      </motion.g>
    );
  };

  /** Connector line with bi‑directional arrow heads */
  const Line = ({ x1, y1, x2, y2, oneWay = false }: { x1: number; y1: number; x2: number; y2: number; oneWay?: boolean }) => (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={neon}
      strokeWidth={2}
      markerStart={oneWay ? undefined : "url(#arrowheadRev)"}
      markerEnd="url(#arrowhead)"
    />
  );

  // The two Card heights
  const hSmall = 80;
  const hMed = 110;

  // Fixed Card positions
  const pos = {
    advisors: { x: 460, y: 10, w: 190, h: hSmall },
    board: { x: 460, y: 115, w: 190, h: hSmall },
    marketing: { x: 170, y: 250, w: 190, h: hMed },
    education: { x: 460, y: 240, w: 190, h: hMed },
    legal: { x: 750, y: 250, w: 190, h: hMed },
    community: { x: 170, y: 390, w: 190, h: hMed },
    it: { x: 460, y: 380, w: 190, h: hMed },
    external: { x: 750, y: 390, w: 190, h: hMed },
    industry: { x: 460, y: 520, w: 190, h: hMed },
    network: { x: 170, y: 690, w: 190, h: hSmall },
    partners: { x: 750, y: 690, w: 190, h: hSmall },
  };

  const midX = (c: keyof typeof pos) => pos[c].x + pos[c].w / 2;
  const topY = (c: keyof typeof pos) => pos[c].y;
  const bottomY = (c: keyof typeof pos) => pos[c].y + pos[c].h;

  return (
    <div className={className}>
      <svg viewBox="0 0 1100 800" width="100%" height="100%" role="img" aria-label="Club Structure Diagram" style={{ maxWidth: "100%", height: "auto" }}>
        {/* Arrowhead definitions */}
        <defs>
          {/* Head that points in the same direction as the line (→) */}
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M0 0 L8 4 L0 8 Z" fill={neon} />
          </marker>
          {/* Flipped head (←) for the line start so it always points back to the box */}
          <marker id="arrowheadRev" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto" markerUnits="strokeWidth">
            <path d="M8 0 L0 4 L8 8 Z" fill={neon} />
          </marker>
        </defs>

        {/* Core‑Team backdrop */}
        <motion.rect x={110} y={210} width={880} height={450} rx={16} fill="transparent" stroke={neon} strokeWidth={2} initial={{ filter: `drop-shadow(0 0 3px ${neon})` }} animate={{ opacity: 1 }} />

        {/* Cards */}
        <Card id="advisors" {...pos.advisors} label="Advisors" desc="Experts from industry & academia" />
        <Card id="board" {...pos.board} label="Board" desc="Taking operational decisions Department Head" />
        <Card id="Marketing" {...pos.marketing} label="Marketing" desc="Create campaigns, branding & content, manage social media & interact with the community" />
        <Card id="Education" {...pos.education} label="Education" desc="Host courses & workshops, create learning content, and write & review papers" />
        <Card id="Legal & Finance" {...pos.legal} label="Legal & Finance" desc="Manage legal, financial & administrative matters" />
        <Card id="Community" {...pos.community} label="Community" desc="Community Care & Engagement, responsible for Discord" />
        <Card id="IT & Development" {...pos.it} label="IT & Dev" desc="Host club infrastructure & support the club in development & technical issues" />
        <Card id="External Relations" {...pos.external} label="External Affairs" desc="Find, select and collaborate with partners" />
        <Card id="Industry" {...pos.industry} label="Industry" desc="Organize web3 projects for student teams in cooperation with industry partners" />
        <Card id="network" {...pos.network} label="Club Network" desc="Students, Alumnis, Members" />
        <Card id="partners" {...pos.partners} label="Partners" desc="VC, Companies, Blockchain Clubs, Universities" />

        {/* Connectors */}
        {/* Advisors → Board (single‑headed) */}
        <Line x1={midX("advisors")} y1={bottomY("advisors")} x2={midX("board")} y2={topY("board") - 6} oneWay />

        {/* Community vertical */}
        <Line x1={midX("community")} y1={bottomY("community") + 6} x2={midX("network")} y2={topY("network") - 6} />

        {/* External vertical */}
        <Line x1={midX("external")} y1={bottomY("external") + 6} x2={midX("partners")} y2={topY("partners") - 6} />

        {/* Industry branches */}
        <Line x1={midX("industry") + 10} y1={bottomY("industry") + 3} x2={midX("partners") - 100} y2={topY("partners")} />
        <Line x1={midX("industry") - 10} y1={bottomY("industry") + 3} x2={midX("network") + 100} y2={topY("network")} />
      </svg>
    </div>
  );
}
