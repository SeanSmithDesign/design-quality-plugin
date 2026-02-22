"use client";

import { useState, useEffect } from "react";
import { Cloud, Sun, Droplets, Wind, Eye, Gauge, Sunrise, Sunset, X, ChevronRight } from "lucide-react";

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

function WeatherSkeleton() {
  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 bg-muted rounded" />
        <div className="h-48 bg-muted rounded-2xl" />
        <div className="h-32 bg-muted rounded-2xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
    </main>
  );
}

export default function WeatherDashboard() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [selectedCity, setSelectedCity] = useState("San Francisco, CA");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setTimeout(() => setWeather(mockWeather), 500);
  }, [selectedCity]);

  if (!weather) return <WeatherSkeleton />;

  return (
    <main className="min-h-screen bg-background text-foreground p-8">
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">{weather.location}</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Updated just now. {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSearch(!showSearch)}
            aria-label="Toggle search"
            className="min-h-11 min-w-11 rounded-full bg-muted flex items-center justify-center transition-colors hover:bg-muted/80"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => {}}
            aria-label="Close"
            className="min-h-11 min-w-11 rounded-full bg-muted flex items-center justify-center transition-colors hover:bg-muted/80"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Temperature Card */}
      <section className="bg-card rounded-2xl p-8 mb-6 shadow-xs">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-7xl font-bold tracking-tighter text-foreground leading-tight">{weather.temperature}°</p>
            <p className="text-foreground/70 text-lg mt-2">{weather.condition}</p>
            <p className="text-muted-foreground text-sm mt-1">Feels like {weather.feelsLike}°</p>
          </div>
          <Sun className="w-20 h-20 text-accent" />
        </div>
      </section>

      {/* Hourly Forecast */}
      <section className="bg-card rounded-2xl p-6 mb-6 shadow-xs">
        <h2 className="text-lg font-semibold text-foreground mb-4">Hourly Forecast</h2>
        <div className="flex gap-6 overflow-x-auto">
          {weather.hourly.map((hour) => (
            <div key={hour.time} className="flex flex-col items-center gap-2 min-w-[60px]">
              <span className="text-muted-foreground text-xs">{hour.time}</span>
              {getWeatherIcon(hour.condition)}
              <span className="text-foreground font-semibold">{hour.temp}°</span>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Grid */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Humidity", value: `${weather.humidity}%`, icon: <Droplets className="w-5 h-5 text-accent" /> },
          { label: "Wind Speed", value: `${weather.windSpeed} mph`, icon: <Wind className="w-5 h-5 text-accent" /> },
          { label: "Visibility", value: `${weather.visibility} mi`, icon: <Eye className="w-5 h-5 text-accent" /> },
          { label: "Pressure", value: `${weather.pressure} hPa`, icon: <Gauge className="w-5 h-5 text-accent" /> },
        ].map((stat) => (
          <div key={stat.label} className="bg-card rounded-xl p-4 shadow-xs transition-shadow hover:shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              {stat.icon}
              <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          </div>
        ))}
      </section>

      {/* 7-Day Forecast */}
      <section className="bg-card rounded-2xl p-6 shadow-xs">
        <h2 className="text-lg font-semibold text-foreground mb-4">7-Day Forecast</h2>
        <div className="space-y-3">
          {weather.forecast.map((day) => (
            <div key={day.day} className="flex items-center justify-between py-3 border-b border-border last:border-0 transition-colors hover:bg-muted/50 -mx-2 px-2 rounded">
              <span className="text-foreground font-medium w-12">{day.day}</span>
              <div className="flex items-center gap-2">
                {getWeatherIcon(day.condition)}
                {day.precipitation > 0 && (
                  <span className="text-accent text-xs">{day.precipitation}%</span>
                )}
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-foreground font-semibold">{day.high}°</span>
                <div className="w-20 h-1 rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-accent/60 to-accent"
                    style={{ width: `${((day.high - day.low) / 30) * 100}%` }}
                  />
                </div>
                <span className="text-muted-foreground text-sm">{day.low}°</span>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </section>

      {/* Sunrise/Sunset */}
      <section className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sunrise className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Sunrise</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{weather.sunrise}</p>
        </div>
        <div className="bg-card rounded-xl p-4 shadow-xs">
          <div className="flex items-center gap-2 mb-2">
            <Sunset className="w-5 h-5 text-accent" />
            <span className="text-muted-foreground text-xs font-medium uppercase tracking-wide">Sunset</span>
          </div>
          <p className="text-2xl font-bold text-foreground">{weather.sunset}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <p className="text-muted-foreground text-xs">
          Weather data provided by OpenWeather. Updated every 15 minutes.
        </p>
      </footer>
    </main>
  );
}
