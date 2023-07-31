const express = require('express');
require('dotenv').config();
const app = express();
const {connectDB} = require('./config/db')
const announceMentRoutes = require('./routes/announcementRoutes')
const PORT = process.env.PORT || 5000

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/' , announceMentRoutes);

app.listen( PORT, () => {
    connectDB();
    console.log(`Server is Listening on Port : ${PORT}`)
})