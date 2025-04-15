from .database import Base
from sqlalchemy import Column, Float, Integer, String, UniqueConstraint

class TelemetryModel(Base):
    __tablename__ = "telemetry"
    
    id = Column(Integer, primary_key=True, index=True)
    device_id = Column(String, index=True)
    hora = Column(String)
    potencia = Column(Float)

    __table_args__ = (UniqueConstraint('device_id', 'hora', name='_device_id_hora_uc'),)
