import axios from "axios";
// import z from "zod";
import { object, string, number, type InferOutput, parse } from 'valibot'
import type { SearchType } from "../types";

export default function useWeather() {

    // const isWeatherResponse = (weather: unknown) : weather is Weather => {
    //     return(
    //         Boolean(weather) && 
    //         typeof weather === 'object' && 
    //         typeof(weather as Weather).name === 'string' && 
    //         typeof(weather as Weather).main.temp === 'number' && 
    //         typeof(weather as Weather).main.temp_max === 'number' && 
    //         typeof(weather as Weather).main.temp_min === 'number'
    //     )
    // }

    // Zod
    // const Weather = z.object({
    //     name: z.string(),
    //     main: z.object({
    //         temp: z.number(),
    //         temp_max: z.number(),
    //         temp_min: z.number()
    //     })
    // });
    // type Weather = z.infer<typeof Weather>

    // Valibot
    const WeatherSchema = object({
        name: string(),
        main: object({
            temp: number(),
            temp_max: number(),
            temp_min: number()
        })
    });

    type Weather = InferOutput<typeof WeatherSchema>;


    const fetchWeather = async (search : SearchType) => {
        const appId = import.meta.env.VITE_API_KEY;

        try {
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;

            const { data } = await axios(geoUrl);

            const lat = data[0].lat;
            const lon = data[0].lon;

            const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;
            
            /* Cast the type (not recommended) <Weather> */
            // const { data: weather } = await axios<Weather>(weatherUrl);
            // console.log(weather.main.temp);

            /* Type Guard (recommended without libraries) */
            // const { data: weather } = await axios(weatherUrl);
            // const result = isWeatherResponse(weather);
            // if(result) {
            //     /*  */
            // }

            /* Zod (optimal but heavy) */
            // const { data: weather } = await axios(weatherUrl);
            // const result = Weather.safeParse(weather);

            /* Valibot */
            const { data: weather } = await axios(weatherUrl);
            const result = parse(WeatherSchema, weather);
            console.log(result);

        } catch (error) {
            console.log(error);
        }
    }

    return {
        fetchWeather
    }
}