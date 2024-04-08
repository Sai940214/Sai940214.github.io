// Import User
import { User } from "./class/User.js";
let user = new User();

// Get DOM
let email_input = document.querySelector("#email");
let errorMessage = document.querySelector("#error");
let btn = document.querySelector(".btn.btn-dark");

// Add keydown event listener to window
// window.addEventListener("keydown", function (event) {
//   if (event.key === "Enter") {
//     event.preventDefault();
//     btn.click(); // Trigger button click event
//   }
// });

// Add Click Button Event
btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = email_input.value;

  if (!email) {
    error.style.display = "block";
    error.textContent = "Please type your email.";
    return;
  } else {
    error.style.display = "none";
  }

  try {
    const exists = await user.checkEmailExists(email);

    if (exists) {
      // if exist, to reset2.html
      errorMessage.style.display = "none";
      window.location.href = "../reset2.html";
    }
    // else {
    //   // if not exist, display error info
    //   errorMessage.style.display = "block";
    //   errorMessage.textContent = "Email does not exist.";
    // }
  } catch (error) {
    let errorMessage = document.querySelector("#error");
    if (error.message === "not found") {
      // if not exist, display error info
      errorMessage.style.display = "block";
      errorMessage.textContent = "Email does not exist.";
    } else {
      console.error("Error:", error);
    }
  }
});

// 222
