import { Post } from "./class/Post.js";
const post = new Post();

import { User } from "./class/User.js";
const user = new User();

// 获取 URL 中的查询参数
const urlParams = new URLSearchParams(window.location.search);
// 从查询参数中获取帖子的 ID
const postId = urlParams.get('id');
// for test 
// console.log(postId);

// 获取页面上用于显示帖子详细内容的元素
const postDetailContainer = document.querySelector('.postDetailContainer');
console.log(postDetailContainer);

// for test
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

// Create post details element
function createPostElement(post) {
    const postDetailElement = document.createElement("div");
    postDetailElement.classList.add("post-detail");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("post-title");
    titleElement.textContent = post.title;

    const authorElement = document.createElement("p");
    authorElement.classList.add("post-author");
    authorElement.textContent = "@" + post.username;

    const savedElement = document.createElement("p");
    savedElement.classList.add("post-saved");
    savedElement.textContent = post.formattedtime;

    const contentElement = document.createElement("p");
    contentElement.classList.add("post-content");
    contentElement.textContent = post.content;

    const pictureElement = document.createElement("img");
    pictureElement.classList.add("post-picture");
    pictureElement.setAttribute("src", post.picture);
    pictureElement.setAttribute("alt", "picture");

    postDetailElement.appendChild(titleElement);
    postDetailElement.appendChild(authorElement);
    postDetailElement.appendChild(savedElement);
    postDetailElement.appendChild(contentElement);

    // check if the post have a picture
    if(post.picture){
        // if the picture exits, insert it into the page
        postDetailElement.appendChild(pictureElement);
    } 

    return postDetailElement;
}

async function loadPostDetails(id) {
    try {
        const postDetail = await post.fetchPostDetails(id);     
        const postDetailElement = createPostElement(postDetail);
        postDetailContainer.appendChild(postDetailElement);
        setupLikeButton();
        setupCommentSection();
    } catch (error) {
        console.error("An error occurred while loading post details:", error);
    }
}


//------------------------ like button ------------------------
// 获取点赞按钮和点赞数显示的元素
function setupLikeButton(){
    const likeButton = document.querySelector(".like-button");
    const likeCountElement = document.getElementById("like-count");
    // Initialize the number of likes
    let likeCount = 0;
    // add event listener when click 'like'
    likeButton.addEventListener("click", () => {
        likeCount++;
        likeCountElement.textContent = likeCount.toString();
    });
}

//------------------------ comment section ------------------------
function setupCommentSection() {
    const commentInput = document.getElementById("comment-input");
    const commentButton = document.querySelector(".comment-section button");
    const commentsContainer = document.querySelector(".comments");

    commentButton.addEventListener("click", async function() {
        const commentText = commentInput.value.trim();
        if (commentText !== "") {
            try {
                await post.insertComment(postId, user.username, commentText);
                const commentElement = createCommentElement(commentText);
                commentsContainer.appendChild(commentElement);
                commentInput.value = ""; // 清空评论输入框
            } catch (error) {
                console.error("An error occurred while inserting comment:", error);
            }
        }
    })
};

function createCommentElement(commentText) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const commenterId = user.username;
 
    const commentTime = new Date().toLocaleString(); // get current time

    const commentInfoElement = document.createElement("p");
    commentInfoElement.classList.add("comment-info");
    commentInfoElement.textContent = `Comment by ${commenterId} at ${commentTime}`;

    const commentTextElement = document.createElement("p");
    commentTextElement.textContent = commentText;

    commentElement.appendChild(commentInfoElement);
    commentElement.appendChild(commentTextElement);
        
    return commentElement;
};

// 在页面加载完成后，调用加载帖子详细内容的函数
window.addEventListener("DOMContentLoaded", () => {
    loadPostDetails(postId)
});