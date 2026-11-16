require("dotenv").config();

const mongoose = require("mongoose");
const Note = require("./models/notes.models");

const sampleNotes = [
    {
        title: "Learn JavaScript",
        content: "Revise JavaScript fundamentals, ES6 features and asynchronous programming.",
        category: "General"
    },
    {
        title: "Complete Backend Assignment",
        content: "Build and test the Notes API using Express, MongoDB and Mongoose.",
        category: "Work"
    },
    {
        title: "Personal Goals",
        content: "Practice problem-solving every day and improve communication skills.",
        category: "Personal"
    },
    {
        title: "AI Project Idea",
        content: "Explore an AI-powered productivity assistant for organizing daily tasks.",
        category: "Ideas"
    },
    {
        title: "Study MongoDB",
        content: "Understand collections, documents, schemas, models and Mongoose queries.",
        category: "Work"
    }
];

const seedDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing. Add it to your .env file.");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding");

        // Keep existing data: add the sample set only when the collection is empty.
        const existingCount = await Note.countDocuments();

        if (existingCount === 0) {
            await Note.insertMany(sampleNotes);
            console.log(`${sampleNotes.length} sample notes inserted successfully!`);
        } else {
            console.log(`Seed skipped: ${existingCount} note(s) already exist.`);
        }
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("MongoDB connection closed");
    }
};

seedDatabase();
