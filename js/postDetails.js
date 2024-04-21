import { Posts } from "./class/Posts.js";
const posts = new Posts();

// 获取 URL 中的查询参数
const urlParams = new URLSearchParams(window.location.search);
// 从查询参数中获取帖子的 ID
const postId = urlParams.get('id');

// 获取页面上用于显示帖子详细内容的元素
const postContainer = document.querySelector('.container');
console.log(postContainer);
const postDetail = document.querySelector('.postDetail');
console.log(postDetail);

// // for test
// const post = {
//   title: "This is the title!!",
//   author: "user",
//   saved: "2024/4/9 20:00",
//   content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim dapibus quis id convallis vitae auctor feugiat massa. Semper ac blandit neque vulputate tincidunt venenatis. Orci lectus enim nunc proin lobortis faucibus vulputate in consectetur. Turpis morbi morbi pharetra, nunc, eu consequat id cursus. Mauris erat gravida viverra et blandit enim nunc amet, placerat. Vel, id lacinia arcu, neque etiam morbi consectetur non leo. ",
//   picture:  "./img/demo3.jpeg",
//   formattedtime: function() {
//     return this.saved; 
//   }
// };

// 创建帖子元素的函数
function createPostElement(post) {
    // const postDetail = document.createElement("div");
    // postDetail.classList.add("postDetail");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("post-title");
    titleElement.textContent = post.title;

    const authorElement = document.createElement("p");
    authorElement.classList.add("post-author");
    authorElement.textContent = "@" + post.author;

    const savedElement = document.createElement("p");
    savedElement.classList.add("post-saved");
    savedElement.textContent = post.formattedtime();

    const contentElement = document.createElement("p");
    contentElement.classList.add("post-content");
    contentElement.textContent = post.content;

    const pictureElement = document.createElement("img");
    pictureElement.classList.add("post-picture");
    pictureElement.setAttribute("src", post.picture);
    pictureElement.setAttribute("alt", "picture");

    postDetail.appendChild(titleElement);
    postDetail.appendChild(authorElement);
    postDetail.appendChild(savedElement);
    postDetail.appendChild(contentElement);
    postDetail.appendChild(pictureElement);
    
    return postDetail;
}

// 加载帖子的详细内容并显示在页面上
async function loadPostDetails(id) {
    try {
        // 使用 Posts 类中的方法获取帖子的详细内容
        const post = await posts.getPostDetails(id);

        // 创建帖子元素并将其添加到页面上
        const postDetail = createPostElement(post);
        postContainer.appendChild(postDetail);
        // document.body.appendChild(postElement);

    } catch (error) {
        console.error("An error occurred while loading post details:", error);
    }
}

// 在页面加载完成后，调用加载帖子详细内容的函数
window.addEventListener("DOMContentLoaded", () => {
  loadPostDetails(postId);
});

// like button
// 获取点赞按钮和点赞数显示的元素
const likeButton = document.querySelector(".like-button");
console.log(likeButton);
const likeCountElement = document.getElementById("like-count");

// 初始化点赞数
let likeCount = 0;

// 点赞按钮点击事件处理函数
likeButton.addEventListener("click", () => {
    // 增加点赞数
    likeCount++;
    // 更新显示的点赞数
    likeCountElement.textContent = likeCount.toString();
});


// display the new comment
document.addEventListener("DOMContentLoaded", function() {
    const commentInput = document.getElementById("comment-input");
    const commentButton = document.querySelector(".comment-section button");
    const commentsContainer = document.querySelector(".comments");

    commentButton.addEventListener("click", function() {
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            const commentElement = createCommentElement(commentText);
            commentsContainer.appendChild(commentElement);
            commentInput.value = ""; // 清空评论输入框
        }
    });

    function createCommentElement(commentText) {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        
        const commenterId = "User123"; // 可以替换为实际的评论人ID
        const commentTime = new Date().toLocaleString(); // 获取当前时间

        const commentInfoElement = document.createElement("p");
        commentInfoElement.classList.add("comment-info");
        commentInfoElement.textContent = `Comment by ${commenterId} at ${commentTime}`;

        const commentTextElement = document.createElement("p");
        commentTextElement.textContent = commentText;

        commentElement.appendChild(commentInfoElement);
        commentElement.appendChild(commentTextElement);
        
        return commentElement;
    }
});

