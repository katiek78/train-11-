import React, { useEffect } from 'react';

const PieChart2 = ({ data, colors, labels }) => {
  useEffect(() => {
    generatePieChart(data, colors, labels);
  }, [data, colors, labels]);


  const generatePieChart = (data, colors, labels) => {
    var canvas = document.getElementById("can");
    var ctx = canvas.getContext("2d");
    // var lastend = 0;
    var lastend = - Math.PI / 2
    // var data = [60,210,90];
    var myTotal = 0;
    // var myColor = ['#afcc4c', '#95b524','#c1dd54'];
    // var labels = ['B', 'A', 'C'];

    for(var e = 0; e < data.length; e++)
    {
    myTotal += data[e];
    }

    // make the chart 10 px smaller to fit on canvas
    var off = 10
    var w = (canvas.width - off) / 2
    var h = (canvas.height - off) / 2
    for (var i = 0; i < data.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.strokeStyle ='white';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w,h);
    var len =  (data[i]/myTotal) * 2 * Math.PI
    var r = h - off / 2
    ctx.arc(w , h, r, lastend,lastend + len,false);
    ctx.lineTo(w,h);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle ='white';
    ctx.font = "10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var mid = lastend + len / 2
    ctx.fillText(labels[i],w + Math.cos(mid) * (r/2) , h + Math.sin(mid) * (r/2));
    lastend += Math.PI*2*(data[i]/myTotal);
    }
  }

return (
    <canvas id="can" width="200" height="200"></canvas>
);


}

export default PieChart2