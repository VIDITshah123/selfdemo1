import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const tabs = ['Buy', 'Rent', 'Off-Plan'];
const locations = [
  'All Locations',
  'Downtown Dubai',
  'Dubai Marina',
  'Palm Jumeirah',
  'Business Bay',
  'Dubai Hills Estate',
  'Jumeirah Bay Island',
  'Emirates Hills',
  'City Walk',
];
const types = [
  'All Types',
  'Apartment',
  'Penthouse',
  'Villa',
  'Townhouse',
  'Duplex',
  'Full Floor',
];
const budgets = [
  'Any Budget',
  'AED 500K – 1M',
  'AED 1M – 3M',
  'AED 3M – 7M',
  'AED 7M – 15M',
  'AED 15M+',
];

export default function SearchBar() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="search" className="search-section">
      <div className="search-wrapper">
        <motion.div
          className="search-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Tabs */}
          <div className="search-tabs">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                className={`search-tab${activeTab === i ? ' active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div className="search-fields">
            <div className="search-field">
              <label>Location</label>
              <select>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
            <div className="search-field">
              <label>Property Type</label>
              <select>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="search-field">
              <label>Budget</label>
              <select>
                {budgets.map((b) => <option key={b}>{b}</option>)}
              </select>
            </div>
            <button className="search-btn">
              <Search size={16} />
              Search
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
