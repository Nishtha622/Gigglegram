import Query from "../models/query.model.js";

const helpdeskController = {
  // Handle query submission
  async submitQuery(req, res) {
    try {
      const { name, email, query } = req.body;

      if (!name || !email || !query) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const newQuery = new Query({ name, email, query });
      await newQuery.save();
      res.status(201).json({ message: "Query submitted successfully!" });
    } catch (error) {
      console.error("Error submitting query:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  // Get all queries
  async getAllQueries(req, res) {
    try {
      const queries = await Query.find();
      res.status(200).json(queries);
    } catch (error) {
      console.error("Error fetching queries:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default helpdeskController;