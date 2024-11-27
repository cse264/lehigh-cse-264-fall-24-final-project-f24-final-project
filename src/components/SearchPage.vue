<template>
  <div class="weather-app">
    <h1>Welcome to WeatherWise!</h1>
    <div class="search-bar">
      <input
        type="text"
        placeholder="Enter a city"
      />
      <button>Search</button>
    </div>
  </div>
</template>

<script>
import '../assets/WeatherApp.css';
export default {
  name: "WeatherApp",
  data() {
    return {
      city: "",
      weatherData: null,
      error: null,
    };
  },
};
</script>