require('dotenv').config();

const express = require('express');
const cookieParser = require("cookie-parser");
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelize');
const cors = require('cors');
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:8885', // URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
  }));

app.use(cors());

app.use(bodyParser.json());

sequelize.authenticate()
  .then(() => {
    console.log('Database connection running!');
  })
  .catch(error => {
    console.error('Error:', error);
  });


const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", reservationRoutes);

app.use('/api', (req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
  });


app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || PORT}`);
});