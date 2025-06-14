import axios from "axios";
import z from "zod";
import type { SearchType } from "../types";
import { useMemo, useState } from "react";

const WeatherDetails = z.object({
    id: z.number(),
    main: z.string(),
    description: z.string(),
    icon: z.string(),
});

type WeatherDetails = z.infer<typeof WeatherDetails>;

const Weather = z.object({
    name: z.string(),
    main: z.object({
        temp: z.number(),
        temp_max: z.number(),
        temp_min: z.number()
    }),
    weather: z.array(WeatherDetails),
});

export type Weather = z.infer<typeof Weather>;

const initialWeatherState: Weather = {
    name: '',
    main: {
        temp: 0,
        temp_max: 0,
        temp_min: 0
    },
    weather: [] as WeatherDetails[]
}

export default function useWeather() {

    const [weather, setWeather] = useState<Weather>(initialWeatherState)
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const fetchWeather = async (search : SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;
        setLoading(true);
        setWeather(initialWeatherState);
        setNotFound(false)
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            const { data } = await axios(geoUrl);

            if(!data[0]) {  
                setNotFound(true)
            }

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

            const { data: weather } = await axios(weatherUrl);
            const result = Weather.safeParse(weather);

            if(result.success) {
                setWeather(result.data);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const hasWeatherData = useMemo(() => weather.name, [weather])

    return {
        fetchWeather,
        weather,
        hasWeatherData,
        loading,
        notFound
    }
}