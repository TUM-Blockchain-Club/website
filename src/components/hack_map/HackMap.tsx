// src/components/HackathonMap.tsx
import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  Sphere,
} from "react-simple-maps";

export type Hackathon = {
  name: string;
  // [lon, lat]
  coordinates: [number, number];
  description?: string;
  image?: string;
};

// Default hackathons data
const DEFAULT_HACKATHONS: Hackathon[] = [
  { name: "ETHGlobal Zürich", coordinates: [8.5417, 47.3769] },
  { name: "Web3 Summit Berlin", coordinates: [13.4050, 52.5200] },
  { name: "HackMIT", coordinates: [-71.0939, 42.3601] },
  { name: "LA Blockchain Hackathon", coordinates: [-118.2437, 34.0522] },
];

// Default center location
const DEFAULT_CENTER: [number, number] = [11.5755, 48.1371];
const DEFAULT_CENTER_NAME = "Munich";

interface HackathonMapProps {
  hackathons?: Hackathon[];
  center?: [number, number];
  centerName?: string;
}

const HackathonMap: React.FC<HackathonMapProps> = ({
  hackathons = DEFAULT_HACKATHONS,
  center = DEFAULT_CENTER,
  centerName = DEFAULT_CENTER_NAME,
}) => (
    <ComposableMap
      projectionConfig={{ scale: 147 }}
      className="w-full h-auto"
      height={390}
    >
      <Sphere id="sphere" fill="transparent" stroke="var(--violet-4)" strokeWidth={0.5} />
      {/* 1) Define a tiny circle‐pattern for all land */}
      <defs>
        <pattern
          id="dots"
          x="0"
          y="0"
          width="4"
          height="4"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="1" fill="var(--violet-3)" />
        </pattern>
      </defs>

      {/* 2) Draw each country filled with our "dots" */}
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill="url(#dots)"
              stroke="none"
              className="pointer-events-none"
            />
          ))
        }
      </Geographies>

      {/* 3) Flight‐style curves from center to each hackathon */}
      {hackathons.map((hack, i) => (
        <Line
          key={`line-${i}`}
          from={center}
          to={hack.coordinates}
          stroke="var(--accent)"
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}

      {/* 5) Markers for each hackathon city */}
      {hackathons.map((hack, i) => (
        <Marker key={`marker-${i}`} coordinates={hack.coordinates}>
          <circle r={2} fill="var(--accent)" />
          <title>{hack.name}</title>
        </Marker>
      ))}

        {/* 4) Marker for center */}
        <Marker coordinates={center}>
        <circle r={4} fill="var(--accent)" />
        <text
          textAnchor="middle"
          y={-10}
          className="text-xs fill-foreground"
        >
          {centerName}
        </text>
      </Marker>
    </ComposableMap>
);

export default HackathonMap;
