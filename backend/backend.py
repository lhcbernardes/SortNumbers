import random
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

# --- LÓGICA DO NEGÓCIO (Reaproveitada e Adaptada) ---

def carregar_dados_historicos():
    """Carrega o histórico de sorteios do arquivo CSV."""
    try:
        df = pd.read_csv('dados_historicos.csv')
        # Filtra apenas as colunas das dezenas
        colunas_dezenas = [f'Dezena{i}' for i in range(1, 7)]
        return df[colunas_dezenas]
    except FileNotFoundError:
        print("Erro: Arquivo 'dados_historicos.csv' não encontrado.")
        return pd.DataFrame() # Retorna vazio em caso de erro

def analisar_estatisticas(df):
    """Calcula a frequência de cada número."""
    todos_numeros = df.values.flatten()
    frequencia = pd.Series(todos_numeros).value_counts().sort_index()
    # Garante que todos os números de 1 a 60 apareçam
    frequencia = frequencia.reindex(range(1, 61), fill_value=0)
    return frequencia

# Carrega dados ao iniciar o servidor
df_historico = carregar_dados_historicos()
freq_global = analisar_estatisticas(df_historico)

def gerar_aposta_otimizada(n_dezenas, frequencia):
    """Gera aposta com base na probabilidade e filtros estatísticos."""
    pesos = [frequencia.get(i, 1) for i in range(1, 61)]
    
    # Limite de tentativas para evitar loop infinito se os critérios forem muito rígidos
    for _ in range(5000):
        aposta = random.choices(range(1, 61), weights=pesos, k=n_dezenas)
        aposta = sorted(list(set(aposta)))
        
        if len(aposta) == n_dezenas:
            # Filtro 1: Paridade
            pares = len([n for n in aposta if n % 2 == 0])
            if 2 <= pares <= (n_dezenas - 2):
                # Filtro 2: Soma
                fator_ajuste = n_dezenas / 6
                soma = sum(aposta)
                if 150 * fator_ajuste <= soma <= 220 * fator_ajuste:
                    return aposta
    return None # Falhou em encontrar aposta otimizada

# --- ROTAS DA API ---



@app.route('/api/statistics')
def get_statistics():
    # Retorna as frequências para o gráfico
    # Formato: {labels: [1, 2, ...], values: [10, 15, ...]}
    labels = list(freq_global.index)
    values = list(freq_global.values)
    # Identificar os top 6 para colorir diferente no front
    sorted_indices = pd.Series(values, index=labels).sort_values(ascending=False).index[:6]
    
    return jsonify({
        'labels': labels,
        'values': [int(x) for x in values], # converter numpy int para python int
        'top6': [int(x) for x in sorted_indices]
    })

@app.route('/api/generate', methods=['POST'])
def generate_bet():
    data = request.json
    n = data.get('n', 6)
    
    if not (6 <= n <= 8):
        return jsonify({'error': 'Número de dezenas deve ser entre 6 e 8'}), 400
        
    aposta = gerar_aposta_otimizada(n, freq_global)
    
    if aposta:
        return jsonify({
            'aposta': aposta,
            'soma': sum(aposta),
            'pares': len([x for x in aposta if x % 2 == 0]),
            'impares': len([x for x in aposta if x % 2 != 0])
        })
    else:
        return jsonify({'error': 'Não foi possível gerar uma aposta otimizada. Tente novamente.'}), 500

if __name__ == '__main__':
    print("Iniciando servidor Flask...")
    app.run(debug=True, port=3000)
