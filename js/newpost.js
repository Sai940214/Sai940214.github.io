// Import User
import { User } from "../js/class/User.js";
let user = new User();

// Get DOM
let title_input = document.querySelector("#title");
let content_input = document.querySelector("#content");
let error = document.querySelector("#error");
let postButton = document.querySelector(".btn.btn-dark");


postButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const title = title_input.value;
  const content = content_input.value;

  try {
    // Check if title input is empty
    if (!title) {
      // If title input is empty, display an error message
      error.style.display = "block";
      error.textContent = "Please enter your username.";
      return;
    } else {
      error.style.display = "none";
    }

    // Check if content input is empty
    if (!content) {
      // If content input is empty, display an error message
      error.style.display = "block";
      error.textContent = "Please enter your email address.";
      return;
    } else {
      error.style.display = "none";
    }

    // Register post
    await user.newPost(title, content, username);
    // Redirect to login page
    window.location.href = "../index.html";
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
});
