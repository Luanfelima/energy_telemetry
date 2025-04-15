from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
from typing import List

app = FastAPI()

# Definindo um modelo de entrada para os dados de telemetria
class Telemetry(BaseModel):
    device_id: str
    hora: str
    potencia: float

# Lista para armazenar os dados
telemetry_data: List[Telemetry] = []

# Rota POST para receber os dados de telemetria
@app.post("/telemetry/")
async def receive_telemetry(telemetry: Telemetry):
    # Verificar se já existe um dado de telemetria para o mesmo device_id e hora
    for data in telemetry_data:
        if data.device_id == telemetry.device_id and data.hora == telemetry.hora:
            raise HTTPException(status_code=400, detail="Dados repetidos para o mesmo dispositivo e hora")
    
    # Caso não haja repetição, adicionar os dados
    telemetry_data.append(telemetry)
    
    return {"message": "Dados de telemetria recebidos com sucesso", "data": telemetry}

@app.get("/telemetry/")
async def get_all_telemetry():
    return telemetry_data

# Rota GET para obter resumo de dados de telemetria para um dispositivo específico
@app.get("/summary/{device_id}")
async def get_summary(device_id: str, start_date: str, end_date: str):
    # Converter as strings para datetime
    start = datetime.fromisoformat(start_date)
    end = datetime.fromisoformat(end_date)

    # Filtrar os dados para o dispositivo e dentro do intervalo de datas
    filtered_data = [data for data in telemetry_data
                     if data.device_id == device_id and start <= datetime.fromisoformat(data.hora) <= end]

    if not filtered_data:
        raise HTTPException(status_code=404, detail="Nenhum dado encontrado para o dispositivo no intervalo de datas fornecido.")

    # Preparar os dados para o gráfico
    graph_data = [
        {"hora": data.hora, "potencia": data.potencia}
        for data in filtered_data
    ]
    
    return {"device_id": device_id, "start_date": start_date, "end_date": end_date, "data": graph_data}

# Rota GET para verificar se o servidor está funcionando
@app.get("/")
async def root():
    return {"message": "Servidor FastAPI está funcionando!"}

# Permitir CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permitir todas as origens
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)