# Get Memories Travel

A full-stack travel website that connects customers with customized travel plans and professional videography/photography services. Features dual portals for customers and contractors.

## Features

### Customer Portal
- **Travel Submission Form**: Submit preferences for destination, dates, budget, and party size
- **Customized Travel Plans**: Receive personalized itineraries with media opportunities highlighted
- **Package Booking**: Choose from Basic, Premium, or Luxury packages with photographer/videographer services
- **Contractor Management**: Browse and hire photographers and videographers
- **Booking Dashboard**: Track bookings, payments, and communication
- **Reviews & Ratings**: Rate contractors after completed jobs

### Contractor Portal
- **Professional Profile**: Showcase portfolio, experience, and certifications
- **Availability Management**: Set your availability and service coverage areas
- **Job Board**: Browse and apply for available travel jobs
- **Booking Management**: Accept jobs, communicate with customers, and track schedules
- **Payment Tracking**: Invoice management and payment history
- **Customer Reviews**: Build reputation through customer feedback

## Color Scheme

- **Primary**: Dark Blue (#1a3a52)
- **Secondary**: Light Blue (#87ceeb)
- **Accent**: Tan (#c9b88a)

## Tech Stack

- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose ORM)
- **Frontend**: (To be added - React/Next.js recommended)
- **Authentication**: JWT
- **Password Security**: bcryptjs

## Project Structure

```
getmemoriestravel/
├── src/
│   ├── models/
│   │   ├── User.js              # Base user model
│   │   ├── Customer.js          # Customer discriminator
│   │   ├── Contractor.js        # Contractor discriminator
│   │   ├── Submission.js        # Travel submission form data
│   │   ├── TravelPlan.js        # Customized itineraries
│   │   ├── Booking.js           # Job bookings
│   │   ├── JobPosting.js        # Available contractor jobs
│   │   ├── Message.js           # Portal messaging
│   │   └── Review.js            # Ratings and reviews
│   ├── controllers/             # Route handlers
│   ├── services/                # Business logic
│   ├── middleware/              # Express middleware
│   ├── routes/                  # API routes
│   └── utils/                   # Utilities
├── tests/                       # Test files
├── server.js                    # Express entry point
├── package.json
├── .env.example
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance (local or cloud)
- npm or yarn

### Installation

```bash
git clone <repo-url>
cd getmemoriestravel
npm install
```

### Environment Variables

Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/getmemoriestravel
JWT_SECRET=your-jwt-secret-key
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Running Locally

```bash
npm run dev
```

Server runs on `http://localhost:5000`

## API Endpoints (To be implemented)

### Authentication
- `POST /api/auth/register` - Register new user (customer or contractor)
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Customer Portal
- `POST /api/submissions` - Submit travel request
- `GET /api/submissions/:id` - Get submission details
- `GET /api/travel-plans/:submissionId` - Get customized plan
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get customer bookings
- `GET /api/contractors` - Browse contractors
- `POST /api/reviews` - Leave review

### Contractor Portal
- `GET /api/jobs` - Get available jobs
- `POST /api/jobs/:id/apply` - Apply for job
- `GET /api/contractors/:id/bookings` - Get contractor bookings
- `PUT /api/contractors/:id/availability` - Update availability
- `POST /api/contractors/:id/profile` - Update profile

### Messaging
- `POST /api/messages` - Send message
- `GET /api/messages` - Get messages
- `PUT /api/messages/:id/read` - Mark as read

## Development

```bash
npm run dev     # Start dev server with nodemon
npm test        # Run tests
```

## License

MIT
