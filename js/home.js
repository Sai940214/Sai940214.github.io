import { Posts } from "./class/Posts.js";

const posts = new Posts();

//17.Apr连接后端获取帖子
// 获取帖子
const getPosts = async () => {
  try {
    const postData = await fetch("http://localhost:3001/post/homepost");
    const postsData = await postData.json();
    await posts.readJson(postsData);
    renderPosts();
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

// 渲染帖子
const renderPosts = async () => {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = "";

  const postsArray = await posts.getPosts();
  console.log("Posts Array:", postsArray);

  postsArray.forEach((post) => {
    console.log("Rendering post:", post);

    // 截取 post.content
    const shortenedContent = post.content.length > 200 ? post.content.substring(0, 200) + "..." : post.content;

    const postCard = document.createElement("div");
    postCard.classList.add("post-card");
    postCard.innerHTML = `
    <h2 class="post-title">${post.title}</h2>
    <div class="author-info">
      <img src="./img/demo5.png" alt="Author Avatar" class="author-avatar">
      <div class="author-details">
        <p class="author-name">@${post.author}</p>
        <p class="post-time">${post.formattedtime}</p>
      </div>
    </div>
    <p class="post-content">${shortenedContent}</p>
    `;
    postsContainer.appendChild(postCard);
  });
};

//调用函数
getPosts();

// //loading posts后面再做
// var posts = [
//   { title: "title1", content: "This is post 1", thumbnail: "./img/demo2", link: "post1.html" },
//   { title: "title2", content: "This is post 2", thumbnail: "", link: "post2.html" },
//   { title: "title3", content: "This is post 3", thumbnail: "path_to_thumbnail3.jpg", link: "post3.html" },
//   { title: "title4", content: "This is post 4", thumbnail: "path_to_thumbnail4.jpg", link: "post4.html" }
// ];

// var postContainer = document.getElementById("post-container");
// var loadingMessage = document.getElementById("loading-message");

// function loadMorePosts() {
//   var startIndex = postContainer.children.length; // 已加载帖子的数量
//   var endIndex = startIndex + 3; // 每次加载3个帖子
//   for (var i = startIndex; i < endIndex && i < posts.length; i++) {
//     var postCard = createPostCard(posts[i]);
//     postContainer.appendChild(postCard);
//   }
//   if (startIndex >= posts.length) {
//     window.removeEventListener("scroll", handleScroll);
//     loadingMessage.style.display = "none";
//   }
// }

// function handleScroll() {
//   var scrollTop = document.documentElement.scrollTop;
//   var windowHeight = window.innerHeight;
//   var documentHeight = document.documentElement.scrollHeight;
//   if (scrollTop + windowHeight >= documentHeight - 100) {
//     loadingMessage.style.display = "block";
//     setTimeout(function() {
//       loadMorePosts();
//       loadingMessage.style.display = "none";
//     }, 1000);
//   }
// }

// window.addEventListener("scroll", handleScroll);
// loadMorePosts(); // 初始加载

// 确保DOM完全加载后再添加事件监听器
document.addEventListener("DOMContentLoaded", (event) => {
  // 查询加号按钮
  const plusButton = document.querySelector(".navbar-toggler.mu-auto");

  // 为加号按钮添加点击事件监听器
  plusButton.addEventListener("click", function () {
    // 当加号按钮被点击时，跳转到 newpost.html
    window.location.href = "newpost.html";
  });
});
