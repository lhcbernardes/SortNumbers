import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './frequency-chart';
import './bet-generator';

@customElement('my-app')
export class MyApp extends LitElement {
  render() {
    return html`
      <div class="background-blobs">
        <div class="blob blob-1"></div>
        <div class="blob blob-2"></div>
        <div class="blob blob-3"></div>
      </div>

      <div class="container">
        <header>
          <h1>Mega-Sena <span class="highlight">Optimizer</span></h1>
          <p>Análise de Dados e Probabilidade Otimizada</p>
        </header>

        <main>
          <frequency-chart></frequency-chart>
          <bet-generator></bet-generator>
        </main>
      </div>
    `;
  }

  static styles = css`
    :host {
      --bg-color: #0f172a;
      --card-bg: rgba(30, 41, 59, 0.7);
      --primary: #10b981;
      --primary-hover: #059669;
      --accent: #3b82f6;
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --border: rgba(255, 255, 255, 0.1);
      
      display: block;
      min-height: 100vh;
      font-family: 'Inter', sans-serif;
      color: var(--text-main);
      overflow-x: hidden;
      padding: 2rem;
      box-sizing: border-box;
    }

    .container {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      z-index: 10;
      position: relative;
    }

    header {
      text-align: center;
      margin-bottom: 2rem;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
    }

    .highlight {
      color: var(--primary);
      background: linear-gradient(120deg, var(--primary), var(--accent));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    header p {
      color: var(--text-muted);
    }

    /* Background Effects */
    .background-blobs {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: -1;
      overflow: hidden;
      pointer-events: none;
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      filter: blur(80px);
      opacity: 0.4;
      animation: float 20s infinite ease-in-out;
    }

    .blob-1 {
      width: 400px;
      height: 400px;
      background: var(--primary);
      top: -100px;
      left: -100px;
    }

    .blob-2 {
      width: 300px;
      height: 300px;
      background: var(--accent);
      bottom: -50px;
      right: -50px;
      animation-delay: -5s;
    }

    .blob-3 {
      width: 200px;
      height: 200px;
      background: #8b5cf6;
      top: 40%;
      left: 40%;
      animation-delay: -10s;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      33% { transform: translate(30px, -50px); }
      66% { transform: translate(-20px, 20px); }
    }
  `;
}
