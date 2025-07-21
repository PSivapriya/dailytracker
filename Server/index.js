const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRouter = require('./routes/users'); 
const habitRoutes = require("./routes/habit");
const cors = require('cors');
const app = express();
const authRouter = require('./routes/auth');

dotenv.config();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.get("/", (req, res) => {
  res.send("🚀 API is working!");
});

app.use("/api/users", userRouter); // ✅ Now handled by your users.js file
app.use("/api/habits",habitRoutes);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});
