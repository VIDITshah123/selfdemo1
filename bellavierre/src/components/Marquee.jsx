const items = [
  'Downtown Dubai',
  'Palm Jumeirah',
  'Dubai Marina',
  'Business Bay',
  'Emirates Hills',
  'Jumeirah Bay Island',
  'City Walk',
  'Dubai Hills Estate',
  'La Mer',
  'Bluewaters Island',
];

const allItems = [...items, ...items]; // Duplicate for seamless loop

export default function Marquee() {
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {allItems.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-dot" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
