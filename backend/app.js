const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const placeRouter = require("./routes/placeRoutes");
const homeRouter = require("./routes/homeRoutes");
const gatheringRouter = require("./routes/gatheringRoutes");
const reportRouter = require("./routes/reportRoutes");
const bazaarRouter = require("./routes/bazaarRoutes");
const wishlistRouter = require("./routes/wishlistRoutes");

const app = express();

// Enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Allow cookies and authentication headers
  })
);

// Limit 1000 requests from same IP within 30 minutes
// To be reduced in production
// const limiter = rateLimit({
//   max: 1000,
//   windowM: 30 * 60 * 1000,
//   message: "too many requests, try again later",
// });
// app.use("/api", limiter);

// Body parser, read data from body into req.body
app.use(express.json());

// Set security HTTP Headers
app.use(helmet());

// Data sanitization against XSS attacks
app.use(xss());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
// Cookie parser middleware to parse cookies into req.cookie
app.use(cookieParser());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "Main Route",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/places", placeRouter);
app.use("/api/v1/gatherings", gatheringRouter);
app.use("/api/v1", homeRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/bazaar", bazaarRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.all("*", (req, res, next) => {
  const msg = `Can't find ${req.originalUrl}`;
  res.json({
    status: "fail",
    message: msg,
  });
  next();
});

module.exports = app;
