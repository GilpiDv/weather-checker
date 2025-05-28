import styles from './App.module.css'
import Alert from './components/Alert/Alert';
import Form from './components/Form/Form'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner';
import WeatherDetail from './components/WeatherDetail/WeatherDetail';
import useWeather from './hooks/useWeather'

function App() {

    const { fetchWeather, weather, hasWeatherData, loading, notFound } = useWeather();

    return (
        <>
            <h1 className={styles.title}>Weather</h1>

            <div className={styles.container}>
                <Form 
                    fetchWeather={fetchWeather}    
                />
                {loading && <LoadingSpinner />}
                {hasWeatherData && 
                    <WeatherDetail 
                        weather={weather}
                    />
                }
                {notFound && <Alert>City not found</Alert>}
            </div>
        </>
    )
}

export default App
