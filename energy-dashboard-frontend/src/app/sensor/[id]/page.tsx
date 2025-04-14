"use client";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export default function SensorPage() {
  const router = useRouter();
  const { id } = useParams();
  const [startDate, setStartDate] = useState("2025-04-13T08:00");
  const [endDate, setEndDate] = useState("2025-04-13T22:00");
  const [sensorData, setSensorData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/summary/${id}`, {
          params: {
            start_date: startDate,
            end_date: endDate,
          },
        });
        setSensorData(response.data);
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    fetchData();
  }, [id, startDate, endDate]);

  return (
    <div className="min-h-screen p-10 text-white min-w-screen">
      <button
        onClick={() => router.push("/")}
        className="flex items-center gap-2 text-sm text-orange-400 hover:text-white mb-10"
      >
        <ArrowLeft size={18} />
        Voltar para o Dashboard
      </button>

      <h1 className="text-3xl font-bold mb-6">Sensor {id}</h1>
      <p className="mb-4 text-gray-300">Variação de Potência por Hora.</p>

      <div className="flex gap-4 mb-6 flex-wrap">
        <label className="flex flex-col text-sm">
          Data Início:
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded p-2 bg-zinc-800 text-white border border-zinc-700"
          />
        </label>

        <label className="flex flex-col text-sm">
          Data Fim:
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded p-2 bg-zinc-800 text-white border border-zinc-700"
          />
        </label>
      </div>

      <div className="bg-zinc-800 p-6 rounded-xl shadow-xl">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={sensorData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#555" />
            <XAxis
              dataKey="hora"
              stroke="#aaa"
              tickFormatter={(tick) =>
                new Date(tick).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />
            <YAxis stroke="#aaa" unit="W" />
            <Tooltip
              cursor={{ fill: "rgba(218,152,29,0.27)" }}
              contentStyle={{
                backgroundColor: "#1e1e1e",
                border: "1px solid #FFA500",
                borderRadius: 8,
              }}
              labelFormatter={(label) => new Date(label).toLocaleString("pt-BR")}
            />
            <Bar
              dataKey="potencia"
              fill="#FFA500"
              animationDuration={500}
              barSize={25}
              activeBar={{ fill: "#FF8C00" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}