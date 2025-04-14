from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Modelo de Telemetria
class Telemetry(BaseModel):
    hora: str
    potencia: float

# Exemplo de dados simulados
sensor_data = {
    "01": [
        {"hora": "2025-04-13T08:00", "potencia": 110},
        {"hora": "2025-04-13T08:15", "potencia": 125},
        {"hora": "2025-04-13T08:30", "potencia": 140},
        {"hora": "2025-04-13T08:45", "potencia": 200},
        {"hora": "2025-04-13T09:00", "potencia": 150},
    ],
    "02": [
        {"hora": "2025-04-13T12:00", "potencia": 90},
        {"hora": "2025-04-13T12:15", "potencia": 100},
        {"hora": "2025-04-13T12:30", "potencia": 200},
        {"hora": "2025-04-13T12:45", "potencia": 230},
        {"hora": "2025-04-13T13:00", "potencia": 100},
    ],
    "03": [
        {"hora": "2025-04-13T14:30", "potencia": 50},
        {"hora": "2025-04-13T14:45", "potencia": 200},
        {"hora": "2025-04-13T15:00", "potencia": 250},
        {"hora": "2025-04-13T15:15", "potencia": 200},
        {"hora": "2025-04-13T15:30", "potencia": 100},
    ],
    "04": [
        {"hora": "2025-04-13T10:00", "potencia": 0},
        {"hora": "2025-04-13T11:00", "potencia": 0},
        {"hora": "2025-04-13T12:00", "potencia": 0},
    ],
}

@app.get("/summary/{device_id}", response_model=List[Telemetry])
async def get_telemetry(device_id: str, start_date: str, end_date: str):
    # Filtrar dados com base nas datas
    data = sensor_data.get(device_id, [])
    filtered_data = [
        entry for entry in data if start_date <= entry["hora"] <= end_date
    ]
    return filtered_data


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ou ["http://localhost:3000"] para ser mais restrito
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)