const validate = (req, res, next) => {
    // Perform validation logic
    const { userId, subscriptionId } = req.body;
  
    if (!userId || !subscriptionId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
  
    next(); // Pass control to the next middleware
  };
  
export default validate;
  