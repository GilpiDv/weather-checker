import { formatTemperature } from "../../helpers"
import type { Weather } from "../../hooks/useWeather"
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}

export default function WeatherDetail({weather} : WeatherDetailProps) {
  return (
    <div className={styles.container}>
        <h2>{weather.name}</h2>
        <div className={styles.tempAndIcon}>
            <img src={`/${weather.weather[0].icon}.png`} alt="Weather icon" />
            <p className={styles.current}>{ formatTemperature( weather.main.temp )}&deg;C</p>
        </div>
        <div className={styles.temperatures}>
            <p>Min: <span>{ formatTemperature( weather.main.temp_min )}&deg;C</span> </p>
            <p>Max: <span>{ formatTemperature( weather.main.temp_max )}&deg;C</span> </p>
        </div>
    </div>
  )
}
