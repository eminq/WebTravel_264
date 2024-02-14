const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()



const authRoutes = require("./src/controllers/auth");
const categoryRoutes = require("./src/controllers/category");
const tripRoutes = require("./src/controllers/trip");
const commentRoutes = require("./src/controllers/comment");
const userRoutes = require("./src/controllers/user");

const app = express()

app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_LOCAL)
  .then(() => console.log('Database connected!')).catch(err => console.log(err))

if (process.env.NODE_ENV === 'development') {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }))
}

app.use("/api", authRoutes);
app.use("/api", categoryRoutes);
app.use("/api", tripRoutes);
app.use("/api", commentRoutes);
app.use("/api", userRoutes);


const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})