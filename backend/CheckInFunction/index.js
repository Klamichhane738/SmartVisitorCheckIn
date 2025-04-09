// Import axios to call the Logic App endpoint for notifications
const axios = require('axios');

module.exports = async function (context, req) {
  context.log('Processing visitor check-in.');

  const visitor = req.body;
  if (!visitor || !visitor.name || !visitor.hostEmail) {
    context.res = {
      status: 400,
      body: "Invalid input. Please provide at least visitor name and host email."
    };
    return;
  }

  // --- Write data to Cosmos DB using the output binding ---
  // By setting context.bindings.outputDocument = visitor,
  // the Azure Function writes this record to your Cosmos DB collection.
  context.bindings.outputDocument = visitor;

  // --- Call the Logic App for notifications ---
  // The Logic App URL should be stored securely in the function app settings.
  const logicAppUrl = process.env.LOGIC_APP_URL;
  if (logicAppUrl) {
    try {
      await axios.post(logicAppUrl, visitor);
      context.log("Notification sent to Logic App.");
    } catch (error) {
      context.log.error("Error calling Logic App:", error);
      // Optionally, handle the error (e.g., retry or log to Application Insights)
    }
  } else {
    context.log.warn("Logic App URL is not set.");
  }

  context.res = {
    status: 200,
    body: "Check-in successful!"
  };
};
