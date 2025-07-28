const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require('./routes/users'); 
const habitRoutes = require("./routes/habit");
const dailylogRoutes = require("./routes/dailylog");
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');
const {errorHandler} = require("./middleware/errorHandler");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:3000", credentials: true
}));

app.use("/api/authRouter");
app.use("/api/habits",habitRoutes);
app.use("/api/logs",dailylogRoutes);
app.use(errorHandler);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));
