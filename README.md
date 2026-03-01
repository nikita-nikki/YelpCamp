#  YelpCamp

> A full-stack web application for discovering, sharing, and reviewing campgrounds. Built with modern web technologies to provide an interactive platform for outdoor enthusiasts.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://yelpcamp-nnf2.onrender.com/)


---

##  Table of Contents

- [Live Links](#live-links)
- [Project Overview](#project-overview)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

##  Live Links

### Production Deployment
**Live Application:** [https://yelpcamp-nnf2.onrender.com/](https://yelpcamp-nnf2.onrender.com/)

### Repository
**GitHub:** [https://github.com/nikita-nikki/YelpCamp](https://github.com/nikita-nikki/YelpCamp)

---

##  Project Overview

YelpCamp is a comprehensive campground discovery and review platform that allows users to:
- Browse and search for campgrounds
- Create detailed campground listings with images and location data
- Leave reviews and ratings
- View campgrounds on an interactive map
- Manage their own campground listings

The application follows RESTful principles and implements secure authentication, authorization, and data validation.

---

##  System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                          │
│  (Browser - EJS Templates, Bootstrap, JavaScript)           │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│                    Application Layer                         │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Express.js Server (app.js)                          │  │
│  │  - Session Management (MongoDB Store)                │  │
│  │  - Passport.js Authentication                        │  │
│  │  - Flash Messages                                    │  │
│  │  - Error Handling                                    │  │
│  └──────────────────────────────────────────────────────┘  │
└───────────────────────┬─────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        │               │               │
        ▼               ▼               ▼
┌──────────────┐  ┌──────────────┐ ┌──────────────┐
│   Routes     │  │ Controllers  │ │  Middleware  │
│              │  │              │ │              │
│ - /          │  │ - Users      │ │ - Auth       │
│ - /campgrounds│ │ - Campgrounds│ │ - Validation │
│ - /reviews   │  │ - Reviews    │ │ - Authorization│
│ - /users     │  │              │ │              │
└───────┬──────┘  └──────┬───────┘ └──────┬───────┘
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer                             │
│  ┌──────────────────┐  ┌──────────────────┐                 │
│  │   MongoDB        │  │   Cloudinary     │                 │
│  │   - Users        │  │   - Image Storage│                 │
│  │   - Campgrounds  │  │   - CDN          │                 │
│  │   - Reviews      │  │                  │                 │
│  └──────────────────┘  └──────────────────┘                 │
│                                                             │
│  ┌──────────────────┐                                       │
│  │   MapTiler API   │                                       │
│  │   - Geocoding    │                                       │
│  │   - Maps         │                                       │
│  └──────────────────┘                                       │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

1. **User Authentication Flow:**
   - User registers/logs in → Passport.js validates credentials → Session created → User authenticated

2. **Campground Creation Flow:**
   - User submits form → Multer uploads images to Cloudinary → Data validated (Joi) → Geocoded via MapTiler → Saved to MongoDB

3. **Review Flow:**
   - User submits review → Validated → Saved to MongoDB → Linked to campground → Author verified

### Database Schema

```
User
├── _id (ObjectId)
├── email (String, unique)
└── username (String, via passport-local-mongoose)

Campground
├── _id (ObjectId)
├── title (String)
├── images (Array of ImageSchema)
├── geometry (GeoJSON Point)
├── price (Number)
├── description (String)
├── location (String)
├── author (ObjectId → User)
└── reviews (Array of ObjectId → Review)

Review
├── _id (ObjectId)
├── body (String)
├── rating (Number, 1-5)
└── author (ObjectId → User)
```

---

##  Features

### Core Functionality
-  **User Authentication & Authorization**
  - Secure registration and login system
  - Session-based authentication with MongoDB store
  - Protected routes and resource ownership verification

-  **Campground Management**
  - Create, read, update, and delete campgrounds
  - Multiple image uploads with Cloudinary integration
  - Location-based search and filtering
  - Interactive map visualization

-  **Review System**
  - Star-based rating system (1-5 stars)
  - Text reviews and comments
  - Review ownership and deletion
  - Cascading deletion when campground is removed

-  **Interactive Maps**
  - MapTiler integration for geocoding
  - Cluster map view for multiple campgrounds
  - Individual campground location display
  - Popup markers with campground details

-  **Security Features**
  - MongoDB injection protection
  - Input validation with Joi schemas
  - XSS protection
  - Secure session management
  - Authorization middleware

---

##  Technologies Used

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | JavaScript runtime environment |
| **Express.js** | 5.1.0 | Web application framework |
| **MongoDB** | Latest | NoSQL database |
| **Mongoose** | 8.17.0 | ODM library for MongoDB |
| **Passport.js** | 0.7.0 | Authentication middleware |
| **Passport-Local** | 1.0.0 | Local authentication strategy |
| **Express-Session** | 1.18.2 | Session management |
| **Connect-Mongo** | 3.2.0 | MongoDB session store |
| **Joi** | 18.0.0 | Schema validation |
| **Multer** | 1.4.5 | File upload handling |
| **Cloudinary** | 1.41.3 | Image storage and CDN |
| **MapTiler Client** | 1.8.1 | Geocoding and mapping |
| **Express-Mongo-Sanitize** | 2.2.0 | MongoDB injection protection |
| **Connect-Flash** | 0.1.1 | Flash message middleware |
| **Method-Override** | 3.0.0 | HTTP method override |
| **Dotenv** | 17.2.1 | Environment variable management |

### Frontend
| Technology | Purpose |
|------------|---------|
| **EJS** | Server-side templating engine |
| **EJS-Mate** | Layout support for EJS |
| **Bootstrap** | CSS framework for responsive UI |
| **HTML5** | Markup language |
| **CSS3** | Styling |
| **JavaScript** | Client-side interactivity |

---

##  API Documentation

### Base URL
```
Production: https://yelpcamp-nnf2.onrender.com
Local: http://localhost:3000
```

### Authentication Endpoints

#### Register User
```http
POST /register
Content-Type: application/x-www-form-urlencoded

username=<username>&email=<email>&password=<password>
```

**Response:**
- Success: Redirects to `/campgrounds`
- Error: Returns error flash message

---

#### Login User
```http
POST /login
Content-Type: application/x-www-form-urlencoded

username=<username>&password=<password>
```

**Response:**
- Success: Redirects to original URL or `/campgrounds`
- Error: Returns error flash message, redirects to `/login`

---

#### Logout User
```http
GET /logout
```

**Response:**
- Success: Redirects to `/campgrounds`
- Clears user session

---

### Campground Endpoints

#### Get All Campgrounds
```http
GET /campgrounds
```

**Response:**
- Returns HTML page with list of all campgrounds
- Includes search and filter functionality

**Query Parameters:**
- `search`: Search term for campground title/location
- `page`: Page number for pagination

---

#### Get Single Campground
```http
GET /campgrounds/:id
```

**Parameters:**
- `id` (required): Campground MongoDB ObjectId

**Response:**
- Returns HTML page with campground details
- Includes reviews, map, and images

---

#### Create Campground
```http
POST /campgrounds
Content-Type: multipart/form-data
Authorization: Required (Logged in user)

campground[title]=<title>
campground[price]=<price>
campground[location]=<location>
campground[description]=<description>
image=<file1>
image=<file2>
...
```

**Validation:**
- `title`: Required, string
- `price`: Required, number, min: 0
- `location`: Required, string
- `description`: Required, string
- `image`: Optional, image files

**Response:**
- Success: Creates campground, uploads images to Cloudinary, geocodes location, redirects to `/campgrounds/:id`
- Error: Returns validation errors

---

#### Update Campground
```http
PUT /campgrounds/:id
Content-Type: multipart/form-data
Authorization: Required (Campground author)

campground[title]=<title>
campground[price]=<price>
campground[location]=<location>
campground[description]=<description>
deleteImages[]=<image_filename>
image=<new_file>
```

**Authorization:**
- User must be logged in
- User must be the author of the campground

**Response:**
- Success: Updates campground, redirects to `/campgrounds/:id`
- Error: Returns authorization or validation errors

---

#### Delete Campground
```http
DELETE /campgrounds/:id
Authorization: Required (Campground author)
```

**Authorization:**
- User must be logged in
- User must be the author of the campground

**Response:**
- Success: Deletes campground and associated reviews, redirects to `/campgrounds`
- Error: Returns authorization error

---

#### Render New Campground Form
```http
GET /campgrounds/new
Authorization: Required (Logged in user)
```

**Response:**
- Returns HTML form for creating new campground

---

#### Render Edit Campground Form
```http
GET /campgrounds/:id/edit
Authorization: Required (Campground author)
```

**Response:**
- Returns HTML form for editing campground

---

### Review Endpoints

#### Create Review
```http
POST /campgrounds/:id/reviews
Content-Type: application/x-www-form-urlencoded
Authorization: Required (Logged in user)

review[rating]=<1-5>
review[body]=<review_text>
```

**Parameters:**
- `id` (required): Campground MongoDB ObjectId

**Validation:**
- `rating`: Required, number, min: 1, max: 5
- `body`: Required, string

**Response:**
- Success: Creates review, redirects to `/campgrounds/:id`
- Error: Returns validation errors

---

#### Delete Review
```http
DELETE /campgrounds/:id/reviews/:reviewId
Authorization: Required (Review author)
```

**Parameters:**
- `id` (required): Campground MongoDB ObjectId
- `reviewId` (required): Review MongoDB ObjectId

**Authorization:**
- User must be logged in
- User must be the author of the review

**Response:**
- Success: Deletes review, redirects to `/campgrounds/:id`
- Error: Returns authorization error

---

### Error Handling

All endpoints return appropriate HTTP status codes:
- `200`: Success
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (authorization failed)
- `404`: Not Found
- `500`: Internal Server Error

Error messages are displayed via flash messages in the UI.

---

##  Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (local installation or MongoDB Atlas account)
- **Git**

### Step 1: Clone the Repository

```bash
git clone https://github.com/nikita-nikki/YelpCamp.git
cd YelpCamp
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following environment variables to `.env`:

```env
# Database
DB_URL=mongodb://localhost:27017/yelp-camp
# Or use MongoDB Atlas:
# DB_URL=mongodb+srv://username:password@cluster.mongodb.net/yelp-camp

# Session Secret (generate a random string)
SECRET=your-super-secret-session-key-here

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# MapTiler API Token
MAPBOX_TOKEN=your_maptiler_api_token

# Optional: Port (defaults to 3000)
PORT=3000

# Optional: Node Environment
NODE_ENV=development
```

### Step 4: Set Up External Services

#### MongoDB Setup
1. **Local MongoDB:**
   - Install MongoDB locally
   - Start MongoDB service
   - Database will be created automatically on first run

2. **MongoDB Atlas (Cloud):**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create a cluster
   - Get connection string
   - Update `DB_URL` in `.env`

#### Cloudinary Setup
1. Create account at [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard
3. Copy your Cloud Name, API Key, and API Secret
4. Add to `.env` file

#### MapTiler Setup
1. Create account at [MapTiler](https://www.maptiler.com/)
2. Get your API token from the dashboard
3. Add to `.env` file as `MAPBOX_TOKEN`

### Step 5: Start MongoDB (if using local)

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or start manually:
mongod
```

**macOS/Linux:**
```bash
# Using Homebrew (macOS)
brew services start mongodb-community

# Or start manually
mongod
```

### Step 6: Run the Application

```bash
npm start
```

Or using Node directly:
```bash
node app.js
```

### Step 7: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

### Optional: Seed the Database

If you want to populate the database with sample data:

```bash
node seeds/index.js
```

**Note:** Make sure your database connection is working before running seeds.

---

##  Project Structure

```
YelpCamp/
│
├── app.js                      # Main application entry point
├── package.json                # Dependencies and scripts
├── .env                        # Environment variables (create this)
├── .gitignore                  # Git ignore rules
│
├── cloudinary/
│   └── index.js               # Cloudinary configuration
│
├── controllers/
│   ├── campgrounds.js         # Campground business logic
│   ├── reviews.js             # Review business logic
│   └── users.js               # User authentication logic
│
├── middleware.js              # Custom middleware (auth, validation)
├── schemas.js                 # Joi validation schemas
│
├── models/
│   ├── campground.js          # Campground Mongoose model
│   ├── review.js              # Review Mongoose model
│   └── user.js                # User Mongoose model
│
├── routes/
│   ├── campgrounds.js         # Campground routes
│   ├── reviews.js             # Review routes
│   └── users.js               # User authentication routes
│
├── seeds/
│   ├── index.js               # Database seeding script
│   ├── cities.js              # Sample city data
│   └── seedHelpers.js        # Seeding helper functions
│
├── utilis/
│   ├── catchAsync.js          # Async error wrapper
│   └── ExpressError.js        # Custom error class
│
├── public/
│   ├── javascripts/
│   │   ├── clusterMap.js     # Map clustering logic
│   │   ├── showPageMap.js    # Individual campground map
│   │   └── validateForms.js # Client-side form validation
│   │
│   └── stylesheets/
│       ├── app.css           # Main stylesheet
│       ├── home.css          # Home page styles
│       └── stars.css         # Star rating styles
│
└── views/
    ├── campgrounds/
    │   ├── index.ejs         # Campground listing page
    │   ├── new.ejs           # New campground form
    │   ├── edit.ejs          # Edit campground form
    │   └── show.ejs          # Campground detail page
    │
    ├── users/
    │   ├── login.ejs         # Login page
    │   └── register.ejs      # Registration page
    │
    ├── layouts/
    │   └── boilerplate.ejs   # Main layout template
    │
    ├── partials/
    │   ├── navbar.ejs        # Navigation bar
    │   ├── footer.ejs        # Footer component
    │   └── flash.ejs         # Flash message component
    │
    ├── home.ejs              # Home page
    └── error.ejs             # Error page
```

---

##  Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `DB_URL` | MongoDB connection string | Yes | `mongodb://localhost:27017/yelp-camp` |
| `SECRET` | Session secret key | Yes | `your-random-secret-string` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | Yes | `your-cloud-name` |
| `CLOUDINARY_KEY` | Cloudinary API key | Yes | `123456789012345` |
| `CLOUDINARY_SECRET` | Cloudinary API secret | Yes | `abcdefghijklmnopqrstuvwxyz` |
| `MAPBOX_TOKEN` | MapTiler API token | Yes | `pk.eyJ1Ijoi...` |
| `PORT` | Server port | No | `3000` (default) |
| `NODE_ENV` | Environment mode | No | `development` or `production` |

---

##  Usage

### For Users

1. **Browse Campgrounds:**
   - Visit the home page to see all campgrounds
   - Use the search bar to find specific campgrounds
   - Click on a campground to view details

2. **Create Account:**
   - Click "Register" in the navigation
   - Enter username, email, and password
   - Log in with your credentials

3. **Add Campground:**
   - Click "New Campground" (requires login)
   - Fill in campground details
   - Upload images
   - Submit to create listing

4. **Leave Reviews:**
   - Navigate to a campground page
   - Scroll to reviews section
   - Enter rating (1-5 stars) and review text
   - Submit review

5. **Manage Your Campgrounds:**
   - View your campgrounds on your profile
   - Click "Edit" to modify details
   - Click "Delete" to remove campground

### For Developers

#### Running in Development Mode

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB (if local)
mongod

# Run the application
npm start
```

#### Running in Production Mode

```bash
# Set NODE_ENV to production
export NODE_ENV=production

# Start the application
npm start
```

---

##  Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

##  License

This project is licensed under the ISC License.

---

##  Author

**Nikita**

- GitHub: [@nikita-nikki](https://github.com/nikita-nikki)
- Project Link: [https://github.com/nikita-nikki/YelpCamp](https://github.com/nikita-nikki/YelpCamp)

---

