
const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample = array=> array[Math.floor(Math.random()* array.length)];

const seedDB = async()=>{
    await Campground.deleteMany({});
    for(let i =0;i<300;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random() * 20)+10;
        const camp = new Campground({
            author: '689e1322b5c97b7f54ce221b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'oooooooooooooooooooooooooooooooo',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/duztffwi8/image/upload/v1755364647/YelpCamp/dq6xnifwtpax4gjalkbm.png',
                    filename: 'YelpCamp/dq6xnifwtpax4gjalkbm',
                },
                {
                     url: 'https://res.cloudinary.com/duztffwi8/image/upload/v1755364648/YelpCamp/o01svxfeoxe7u15jua0t.png',
                     filename: 'YelpCamp/o01svxfeoxe7u15jua0t',    
                }
            ]

        });
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
})