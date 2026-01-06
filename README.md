# NivesX - Cryptocurrency Trading Application

A full-stack cryptocurrency trading platform built with Spring Boot and React, featuring real-time coin data, wallet management, portfolio tracking, and automated trading.

![Java](https://img.shields.io/badge/Java-17-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-brightgreen)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

### User Management
- ✅ User registration and authentication
- ✅ JWT-based security
- ✅ Two-factor authentication (2FA)
- ✅ Password reset via email OTP
- ✅ Google OAuth integration (optional)

### Trading Features
- ✅ Real-time cryptocurrency prices
- ✅ Buy and sell cryptocurrencies
- ✅ Order management
- ✅ Trading history
- ✅ Portfolio tracking
- ✅ Profit/loss calculation

### Wallet Management
- ✅ Digital wallet
- ✅ Deposit funds
- ✅ Withdraw funds
- ✅ Wallet-to-wallet transfers
- ✅ Transaction history

### Market Data
- ✅ 50+ cryptocurrencies supported
- ✅ Live price updates
- ✅ Historical price charts
- ✅ Market cap and volume data
- ✅ Trending coins
- ✅ Coin search functionality

### Additional Features
- ✅ Watchlist for favorite coins
- ✅ AI-powered chatbot (Gemini)
- ✅ Payment gateway integration (Stripe, Razorpay)
- ✅ Admin withdrawal approval system
- ✅ Responsive design

## 🏗️ Architecture

### Backend (Spring Boot)
```
Backend-Spring boot/
├── src/main/java/com/treading_backend/
│   ├── controller/      # REST API endpoints
│   ├── service/         # Business logic
│   ├── repository/      # Data access layer
│   ├── model/           # Entity models
│   ├── config/          # Security & CORS config
│   ├── request/         # Request DTOs
│   ├── response/        # Response DTOs
│   └── exception/       # Error handling
└── src/main/resources/
    └── application.properties
```

### Frontend (React)
```
Frontend-React/
├── src/
│   ├── Api/             # API configuration
│   ├── Redux/           # State management
│   │   ├── Auth/
│   │   ├── Coin/
│   │   ├── Wallet/
│   │   ├── Order/
│   │   └── ...
│   ├── pages/           # Page components
│   ├── components/      # Reusable components
│   └── assets/          # Static assets
└── package.json
```

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Node.js 16+ and npm
- MySQL 8.0+
- Maven (included as wrapper)

### Installation

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd "Source Code"
```

#### 2. Configure Backend
```bash
cd "Backend-Spring boot"
```

Edit `src/main/resources/application.properties`:
```properties
# Database
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

# Email (for OTP)
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password

# CoinGecko API (required)
coingecko.api.key=your-api-key

# Gemini AI (for chatbot)
gemini.api.key=your-gemini-key
```

#### 3. Setup Database
```bash
mysql -u root -p
```
```sql
CREATE DATABASE treading;
```

#### 4. Start the Application

**Option 1: Automated (Recommended)**
```powershell
# Windows
.\start.ps1

# Linux/Mac
chmod +x start.sh
./start.sh
```

**Option 2: Manual**

Backend:
```bash
cd "Backend-Spring boot"
./mvnw spring-boot:run
```

Frontend:
```bash
cd Frontend-React
npm install
npm run dev
```

#### 5. Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:5454

## 📚 Documentation

- **[API Setup Guide](API_SETUP_GUIDE.md)** - Detailed setup instructions
- **[API Endpoints](API_ENDPOINTS.md)** - Complete API reference
- **[Checklist](CHECKLIST.md)** - Pre-launch checklist
- **[Summary](SUMMARY.md)** - Project overview

## 🔑 API Keys Required

### CoinGecko (Required)
Get your free API key: https://www.coingecko.com/en/api
- Used for: Real-time coin prices, market data

### Gemini AI (Required for chatbot)
Get your API key: https://makersuite.google.com/app/apikey
- Used for: AI-powered trading assistant

### Stripe (Optional)
Get your test keys: https://dashboard.stripe.com/test/apikeys
- Used for: Payment processing

### Razorpay (Optional)
Get your test keys: https://dashboard.razorpay.com/app/keys
- Used for: Alternative payment processing

### Gmail App Password (Required for OTP)
1. Enable 2-Step Verification
2. Generate App Password: https://myaccount.google.com/apppasswords
- Used for: Email OTP, notifications

## 🧪 Testing

### Test Backend
```bash
curl http://localhost:5454/
# Should return: {"message":"welcome to crypto treading platform working fine","status":true}
```

### Test Public Endpoints
```bash
# Get coin list
curl http://localhost:5454/coins?page=1

# Get trending coins
curl http://localhost:5454/coins/trading
```

### Test Authentication
```bash
# Register
curl -X POST http://localhost:5454/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","email":"test@example.com","password":"Test123","mobile":"+1234567890"}'
```

## 🔒 Security

- JWT-based authentication
- BCrypt password hashing
- CORS protection
- SQL injection protection (JPA)
- XSS protection
- Secure token storage
- Two-factor authentication support

## 🛠️ Tech Stack

### Backend
- **Framework:** Spring Boot 3.2.4
- **Language:** Java 17
- **Database:** MySQL 8.0
- **Security:** Spring Security, JWT
- **ORM:** Spring Data JPA (Hibernate)
- **Build Tool:** Maven

### Frontend
- **Framework:** React 18.2.0
- **State Management:** Redux with Redux Thunk
- **Routing:** React Router DOM
- **UI Library:** Radix UI, Tailwind CSS
- **Charts:** ApexCharts, Recharts
- **HTTP Client:** Axios
- **Build Tool:** Vite

### External Services
- **Coin Data:** CoinGecko API
- **AI Chatbot:** Google Gemini AI
- **Payments:** Stripe, Razorpay
- **Email:** Gmail SMTP

## 📊 API Endpoints Overview

| Category | Endpoints | Description |
|----------|-----------|-------------|
| Authentication | 7 | Signup, login, 2FA, password reset |
| User Management | 5 | Profile, verification, settings |
| Coins | 6 | List, search, details, charts |
| Wallet | 5 | Balance, transactions, deposits |
| Orders | 3 | Buy, sell, history |
| Assets | 3 | Portfolio, holdings |
| Watchlist | 3 | Favorites management |
| Withdrawals | 4 | Requests, approvals |
| Payments | 1 | Payment processing |
| ChatBot | 3 | AI assistant |

**Total:** 50+ endpoints

## 🎯 Development Roadmap

### Phase 1: Setup ✅
- [x] Backend structure
- [x] Frontend structure
- [x] API integration
- [x] Documentation

### Phase 2: Configuration ⏳
- [ ] Add API keys
- [ ] Configure email
- [ ] Setup payment gateways
- [ ] Test all features

### Phase 3: Enhancement 📋
- [ ] Add data caching
- [ ] Implement rate limiting
- [ ] Add monitoring
- [ ] Performance optimization

### Phase 4: Deployment 🚀
- [ ] Production configuration
- [ ] Database migration
- [ ] CI/CD pipeline
- [ ] Domain & SSL

## 🐛 Known Issues

1. **Email Configuration:** Requires Gmail app password
2. **API Rate Limits:** CoinGecko free tier has limits
3. **Payment Testing:** Requires valid API keys

See [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md) for troubleshooting.

## 📝 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions:
1. Check the [API_SETUP_GUIDE.md](API_SETUP_GUIDE.md)
2. Review [CHECKLIST.md](CHECKLIST.md)
3. Check existing issues
4. Create a new issue if needed

## 🙏 Acknowledgments

- CoinGecko for cryptocurrency data
- Google Gemini for AI capabilities
- Spring Boot team
- React team
- All contributors

---

**Built with ❤️ for crypto traders**

**Happy Trading! 🚀**
