# YelpCamp

YelpCamp is a full-stack web application where users can create, view, and review campgrounds.
This project is built with **Node.js**, **Express**, **MongoDB**, and **EJS**.

## 🌐 Deployment

The project is deployed and accessible at:
👉 [https://yelpcamp-demo.onrender.com](https://yelpcamp-nnf2.onrender.com/)
---

## 🚀 Features

* **User Authentication**: Users can register and log in to their accounts.
* **Campground Management**: Logged-in users can create, edit, and delete their own campground posts.
* **Reviews and Comments**: Users can leave comments and reviews on campgrounds.
* **Interactive Map**: Displays the location of campgrounds using **Mapbox**.
* **Image Uploads**: Users can upload images of campgrounds, hosted on **Cloudinary**.
* **Search and Filtering**: Users can search for specific campgrounds.

---

## 🛠️ Technologies Used

### Backend

* **Node.js** – JavaScript runtime environment
* **Express** – Web application framework
* **MongoDB** – NoSQL database
* **Mongoose** – ODM library for MongoDB
* **Passport** – Authentication middleware
* **Cloudinary** – Image and video management
* **Mapbox** – Custom online maps

### Frontend

* **EJS** – Template engine
* **Bootstrap** – CSS framework for responsive UI
* **HTML5**
* **CSS3**
* **JavaScript**

---

## ⚙️ Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/nikita-nikki/YelpCamp.git
   ```

2. **Navigate to the project directory**

   ```bash
   cd YelpCamp
   ```

3. **Install dependencies**

   ```bash
   npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory and add:

   ```env
   CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
   CLOUDINARY_KEY=<your_cloudinary_api_key>
   CLOUDINARY_SECRET=<your_cloudinary_api_secret>
   MAPBOX_TOKEN=<your_mapbox_token>
   DB_URL=<your_mongodb_connection_string>
   ```

5. **Run the application**

   ```bash
   node app.js
   ```

---

## 💻 Usage

After starting the application, open:
👉 [http://localhost:3000](http://localhost:3000)

From there, you can:

* View existing campgrounds
* Sign up or log in
* Create campgrounds with images and descriptions
* Add comments and reviews

---



---
