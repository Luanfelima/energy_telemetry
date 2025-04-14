"use client"; //Usasse para o UseRouter rodar no lado cliente
import { useRouter } from "next/navigation";

const statusIcon = {
  online: "🟢",
  offline: "🔴",
  desconhecido: "⚪",
};

interface Sensor {
  id: string;
  ultimaLeitura: string;
  energiaHoje: string;
  potenciaMedia: string;
  status: "online" | "offline" | "desconhecido";
}

const sensores: Sensor[] = [
  {
    id: "01",
    ultimaLeitura: "23:45",
    energiaHoje: "12.5 kWh",
    potenciaMedia: "150W",
    status: "online",
  },
  {
    id: "02",
    ultimaLeitura: "20:50",
    energiaHoje: "14.3 kWh",
    potenciaMedia: "160W",
    status: "offline",
  },
  {
    id: "03",
    ultimaLeitura: "22:30",
    energiaHoje: "20.0 kWh",
    potenciaMedia: "200W",
    status: "online",
  },
  {
    id: "04",
    ultimaLeitura: "10:30",
    energiaHoje: "0 kWh",
    potenciaMedia: "12,5W",
    status: "desconhecido",
  },
];

export default function Home() {
  const router = useRouter();
  return (
    <div className="grid grid-rows-[1px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[30px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold text-center sm:text-left">Nvidia Dashboard</h1>
        <p className="text-sm text-center sm:text-left text-gray-100">
          Monitoramento de sensores de energia em tempo real.
        </p>

        <div className="w-full max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {sensores.map((sensor) => (
              <div
                key={sensor.id}
                onClick={() => router.push(`/sensor/${sensor.id}`)}
                className="bg-[rgba(255,140,0,0.2)] p-6 rounded-lg shadow-lg hover:bg-[rgba(170,86,6,0.64)] cursor-pointer transition-transform hover:scale-[1.02]"
              >
                <h2 className="font-semibold text-lg">
                  {statusIcon[sensor.status]} Sensor {sensor.id}
                </h2>
                <p className="text-sm text-gray-300">Última Leitura: {sensor.ultimaLeitura}</p>
                <p className="text-sm text-gray-300">Energia Consumida Hoje: {sensor.energiaHoje}</p>
                <p className="font-bold text-xl text-orange-400">
                  Potência Média: {sensor.potenciaMedia}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
