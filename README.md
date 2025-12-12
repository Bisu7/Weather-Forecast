# 🌤️ Full-Stack Weather Platform

A modern, full-stack weather application built with Next.js and Spring Boot that provides real-time weather data and forecasts for any city worldwide.

![Next.js](https://img.shields.io/badge/Next.js-14.0-black?style=for-the-badge&logo=next.js)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?style=for-the-badge&logo=spring)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=java)
![React](https://img.shields.io/badge/React-18.2-blue?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- 🌡️ **Real-time Weather Data** - Get current weather conditions for any city
- 📅 **5-Day Forecast** - View detailed weather forecasts for the upcoming week
- 👤 **User Authentication** - Secure user registration and login system
- ⭐ **Favorite Cities** - Save and manage your favorite cities for quick access
- 🎨 **Modern UI** - Beautiful, responsive design built with Tailwind CSS
- 🔒 **Secure API** - RESTful API with Spring Security integration
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests

### Backend
- **Spring Boot 3.2** - Java framework
- **Spring Data JPA** - Database abstraction layer
- **Spring Security** - Authentication and authorization
- **H2 Database** - In-memory database (easily switchable to PostgreSQL)
- **Maven** - Dependency management

### External APIs
- **OpenWeatherMap API** - Weather data source

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm
- **Java** 17 or higher
- **Maven** 3.6+
- **OpenWeatherMap API Key** - [Get one here](https://openweathermap.org/api) (free tier available)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Bisu7/Weather-Forecast.git
cd fullstack-weather-platform
```

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd backend
```

#### Configure API Key

Set your OpenWeatherMap API key in one of the following ways:

**Option 1: Environment Variable (Recommended)**
```bash
# Windows PowerShell
$env:WEATHER_API_KEY="your-api-key-here"

# Linux/Mac
export WEATHER_API_KEY="your-api-key-here"
```

**Option 2: Update application.yml**
Edit `src/main/resources/application.yml`:
```yaml
weather:
  api:
    key: your-api-key-here
```

#### Build and Run

```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

The backend server will start on `http://localhost:8080/api`

### 3. Frontend Setup

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

#### Install Dependencies

```bash
npm install
```

#### Run Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📖 Usage

1. **Search Weather**: Enter a city name in the search bar and click "Search"
2. **View Current Weather**: See temperature, humidity, wind speed, and conditions
3. **Check Forecast**: Scroll down to view the 5-day weather forecast
4. **Register/Login**: Create an account to save favorite cities (feature coming soon)

## 🔌 API Endpoints

### Weather Endpoints

#### Get Current Weather
```http
GET /api/weather/current?city={cityName}
```

**Response:**
```json
{
  "city": "London",
  "temperature": 15.5,
  "feelsLike": 14.2,
  "humidity": 65,
  "pressure": 1013,
  "windSpeed": 5.2,
  "condition": "clear sky"
}
```

#### Get 5-Day Forecast
```http
GET /api/weather/forecast?city={cityName}
```

**Response:**
```json
{
  "city": {...},
  "forecasts": [
    {
      "date": "2024-01-15",
      "maxTemp": 18.5,
      "minTemp": 12.3,
      "condition": "few clouds"
    },
    ...
  ]
}
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "securepassword123"
}
```

## 📁 Project Structure

```
fullstack-weather-platform/
├── frontend/                    # Next.js frontend application
│   ├── app/
│   │   ├── components/          # React components
│   │   │   ├── Header.jsx
│   │   │   ├── WeatherCard.jsx
│   │   │   └── ForecastList.jsx
│   │   ├── layout.jsx           # Root layout
│   │   └── page.jsx             # Home page
│   ├── styles/
│   │   └── globals.css          # Global styles
│   ├── public/                  # Static assets
│   ├── package.json
│   ├── next.config.mjs
│   └── tailwind.config.cjs
│
└── backend/                     # Spring Boot backend application
    ├── src/main/java/com/example/weatherapp/
    │   ├── controller/          # REST controllers
    │   │   ├── WeatherController.java
    │   │   └── AuthController.java
    │   ├── service/             # Business logic
    │   │   ├── WeatherService.java
    │   │   └── UserService.java
    │   ├── model/               # Entity models
    │   │   ├── User.java
    │   │   └── FavoriteCity.java
    │   ├── repository/          # Data access layer
    │   │   └── UserRepository.java
    │   ├── config/              # Configuration
    │   │   └── SecurityConfig.java
    │   └── WeatherAppApplication.java
    ├── src/main/resources/
    │   └── application.yml      # Application configuration
    └── pom.xml                  # Maven dependencies
```

## 🔧 Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:h2:mem:weatherdb  # Change to PostgreSQL if needed
    username: sa
    password: 
  
  jpa:
    hibernate:
      ddl-auto: update

server:
  port: 8080
  servlet:
    context-path: /api

weather:
  api:
    key: ${WEATHER_API_KEY}
    base-url: https://api.openweathermap.org/data/2.5
```

### Frontend Configuration

The frontend is configured to proxy API requests to `http://localhost:8080/api` via `next.config.mjs`. Modify if your backend runs on a different port.

## 🏗️ Building for Production

### Frontend

```bash
cd frontend
npm run build
npm start
```

### Backend

```bash
cd backend
mvn clean package
java -jar target/weatherapp-0.0.1-SNAPSHOT.jar
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing weather data API
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Spring Boot](https://spring.io/projects/spring-boot) for the robust Java framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Your Name - [biswajitkr.dandapat@gmail.com](mailto:biswajitkr.dandapat@gmail.com)

Project Link: [https://github.com/Bisu7/Weather-Forecast](https://github.com/Bisu7/Weather-Forecast
)

---

⭐ If you like this project, please give it a star on GitHub!
