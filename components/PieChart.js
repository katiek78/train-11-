import React, { useEffect } from 'react';

const PieChart = ({ data, colors }) => {
  useEffect(() => {
    generatePieChart(data, colors);
  }, [data, colors]);

  
  
  // const generatePieChart = (data, colors) => {
  //   const chartContainer = document.getElementById('pieChart');
  //   const totalValue = data.reduce((total, value) => total + value, 0);
  //   let cumulativePercentage = 0;

  //   data.forEach((value, index) => {
  //     const percentage = (value / totalValue) * 100;
  //     const slice = document.createElement('div');
  //     slice.className = 'slice';
  //     slice.style.backgroundColor = colors[index];
  //     slice.style.transform = `rotate(${percentageToDegrees(cumulativePercentage)}deg)`;
  //     slice.style.clip = percentage <= 50 ? 'rect(0, 100px, 200px, 0)' : 'auto';
  //     cumulativePercentage += percentage;

  //     if (percentage > 50) {
  //       const slice2 = document.createElement('div');
  //       slice2.className = 'slice';
  //       slice2.style.backgroundColor = colors[index];
  //       slice2.style.transform = `rotate(${percentageToDegrees(cumulativePercentage)+180}deg)`;
  //       slice2.style.clip = 'rect(0, 100px, 200px, 0)';
  //       chartContainer.appendChild(slice2);
  //     }

  //     chartContainer.appendChild(slice);
  //   });
  // };

  function generatePieChart(data, colors) {
    const chartContainer = document.getElementById('pieChart');
    const totalValue = data.reduce((total, value) => total + value, 0);
    let cumulativePercentage = 0;
  
    data.forEach((value, index) => {
      const percentage = (value / totalValue) * 100;
      const slice = document.createElement('div');
      slice.className = 'slice';
      slice.style.backgroundColor = colors[index];
  
      // Calculate the start and end angles for the slice
      const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
      cumulativePercentage += percentage;
      const endAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
  
      // Set the transform and clip properties for the slice
      slice.style.transform = `rotate(${startAngle}deg)`;
  
      if (percentage > 50) {
        // For slices greater than 50%, use two clips to show the correct part
        slice.style.clip = `polygon(50% 50%, 50% 0, 0 0, 0 50%)`;
        const slice2 = document.createElement('div');
        slice2.className = 'slice';
        slice2.style.backgroundColor = colors[index];
        slice2.style.transform = `rotate(${endAngle}deg)`;
        slice2.style.clip = `polygon(50% 50%, 50% 0, 0 0, 0 50%)`;
        chartContainer.appendChild(slice2);
      } else {
        // For slices less than or equal to 50%, use a single clip path
        slice.style.clip = `polygon(50% 50%, 50% 0, ${percentage > 25 ? '0' : '100%'} 0)`;
      }
  
      chartContainer.appendChild(slice);
    });
  }
  
  

  function percentageToDegrees(percentage) {
    // Check if the input percentage is within the valid range [0, 100]
    if (percentage < 0 || percentage > 100) {
      throw new Error("Percentage must be between 0 and 100.");
    }
  
    // Calculate the equivalent degrees (out of 360) for the given percentage
    const degrees = percentage * 3.6;
  
    return degrees;
  }

  return (
      <div id="pieChart" className="pie-chart" style={{ position: 'relative', width: '200px', height: '200px', borderRadius: '50%' }}></div>
  );
};

export default PieChart;