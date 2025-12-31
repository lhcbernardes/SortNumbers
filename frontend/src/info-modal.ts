import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';

@customElement('info-modal')
export class InfoModal extends LitElement {
  @state() private isOpen = false;

  render() {
    return html`
      <button class="float-btn" @click="${this.toggleModal}" aria-label="Informações">
        ?
      </button>

      ${this.isOpen ? html`
        <div class="overlay" @click="${this.handleOverlayClick}">
          <div class="modal">
            <button class="close-btn" @click="${this.toggleModal}">&times;</button>
            
            <h2>Como Funciona?</h2>
            
            <div class="content">
              <p>O algoritmo gera sugestões baseadas em 3 pilares estatísticos:</p>
              
              <ul>
                <li>
                  <strong>Frequência:</strong> Dá preferência leve aos números que mais saíram na história, sem ignorar os "atrasados".
                </li>
                <li>
                  <strong>Paridade:</strong> Busca equilibrar Pares e Ímpares. Estatisticamente, a maioria dos sorteios tem 3 ou 4 pares.
                </li>
                <li>
                  <strong>Soma das Dezenas:</strong> Filtra combinações cuja soma total foge da curva de Gauss (somas muito baixas ou muito altas são raras).
                </li>
              </ul>

              <div class="disclaimer">
                <strong>⚠️ Aviso Legal:</strong>
                <p>Esta ferramenta é apenas para fins de <strong>estudo de probabilidade e programação.</strong></p>
                <p>Loteria é um jogo de azar. Não há garantia de lucro. Jogue com responsabilidade.</p>
              </div>
            </div>
          </div>
        </div>
      ` : ''}
    `;
  }

  toggleModal() {
    this.isOpen = !this.isOpen;
    document.body.style.overflow = this.isOpen ? 'hidden' : '';
  }

  handleOverlayClick(e: MouseEvent) {
    if (e.target === e.currentTarget) {
      this.toggleModal();
    }
  }

  static styles = css`
    :host {
      --btn-size: 56px;
      --primary: #10b981;
      --primary-hover: #059669;
      --text-main: #f8fafc;
      z-index: 1000;
    }

    /* Floating Button */
    .float-btn {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      width: var(--btn-size);
      height: var(--btn-size);
      border-radius: 50%;
      background: var(--primary);
      color: white;
      border: none;
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
      transition: transform 0.2s, background 0.2s;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .float-btn:hover {
      transform: scale(1.1);
      background: var(--primary-hover);
    }

    /* Modal Overlay */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 101;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      box-sizing: border-box;
      animation: fadeIn 0.3s ease;
    }

    /* Modal Content */
    .modal {
      background: #1e293b;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 1.5rem;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
      position: relative;
      color: var(--text-main);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    h2 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: var(--primary);
      font-size: 1.5rem;
    }

    ul {
      padding-left: 1.5rem;
      margin-bottom: 2rem;
    }

    li {
      margin-bottom: 0.8rem;
      line-height: 1.5;
      color: #cbd5e1;
    }

    strong {
      color: #f8fafc;
    }

    .disclaimer {
      background: rgba(239, 68, 68, 0.1);
      border: 1px solid rgba(239, 68, 68, 0.2);
      border-radius: 0.75rem;
      padding: 1rem;
      font-size: 0.9rem;
      color: #fca5a5;
    }

    .disclaimer strong {
      display: block;
      margin-bottom: 0.5rem;
      color: #fca5a5;
    }

    .disclaimer p {
      margin: 0;
    }

    .close-btn {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 2rem;
      line-height: 1;
      cursor: pointer;
      padding: 0.5rem;
      transition: color 0.2s;
    }

    .close-btn:hover {
      color: white;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `;
}
