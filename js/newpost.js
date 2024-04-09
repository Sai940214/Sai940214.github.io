<<<<<<< HEAD
document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单默认提交行为
    
    var title = document.getElementById('titleInput').value;
    var content = document.getElementById('contentInput').value;
    
    // 确保标题已填写
    if (!title.trim()) {
      alert('Please enter your title');
      return;
    }
    
    // 发送数据到服务器
    fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: title, content: content })
    })
    .then(response => response.json())
    .then(data => {
      // 处理响应数据
      console.log(data);
      if (data.success) {
        alert('帖子发布成功！');
        // 可以选择重定向到帖子页面或清空表单
      } else {
        alert('帖子发布失败，请重试。');
      }
    })
    .catch(error => {
      console.error('发布帖子时出错：', error);
    });
  });
  
  // 关闭按钮事件处理
  document.querySelector('.plus-icon').addEventListener('click', function() {
    window.location.href = './home.html'; // 这将导航到主页面，确保路径正确

  });
  
=======
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

  // get user info from session
  const userFromStorage = sessionStorage.getItem("user");

  const userObject = JSON.parse(userFromStorage);
  const username = userObject.username;

  // for testing 
  console.log(username)


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

  try {
    // Register post
    await user.newPost(title, content, username);
    // Redirect to login page
    window.location.href = "../index.html";
  } catch (error) {
    // Handle any errors
    console.error(error);
  }
});
>>>>>>> e92518d (new)
