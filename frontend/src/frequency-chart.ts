import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import Chart from 'chart.js/auto';

@customElement('frequency-chart')
export class FrequencyChart extends LitElement {
  private chartInstance: Chart | null = null;

  render() {
    return html`
      <section class="card statistics-card">
        <h2>Frequência Histórica</h2>
        <div class="chart-container">
          <canvas id="frequencyChart"></canvas>
        </div>
      </section>
    `;
  }

  firstUpdated() {
    this.fetchStatistics();
  }

  async fetchStatistics() {
    try {
      // Use environment variable for API URL or fallback to localhost
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:3000';
      const response = await fetch(`${apiUrl}/api/statistics`);
      const data = await response.json();
      this.initChart(data);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  }

  initChart(data: any) {
    const ctx = this.renderRoot.querySelector('#frequencyChart') as HTMLCanvasElement;
    
    if (!ctx) return;

    // Destroy previous instance if exists
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const colors = data.labels.map((label: number) => {
      return data.top6.includes(label) ? '#10b981' : 'rgba(59, 130, 246, 0.6)';
    });

    this.chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.labels,
        datasets: [{
          label: 'Frequência',
          data: data.values,
          backgroundColor: colors,
          borderRadius: 4,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f8fafc',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(255,255,255,0.1)',
            borderWidth: 1
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { color: '#64748b' }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#64748b' },
            beginAtZero: true
          }
        }
      }
    });
  }

  static styles = css`
    .card {
      background: var(--card-bg, rgba(30, 41, 59, 0.7));
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      border-radius: 1.5rem;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      padding-bottom: 0.5rem;
      color: var(--text-main, #f8fafc);
    }

    .chart-container {
      position: relative;
      height: 300px;
      width: 100%;
    }
  `;
}
