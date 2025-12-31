import pandas as pd
import numpy as np

def convert_data():
    try:
        # Read file without header to find the correct row
        df = pd.read_excel('../mega_sena_asloterias_ate_concurso_2954_sorteio.xlsx', header=None)
        
        # Find the row index where the first column is 'Concurso'
        header_row_idx = df.index[df.iloc[:, 0] == 'Concurso'].tolist()
        
        if not header_row_idx:
            print("Could not find header row starting with 'Concurso'")
            return
            
        start_idx = header_row_idx[0]
        
        # Reload or slice with correct header
        # We manually slice relevant columns (0 to 7)
        df_data = df.iloc[start_idx+1:, 0:8]
        
        # Rename columns to match backend expectation
        # Concurso,Data Sorteio,Dezena1,Dezena2,Dezena3,Dezena4,Dezena5,Dezena6
        df_data.columns = [
            'Concurso', 'Data Sorteio', 
            'Dezena1', 'Dezena2', 'Dezena3', 'Dezena4', 'Dezena5', 'Dezena6'
        ]
        
        # Drop rows where Concurso is NaN (end of file valid data)
        df_data = df_data.dropna(subset=['Concurso'])
        
        # Formatting 'Data Sorteio' if needed, though CSV writes as string usually fine
        # Ensure integers for Dezenas
        for col in ['Concurso', 'Dezena1', 'Dezena2', 'Dezena3', 'Dezena4', 'Dezena5', 'Dezena6']:
            df_data[col] = df_data[col].astype(int)

        # Sort just in case (optional, but good for history)
        df_data = df_data.sort_values(by='Concurso')

        output_path = 'dados_historicos.csv'
        df_data.to_csv(output_path, index=False)
        print(f"Successfully converted {len(df_data)} records to {output_path}")
        print(df_data.head())
        
    except Exception as e:
        print(f"Error converting data: {e}")

if __name__ == "__main__":
    convert_data()
