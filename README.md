# energy_telemetry

How to run:


Frontend:

npm install

//Por precaução rodar esta linha abaixo, para instalar as dependências que normalmente dão erro.

npm install lucide-react recharts axios

//Por fim pode rodar o run dev

npm run dev

Caso o install não instale todas as dependências será necessário dar npm install nomeDaDependencia


Backend:

//O ambiente virtual foi instalado desta forma:
python3 -m venv venv
source venv/bin/activate


//Install's do backend
pip install fastapi uvicorn 


//Comando para rodar o backend
uvicorn app.main:app --reload


Caso dê erro no backend, necessário deixar a porta 8000 como pública.