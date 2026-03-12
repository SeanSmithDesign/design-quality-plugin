"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, Droplets, Wind, Eye, Gauge, Sunrise, Sunset, X, ChevronRight, MapPin, Bell, Settings, Search, Home, Star, Map, Calendar } from "lucide-react";

// Types
interface WeatherData {
  location: string;
  temperature: number;
  feelsLike: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: string;
  sunset: string;
  forecast: ForecastDay[];
  hourly: HourlyForecast[];
}

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  precipitation: number;
}

interface HourlyForecast {
  time: string;
  temp: number;
  condition: string;
}

// Mock data
const mockWeather: WeatherData = {
  location: "San Francisco, CA",
  temperature: 68,
  feelsLike: 65,
  condition: "Partly Cloudy",
  humidity: 72,
  windSpeed: 12,
  visibility: 10,
  pressure: 1013,
  sunrise: "6:42 AM",
  sunset: "7:18 PM",
  forecast: [
    { day: "Mon", high: 70, low: 58, condition: "sunny", precipitation: 0 },
    { day: "Tue", high: 68, low: 56, condition: "cloudy", precipitation: 10 },
    { day: "Wed", high: 65, low: 54, condition: "rainy", precipitation: 80 },
    { day: "Thu", high: 62, low: 52, condition: "rainy", precipitation: 60 },
    { day: "Fri", high: 66, low: 55, condition: "cloudy", precipitation: 20 },
    { day: "Sat", high: 71, low: 58, condition: "sunny", precipitation: 0 },
    { day: "Sun", high: 73, low: 60, condition: "sunny", precipitation: 5 },
  ],
  hourly: [
    { time: "Now", temp: 68, condition: "cloudy" },
    { time: "2PM", temp: 70, condition: "sunny" },
    { time: "3PM", temp: 71, condition: "sunny" },
    { time: "4PM", temp: 69, condition: "cloudy" },
    { time: "5PM", temp: 67, condition: "cloudy" },
    { time: "6PM", temp: 64, condition: "cloudy" },
  ],
};

function getWeatherIcon(condition: string) {
  switch (condition) {
    case "sunny": return <Sun className="w-5 h-5" />;
    case "rainy": return <Droplets className="w-5 h-5" />;
    default: return <Cloud className="w-5 h-5" />;
  }
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("San Francisco, CA");

  useEffect(() => {
    setTimeout(() => setWeather(mockWeather), 500);
  }, [selectedCity]);

  // Violation: No loading state — returns null
  if (!weather) return null;

  return (
    // Violation: No semantic HTML, hardcoded colors
    <div className="min-h-screen bg-[#1a1a2e] text-white p-5">
      {/* Violation: div instead of header, hardcoded colors, no aria-labels */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <div className="text-3xl font-bold text-white">{weather.location}</div>
          {/* Violation: AI-default copy patterns (#21) */}
          <p className="text-gray-400 text-sm mt-1">
            Unlock the power of real-time weather insights — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-2">
          {/* Violation: Touch targets too small (32px), no aria-labels */}
          <button className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Search className="w-4 h-4" />
          </button>
          <button className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </button>
          <button className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Violation: 8+ ungrouped nav items (Hick's Law), identical styling */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {["Home", "Search", "Favorites", "Map", "Calendar", "Alerts", "Settings", "History", "Radar"].map((item) => (
          <button key={item} className="px-3 py-1.5 bg-gray-700 rounded text-white text-xs whitespace-nowrap">
            {item}
          </button>
        ))}
      </div>

      {/* Violation: Hardcoded hex, no transitions, off-grid spacing */}
      <div className="bg-[#16213e] rounded-2xl p-7 mb-5">
        <div className="flex items-start justify-between">
          <div>
            {/* Violation: No responsive heading sizes */}
            <p className="text-7xl font-bold text-white leading-tight">{weather.temperature}°</p>
            {/* Violation: All text-white, no hierarchy */}
            <p className="text-white text-lg mt-2">{weather.condition}</p>
            <p className="text-white text-sm mt-1">Feels like {weather.feelsLike}°</p>
          </div>
          {/* Violation: Hardcoded color */}
          <Sun className="w-20 h-20 text-[#f39c12]" />
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-[#16213e] rounded-2xl p-5 mb-5">
        <div className="text-lg font-semibold text-white mb-4">Hourly Forecast</div>
        <div className="flex gap-6 overflow-x-auto">
          {weather.hourly.map((hour) => (
            <div key={hour.time} className="flex flex-col items-center gap-2 min-w-[60px]">
              <span className="text-gray-400 text-xs">{hour.time}</span>
              {getWeatherIcon(hour.condition)}
              <span className="text-white font-semibold">{hour.temp}°</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Grid — Violation: off-grid spacing (p-5, gap-3.5), no transitions, equal-width columns (#22) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mb-5">
        {[
          { label: "Humidity", value: `${weather.humidity}%`, icon: <Droplets className="w-5 h-5 text-blue-400" /> },
          { label: "Wind Speed", value: `${weather.windSpeed} mph`, icon: <Wind className="w-5 h-5 text-green-400" /> },
          { label: "Visibility", value: `${weather.visibility} mi`, icon: <Eye className="w-5 h-5 text-purple-400" /> },
          { label: "Pressure", value: `${weather.pressure} hPa`, icon: <Gauge className="w-5 h-5 text-red-400" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#16213e] rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              {stat.icon}
              <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 7-Day Forecast — Violation: no hover states, no transitions */}
      <div className="bg-[#16213e] rounded-2xl p-5">
        <div className="text-lg font-semibold text-white mb-4">7-Day Forecast</div>
        <div className="space-y-3">
          {weather.forecast.map((day) => (
            <div key={day.day} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
              <span className="text-white font-medium w-12">{day.day}</span>
              <div className="flex items-center gap-2">
                {getWeatherIcon(day.condition)}
                {day.precipitation > 0 && (
                  <span className="text-blue-400 text-xs">{day.precipitation}%</span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-white font-semibold">{day.high}°</span>
                <div className="w-20 h-1 rounded-full bg-gray-700">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#f39c12] to-[#e74c3c]"
                    style={{ width: `${((day.high - day.low) / 30) * 100}%` }}
                  />
                </div>
                <span className="text-gray-400 text-sm">{day.low}°</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </div>
          ))}
        </div>
      </div>

      {/* Sunrise/Sunset — Violation: off-grid spacing, hardcoded colors */}
      <div className="grid grid-cols-2 gap-3.5 mt-5">
        <div className="bg-[#16213e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sunrise className="w-5 h-5 text-[#f39c12]" />
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Sunrise</span>
          </div>
          <p className="text-2xl font-bold text-white">{weather.sunrise}</p>
        </div>
        <div className="bg-[#16213e] rounded-xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Sunset className="w-5 h-5 text-[#f39c12]" />
            <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Sunset</span>
          </div>
          <p className="text-2xl font-bold text-white">{weather.sunset}</p>
        </div>
      </div>

      {/* Footer — Violation: em dash in copy */}
      <div className="mt-5 text-center">
        <p className="text-gray-500 text-xs">
          Weather data — provided by OpenWeather — updated every 15 minutes.
        </p>
      </div>
    </div>
  );
}
