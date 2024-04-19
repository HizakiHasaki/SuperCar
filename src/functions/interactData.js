import axios from "axios"; // Import the axios library to make requests

// Function to interact with the API
const interactData = (url, method, data, setData) => {
  axios({
    method: method, // GET, POST, PUT, DELETE
    url: url, // API endpoint
    data: new URLSearchParams(data), // Data to send in the body of the request
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, // Headers
  })
    .then((response) => {
      console.log("Sending request with data:", data);
      setData(response.data); // Set the data from the response
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
    });
};

export { interactData };
