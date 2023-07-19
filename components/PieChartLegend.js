import React from 'react';

function PieChartLegend({ colors, labels }) {
  // Ensure the colors and labels arrays have the same length
  if (colors.length !== labels.length) {
    colors.slice(0, labels.length);
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {labels.map((label, index) => (
        <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
          <span style={{ width: '10px', height: '10px', marginRight: '5px', backgroundColor: colors[index] }}></span>
          {label}
        </li>
      ))}
    </ul>
  );
}

export default PieChartLegend;
