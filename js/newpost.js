// Import User
import { User } from "../js/class/User.js";
let user = new User();

// Get DOM
let title_input = document.querySelector("#titleInput");
let content_input = document.querySelector("#contentInput");
let error = document.querySelector("#error");
let postButton = document.querySelector("#postButton");


postButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = title_input.value;
  const content = content_input.value;

  // get user info from session
  const userFromStorage = sessionStorage.getItem("user");

  const userObject = JSON.parse(userFromStorage);
  const username = userObject.username;

  // for testing 
  // console.log(username)
  // console.log("User from storage:", userFromStorage)
  // console.log("Username:", username)
  // console.log("Error element:", error);

  // Check if title input is empty
  if (!title) {
    // If title input is empty, display an error message
    error.textContent = "Please enter the title.";
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  // console.log("Error element:", error);


  // Check if content input is empty
  if (!content) {
    // If content input is empty, display an error message
    error.textContent = "Please enter the content.";
    error.style.display = "block";
    return;
  } else {
    error.style.display = "none";
  }

  try {
    // Register post
    await user.newPost(title, content, username);
    // Redirect to login page
    window.location.href = "../home.html";
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
});
