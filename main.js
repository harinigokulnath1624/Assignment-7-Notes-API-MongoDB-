require("dotenv").config();

const express = require("express");
const connectDB = require("./config/server.config");
const notesRoutes = require("./routes/notes.route");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

// A small health-check endpoint.
app.get("/", (req, res) => {
    res.status(200).json({ message: "Notes API is running" });
});

app.use("/api/notes", notesRoutes);

// Handles unknown routes.
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

// Must be registered after routes.
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDB();

        const PORT = process.env.PORT || 8081;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();
