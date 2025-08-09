document.getElementById('fetchWeather').addEventListener('click', function() {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.textContent = "Fetching weather data...";

    // Rohini coordinates (approximate)
    const lat = 28.7499;
    const lon = 77.0565;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("API Error");
            return response.json();
        })
        .then(data => {
            if (!data.current_weather) {
                resultDiv.textContent = "Weather data not available.";
                return;
            }
            const w = data.current_weather;
            resultDiv.innerHTML = `
                <h2>${w.temperature}°C</h2>
                <p><strong>Wind Speed:</strong> ${w.windspeed} km/h</p>
                <p><strong>Wind Direction:</strong> ${w.winddirection}&deg;</p>
                <p><strong>Weather Code:</strong> ${w.weathercode}</p>
                <p><small>Time: ${w.time.replace('T', ' ')}</small></p>
            `;
        })
        .catch(err => {
            resultDiv.textContent = "Failed to fetch weather data. Please try again later.";
        });
});
