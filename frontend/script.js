document.getElementById('checkInForm').addEventListener('submit', async function (e) {
    e.preventDefault();
  
    // Collect form data into an object
    const visitorData = {
      name: document.getElementById('visitorName').value,
      hostEmail: document.getElementById('hostEmail').value,
      reason: document.getElementById('visitReason').value,
      checkInTime: new Date().toISOString()
    };
  
    // Update the URL with your deployed Azure Function endpoint
    const functionEndpoint = "functionapp323.azurewebsites.net/api/CheckInFunction";
  
    try {
      const response = await fetch(functionEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(visitorData)
      });
  
      const result = await response.text();
      alert(result);
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error checking in. Please try again.");
    }
  });
  