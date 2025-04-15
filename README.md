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


//Comando para rodar o backend no codespace, fora da pasta app.

uvicorn main:app --host 0.0.0.0 --port 8000 --reload

A porta 8000 que se abrirá deverá ser modificada para visibilidade pública.

https://curly-space-doodle-r94vj7xxqwj2x6w-8000.app.github.dev/docs //Para executar o post e testar os gráficos.




//Comando para rodar o backend fora do codespace, fora da pasta app.

uvicorn app.main:app --reload

http://127.0.0.1:8000/docs //Para executar o post e testar os gráficos.



exemplo de post
{
  "device_id": "03",
  "hora": "2025-04-13T08:30",
  "potencia": 200.0
}