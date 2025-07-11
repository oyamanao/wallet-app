import express from "express";
import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
if (process.env.NODE_ENV === "production") job.start();


app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// middleware
app.use(express.json());
app.use(rateLimiter)
app.use("/api/transactions",transactionsRoute)






initDB().then( () =>{
    app.listen(PORT,() =>{
        console.log('server is up and running on PORT:',PORT);
    });
})