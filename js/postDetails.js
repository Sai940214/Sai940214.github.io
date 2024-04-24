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

let postDetailElement; // 保存帖子详情元素的引用

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
    savedElement.textContent = formattedTime(post.time);

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
        // 如果帖子详情元素已经存在，则替换内容，否则创建新的帖子详情元素
        if (postDetailElement) {
            // 替换帖子内容
            const newPostDetailElement = createPostElement(postDetail);
            postDetailContainer.replaceChild(newPostDetailElement, postDetailElement);
            postDetailElement = newPostDetailElement; // 更新帖子详情元素的引用
        } else {
            // 创建新的帖子详情元素
            postDetailElement = createPostElement(postDetail);
            postDetailContainer.appendChild(postDetailElement);
        }

        // 获取帖子评论并显示在页面上
        updateComments();
        
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
// input new comment
function setupCommentSection() {
    const commentInput = document.getElementById("comment-input");
    const commentButton = document.querySelector(".comment-section button");
    
    commentButton.addEventListener("click", async function() {
        const newCommentText = commentInput.value.trim(); //get new comment from input
        if (newCommentText !== "") {
            try {
                // 插入新评论到数据库
                await post.insertComment(postId, user.username, newCommentText);
                // 清空评论容器
                const commentsContainer = document.querySelector(".comments");
                commentsContainer.innerHTML = "";
                // 重新加载帖子详情以更新评论和帖子内容
                await loadPostDetails(postId);
                commentInput.value = ""; // 清空评论输入框
            } catch (error) {
                console.error("An error occurred while inserting comment:", error);
            }
        }
    })
};

// create element to display a comment
function createCommentElement(comment) {
    const commentElement = document.createElement("div");
    commentElement.classList.add("comment");

    const { username, text, time } = comment; // 解构评论对象的参数

    const commentInfoElement = document.createElement("p");
    commentInfoElement.classList.add("comment-info");
    commentInfoElement.textContent = `Comment by ${username} at ${formattedTime(time)}`;

    const commentTextElement = document.createElement("p");
    commentTextElement.textContent = text;

    commentElement.appendChild(commentInfoElement);
    commentElement.appendChild(commentTextElement);
        
    return commentElement;
};

// 更新帖子评论
async function updateComments() {
    try {
        // 获取帖子详情
        const postDetail = await post.fetchPostDetails(postId);
        const comments = postDetail.comments;
        if (comments && comments.length > 0) {
            const commentsContainer = document.querySelector(".comments");
            // 清空现有评论元素
            commentsContainer.innerHTML = "";
            comments.forEach(comment => {
                const commentElement = createCommentElement(comment);
                commentsContainer.appendChild(commentElement);
            });
        }
    } catch (error) {
        console.error("An error occurred while updating comments:", error);
    }
}

// 在页面加载完成后，调用加载帖子详细内容的函数
window.addEventListener("DOMContentLoaded", () => {
    loadPostDetails(postId)
});

 // 格式化时间
function formattedTime(timeString) {
    const date = new Date(timeString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
