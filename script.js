const apiKey = "bd5ebc361a2afac9c433de4d3286cabd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    alert("City not found");
    return;
  }

  const data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = `${Math.round(data.main.temp)}°C`;
  document.querySelector(".humidity").innerHTML = `${data.main.humidity}%`;
  document.querySelector(".wind").innerHTML = `${data.wind.speed} km/h`;

  // Set weather icon based on the condition
  const icon = document.querySelector(".weather-icon");
  const weatherMain = data.weather[0].main.toLowerCase();

  if (weatherMain.includes("cloud")) {
    icon.src = "img/clouds.png";
  } else if (weatherMain.includes("clear")) {
    icon.src = "img/clear.png";
  } else if (weatherMain.includes("rain")) {
    icon.src = "img/rain.png";
  } else if (weatherMain.includes("snow")) {
    icon.src = "img/snow.png";
  } else {
    icon.src = "img/clouds.png"; // fallback
  }

  // Make weather info visible
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".details").style.display = "flex";
}

// Hide weather info initially
document.querySelector(".weather").style.display = "none";
document.querySelector(".details").style.display = "none";

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city !== "") {
    checkWeather(city);
  }
});
