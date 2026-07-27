/* ============================================================
   环球手札 — Charts Module (Chart.js Journal Styling)
   ============================================================ */

const ChartsModule = (() => {
  let barChart = null;
  let radarChart = null;
  let lineChart = null;

  // --- Global Chart.js defaults ---

  function setDefaults() {
    Chart.defaults.font.family = "'Caveat', 'Gaegu', cursive";
    Chart.defaults.font.size = 13;
    Chart.defaults.color = '#3A3A3C';
    Chart.defaults.plugins.tooltip.enabled = false; // We use custom hover
  }

  // --- Washi tape pattern plugin ---

  const washiTapePlugin = {
    id: 'washiTape',
    beforeDraw(chart) {
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      ctx.save();

      // Top tape
      ctx.fillStyle = 'rgba(245,194,107,0.2)';
      ctx.fillRect(chartArea.left + 20, chartArea.top - 6, 50, 12);
      ctx.fillStyle = 'rgba(170,200,220,0.2)';
      ctx.fillRect(chartArea.right - 60, chartArea.bottom + 2, 45, 11);

      ctx.restore();
    }
  };

  // --- Bar Chart: GDP & Population ---

  function renderBarChart(region) {
    const ctx = document.getElementById('chart-bar');
    if (!ctx) return;

    if (barChart) barChart.destroy();

    const maxPop = Math.max(...region.population);
    const popScaled = region.population.map(v => v / 10); // Scale down for dual axis display

    barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: GDP_YEARS,
        datasets: [
          {
            label: 'GDP (亿元)',
            data: region.gdp,
            backgroundColor: createStripePattern('#D94A4A', '#C04040'),
            borderColor: '#B33A3A',
            borderWidth: 1.5,
            borderRadius: 2,
            borderSkipped: false,
            yAxisID: 'y',
            order: 2
          },
          {
            label: '人口 (万人)',
            data: popScaled,
            backgroundColor: createStripePattern('#4A6B8A', '#3D5A75'),
            borderColor: '#2E4A65',
            borderWidth: 1.5,
            borderRadius: 2,
            borderSkipped: false,
            yAxisID: 'y1',
            order: 2
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'top',
            align: 'end',
            labels: {
              usePointStyle: true,
              pointStyleWidth: 12,
              padding: 16,
              font: { family: "'Caveat', cursive", size: 14 },
              generateLabels(chart) {
                return [
                  { text: 'GDP', fillStyle: createStripePattern('#D94A4A', '#C04040'), strokeStyle: '#B33A3A', lineWidth: 1, hidden: false, index: 0, pointStyle: 'rectRounded', rotation: 0 },
                  { text: '人口', fillStyle: createStripePattern('#4A6B8A', '#3D5A75'), strokeStyle: '#2E4A65', lineWidth: 1, hidden: false, index: 1, pointStyle: 'rectRounded', rotation: 0 }
                ];
              }
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: '#FDF8E8',
            titleColor: '#3A3A3C',
            bodyColor: '#3A3A3C',
            borderColor: 'rgba(0,0,0,0.1)',
            borderWidth: 1,
            titleFont: { family: "'Caveat', cursive", size: 14 },
            bodyFont: { family: "'Caveat', cursive", size: 13 },
            cornerRadius: 2,
            displayColors: false
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: {
              font: { family: "'Caveat', cursive", size: 12 },
              color: '#6B6B6E'
            },
            border: { color: 'rgba(0,0,0,0.1)' }
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'GDP (亿元)',
              font: { family: "'Caveat', cursive", size: 12 },
              color: '#D94A4A'
            },
            grid: {
              color: 'rgba(139,160,180,0.2)',
              lineWidth: 0.5
            },
            ticks: {
              font: { family: "'Caveat', cursive", size: 11 },
              color: '#6B6B6E',
              callback: v => v >= 1000 ? (v/1000).toFixed(1) + 'k' : v
            },
            border: { color: 'rgba(0,0,0,0.1)' }
          },
          y1: {
            type: 'linear',
            position: 'right',
            title: {
              display: true,
              text: '人口 (万人)',
              font: { family: "'Caveat', cursive", size: 12 },
              color: '#4A6B8A'
            },
            grid: { display: false },
            ticks: {
              font: { family: "'Caveat', cursive", size: 11 },
              color: '#6B6B6E',
              callback: v => Math.round(v * 10)
            },
            border: { color: 'rgba(0,0,0,0.1)' }
          }
        }
      },
      plugins: [washiTapePlugin]
    });
  }

  // --- Radar Chart: Economy Dimensions ---

  function renderRadarChart(region) {
    const ctx = document.getElementById('chart-radar');
    if (!ctx) return;

    if (radarChart) radarChart.destroy();

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ECONOMY_LABELS,
        datasets: [{
          data: Object.values(region.economy),
          backgroundColor: 'rgba(74,107,138,0.25)',
          borderColor: '#4A6B8A',
          borderWidth: 2,
          pointBackgroundColor: '#D94A4A',
          pointBorderColor: '#D94A4A',
          pointBorderWidth: 1.5,
          pointRadius: 4,
          pointHoverRadius: 7,
          borderDash: [],
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#FDF8E8',
            titleColor: '#3A3A3C',
            bodyColor: '#3A3A3C',
            titleFont: { family: "'Caveat', cursive", size: 14 },
            bodyFont: { family: "'Caveat', cursive", size: 13 },
            cornerRadius: 2,
            displayColors: false
          }
        },
        scales: {
          r: {
            beginAtZero: false,
            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              display: true,
              backdropColor: 'transparent',
              font: { family: "'Caveat', cursive", size: 10 },
              color: '#6B6B6E'
            },
            pointLabels: {
              font: { family: "'Caveat', cursive", size: 13 },
              color: '#3A3A3C'
            },
            grid: {
              color: 'rgba(139,160,180,0.3)',
              lineWidth: 0.8
            },
            angleLines: {
              color: 'rgba(139,160,180,0.3)',
              lineWidth: 0.8
            }
          }
        }
      }
    });
  }

  // --- Line Chart: GDP Trend ---

  function renderLineChart(region) {
    const ctx = document.getElementById('chart-line');
    if (!ctx) return;

    if (lineChart) lineChart.destroy();

    // Pinpoint image for data points
    const pinImage = new Image();
    pinImage.src = createPushpinSVG();

    lineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: GDP_YEARS,
        datasets: [{
          data: region.gdp,
          borderColor: '#4A6B8A',
          backgroundColor: (context) => {
            const chart = context.chart;
            const { ctx, chartArea } = chart;
            if (!chartArea) return 'rgba(74,107,138,0.08)';
            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, 'rgba(74,107,138,0.25)');
            gradient.addColorStop(1, 'rgba(74,107,138,0.02)');
            return gradient;
          },
          borderWidth: 2.5,
          fill: true,
          tension: 0.35,
          pointRadius: 6,
          pointHoverRadius: 10,
          pointBackgroundColor: (ctx) => {
            const idx = ctx.dataIndex;
            return idx === GDP_YEARS.length - 1 ? '#D94A4A' : '#4A6B8A';
          },
          pointBorderColor: (ctx) => {
            const idx = ctx.dataIndex;
            return idx === GDP_YEARS.length - 1 ? '#B33A3A' : '#3D5A75';
          },
          pointBorderWidth: 2,
          pointStyle: (ctx) => {
            const idx = ctx.dataIndex;
            return idx === GDP_YEARS.length - 1 ? 'rectRounded' : 'circle';
          }
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            enabled: true,
            backgroundColor: '#FDF8E8',
            titleColor: '#3A3A3C',
            bodyColor: '#3A3A3C',
            titleFont: { family: "'Caveat', cursive", size: 14 },
            bodyFont: { family: "'Caveat', cursive", size: 13 },
            cornerRadius: 2,
            displayColors: false,
            callbacks: {
              label: (ctx) => `GDP: ${ctx.raw} 亿元`
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(139,160,180,0.2)',
              lineWidth: 0.5
            },
            ticks: {
              font: { family: "'Caveat', cursive", size: 12 },
              color: '#6B6B6E'
            },
            border: { color: 'rgba(0,0,0,0.1)' }
          },
          y: {
            title: {
              display: true,
              text: 'GDP (亿元)',
              font: { family: "'Caveat', cursive", size: 12 },
              color: '#4A6B8A'
            },
            grid: {
              color: 'rgba(139,160,180,0.2)',
              lineWidth: 0.5
            },
            ticks: {
              font: { family: "'Caveat', cursive", size: 11 },
              color: '#6B6B6E',
              callback: v => v >= 1000 ? (v/1000).toFixed(1) + 'k' : v
            },
            border: { color: 'rgba(0,0,0,0.1)' }
          }
        }
      }
    });
  }

  // --- Helpers ---

  function createStripePattern(color1, color2) {
    const canvas = document.createElement('canvas');
    canvas.width = 8; canvas.height = 8;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = color1;
    ctx.fillRect(0, 0, 8, 8);
    ctx.strokeStyle = color2;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(8, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-4, 4);
    ctx.lineTo(4, 12);
    ctx.stroke();
    return ctx.createPattern(canvas, 'repeat');
  }

  function createPushpinSVG() {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
      <circle cx="6" cy="4" r="4" fill="#D94A4A" stroke="#B33A3A" stroke-width="0.5"/>
      <rect x="5" y="7" width="2" height="4" fill="#888"/>
      <line x1="3" y1="11" x2="9" y2="11" stroke="#888" stroke-width="0.8"/>
    </svg>`;
    return 'data:image/svg+xml;base64,' + btoa(svg);
  }

  // --- Initialize all charts for a region ---

  function renderAll(region) {
    if (!region) return;
    setDefaults();
    const hasData = region.gdp && region.gdp.length > 0;
    if (hasData) {
      renderBarChart(region);
      renderRadarChart(region);
      renderLineChart(region);
      setTimeout(() => SoundFX.cardAppear(), 200);
      setTimeout(() => SoundFX.stickerSlap(), 500);
      setTimeout(() => SoundFX.cardAppear(), 800);
    }
  }

  function destroyAll() {
    if (barChart) { barChart.destroy(); barChart = null; }
    if (radarChart) { radarChart.destroy(); radarChart = null; }
    if (lineChart) { lineChart.destroy(); lineChart = null; }
  }

  return { renderAll, destroyAll };
})();
