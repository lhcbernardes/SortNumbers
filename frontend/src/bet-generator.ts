import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('bet-generator')
export class BetGenerator extends LitElement {
  @state() private selectedAmount = 6;
  @state() private result: any = null;
  @state() private loading = false;
  @state() private error = '';

  render() {
    return html`
      <section class="card generator-card">
        <h2>Gerador de Apostas</h2>
        <p>Selecione a quantidade de dezenas:</p>
        
        <div class="input-group">
          <div class="radio-group">
            ${[6, 7, 8].map(num => html`
              <label class="radio-option">
                <input 
                  type="radio" 
                  name="dezenas" 
                  value="${num}" 
                  ?checked="${this.selectedAmount === num}"
                  @change="${this.handleOptionChange}"
                >
                <span>${num}</span>
              </label>
            `)}
          </div>
        </div>

        <button @click="${this.gerarAposta}" ?disabled="${this.loading}">
          <span class="btn-text">
            ${this.loading ? 'Gerando...' : 'Gerar Aposta Otimizada'}
          </span>
        </button>

        ${this.error ? html`<div class="error">${this.error}</div>` : ''}

        ${this.result ? html`
          <div id="result-container">
            <h3>Sua Aposta:</h3>
            <div class="numbers-display">
              ${this.result.aposta.map((num: number, index: number) => html`
                <div class="ball" style="animation-delay: ${index * 0.1}s">${num}</div>
              `)}
            </div>
            <div class="stats-pills">
              <span class="pill">Soma: ${this.result.soma}</span>
              <span class="pill">Pares: ${this.result.pares}</span>
              <span class="pill">Ímpares: ${this.result.impares}</span>
            </div>
          </div>
        ` : ''}
      </section>
    `;
  }

  handleOptionChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.selectedAmount = parseInt(target.value);
  }

  async gerarAposta() {
    this.loading = true;
    this.error = '';
    this.result = null;

    try {
      // Assuming Flask running on port 3000
      const response = await fetch('http://127.0.0.1:3000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ n: this.selectedAmount })
      });

      const data = await response.json();

      if (response.ok) {
        this.result = data;
      } else {
        this.error = data.error || "Erro ao gerar aposta";
      }
    } catch (err) {
      console.error(err);
      this.error = "Erro de conexão";
    } finally {
      this.loading = false;
    }
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
      text-align: center;
      color: var(--text-main, #f8fafc);
    }

    h2 {
      font-size: 1.5rem;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      padding-bottom: 0.5rem;
    }

    p {
        color: var(--text-muted, #94a3b8);
    }

    .input-group {
      margin: 2rem 0;
      display: flex;
      justify-content: center;
    }

    .radio-group {
      display: flex;
      background: rgba(0, 0, 0, 0.2);
      border-radius: 999px;
      padding: 0.5rem;
    }

    .radio-option {
      position: relative;
      cursor: pointer;
    }

    .radio-option input {
      display: none;
    }

    .radio-option span {
      display: block;
      padding: 0.5rem 1.5rem;
      border-radius: 999px;
      color: var(--text-muted, #94a3b8);
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .radio-option input:checked + span {
      background: var(--primary, #10b981);
      color: #fff;
      box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3);
    }

    button {
      background: linear-gradient(135deg, var(--primary, #10b981), var(--primary-hover, #059669));
      border: none;
      padding: 1rem 3rem;
      border-radius: 1rem;
      color: white;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 10px 15px -3px rgba(16, 185, 129, 0.3);
    }

    button:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 20px 25px -5px rgba(16, 185, 129, 0.4);
    }
    
    button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .error {
        color: #ef4444;
        margin-top: 1rem;
    }

    /* Results */
    #result-container {
      margin-top: 2.5rem;
      animation: slideUp 0.5s ease forwards;
    }

    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .numbers-display {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin: 1.5rem 0;
      flex-wrap: wrap;
    }

    .ball {
      width: 60px;
      height: 60px;
      background: linear-gradient(145deg, #ffffff, #e2e8f0);
      color: #1e293b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 800;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1), inset 0 -4px 4px rgba(0,0,0,0.1);
      animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
    }

    @keyframes popIn {
      from {
        opacity: 0;
        transform: scale(0);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .stats-pills {
      display: flex;
      justify-content: center;
      gap: 1rem;
      margin-top: 1rem;
    }

    .pill {
      background: rgba(255,255,255,0.05);
      border: 1px solid var(--border, rgba(255, 255, 255, 0.1));
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      color: var(--text-muted, #94a3b8);
    }
  `;
}
