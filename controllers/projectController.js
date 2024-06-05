const Project = require("../models/project");

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json({ statusCode: 200, data: projects, message: "Success" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
};

exports.createProject = async (req, res) => {
    const { title, image, link, description } = req.body;
    const newProject = new Project({ title, image, link, description });
    try {
        const savedProject = await newProject.save();
        res.json({ statusCode: 200, data: savedProject, message: "Project Created" });
    } catch (error) {
        res.status(500).json({ statusCode: 500, message: error.message });
    }
};
