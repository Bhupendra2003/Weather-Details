const weatherButton = document.getElementById("getWeather");
const resultDiv = document.getElementById("result");

const weatherIcons = {
    "clear sky": "☀️",
    "few clouds": "🌤️",
    "scattered clouds": "⛅",
    "broken clouds": "🌥️",
    "shower rain": "🌦️",
    "rain": "🌧️",
    "light rain": "🌦️",
    "moderate rain": "🌧️",
    "thunderstorm": "⛈️",
    "snow": "❄️",
    "mist": "🌫️",
    "haze": "🌫️",
    "overcast clouds": "☁️",
    "fog": "🌁"
};

function getWeatherIcon(description) {
    const key = description.toLowerCase();
    return weatherIcons[key] || "🌡️"; // Default icon if not matched
}

weatherButton.addEventListener("click", () => {
    const city = document.getElementById("city").value;
    if (!city) {
        resultDiv.textContent = "Please enter a city name.";
        return;
    }

    fetch(`/weather?city=${city}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found or server not running");
            }
            return response.json();
        })
        .then((data) => {
            const { temperature, condition } = data;
            const icon = getWeatherIcon(condition);
            resultDiv.innerHTML = `
                <h2>Weather in ${city}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Condition: ${condition} ${icon}</p>
            `;
        })
        .catch((error) => {
            resultDiv.textContent = error.message;
        });
});
