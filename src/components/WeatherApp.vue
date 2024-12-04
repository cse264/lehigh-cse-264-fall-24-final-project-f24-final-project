<template>
    <div>
        <h1>Weather App</h1>
        <input v-model="city" placeholder="Enter city name" />
        <button @click="getWeather">Search</button>
        <div v-if="weather">
            <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
            <p>Temperature: {{ weather.main.temp }}°C</p>
            <p>Weather: {{ weather.weather[0].description }}</p>
            <p>Humidity: {{ weather.main.humidity }}%</p>
            <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
        </div>
        <div v-if="forecast">
            <h2>5-Day Forecast</h2>
            <div v-for="(item, index) in forecast" :key="index">
                <p><strong>{{ item.date }}</strong>: {{ item.temp }}°C, {{ item.description }}</p>
            </div>
        </div>
        <p v-if="error">{{ error }}</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            city: '',
            weather: null,
            forecast: null,
            error: ''
        };
    },
    methods: {
        async getWeather() {
            const apiKey = '0dbe257664819cb480c15490a3d5013e';
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${this.city}&limit=1&appid=${apiKey}`;
            this.error = '';
            this.weather = null;
            this.forecast = null;

            if (!this.city.trim()) {
                this.error = 'Please enter a city name!';
                return;
            }

            try {
                // Fetch geocoding data
                const geoResponse = await fetch(geoUrl);
                const geoData = await geoResponse.json();
                if (!geoData.length) {
                    this.error = 'City not found!';
                    return;
                }

                const { lat, lon } = geoData[0]; // Removed name and country destructuring

                // Fetch current weather
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                const weatherResponse = await fetch(weatherUrl);
                const weatherData = await weatherResponse.json();

                if (weatherData.cod === 200) {
                    this.weather = weatherData;

                    // Fetch 5-day forecast
                    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                    const forecastResponse = await fetch(forecastUrl);
                    const forecastData = await forecastResponse.json();

                    if (forecastData.cod === '200') {
                        this.forecast = forecastData.list
                            .filter((item, index) => index % 8 === 0) // Get one entry per day
                            .map(item => ({
                                date: new Date(item.dt * 1000).toLocaleDateString(),
                                temp: item.main.temp,
                                description: item.weather[0].description
                            }));
                    }
                } else {
                    this.error = 'City not found!';
                }
            } catch (err) {
                this.error = 'Something went wrong.';
            }
        }
    }
};
</script>
