const express = require("express");
const mongoose = require("mongoose");
const app = express();
const projectRoutes = require("./routes/projectRoutes");

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MongoDB connection
mongoose.connect("mongodb+srv://terermercyline:2M9thN1LVKVsiBQA@cluster0.snmw4vh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err));

// Use project routes
app.use("/api/projects", projectRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("App listening to: " + port);
});
