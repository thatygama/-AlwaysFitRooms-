const express = require('express');
const cookieParser = require("cookie-parser");
const PORT = 4000;

const app = express();
app.use(express.json());
app.use(cookieParser());


const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", reservationRoutes);



app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT || PORT}`);
});