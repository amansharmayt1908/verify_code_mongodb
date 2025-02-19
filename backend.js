const express = require("express");
const mongoose = require("mongoose"); // Add mongoose import
const app = express();
const cors = require("cors");
app.use(express.json()); // Add JSON middleware
app.use(cors());

app.get("/", (req, res) => {
    res.send("he");

    

// MongoDB connection
mongoose.connect(
    "mongodb+srv://amansharmayt19:nvrQpvCAPAWSEh9C@scripterx.7nhap.mongodb.net/courses?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => console.log("Connected to courses database"))
 .catch(err => console.log(err));


// Define the schema and model for the "key" collection
const keySchema = new mongoose.Schema({
    code: Number,
    name: String,
}, { collection: 'key' });

const Key = mongoose.model("Key", keySchema);

// Define route to verify code
app.post("/verify-code-mongodb.onrender", async (req, res) => {
    try {
        const { code } = req.body;
        const result = await Key.findOne({ code: code });
        
        if (result) {
            res.json({ found: true });
        } else {
            res.json({ found: false });
        }
    } catch (err) {
        res.status(500).json({ message: "Error occurred" });
    }
});

});

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
