
var posts = [
  { title: "title1", content: "This is post 1", thumbnail: "./img/demo2", link: "post1.html" },
  { title: "title2", content: "This is post 2", thumbnail: "", link: "post2.html" },
  { title: "title3", content: "This is post 3", thumbnail: "path_to_thumbnail3.jpg", link: "post3.html" },
  { title: "title4", content: "This is post 4", thumbnail: "path_to_thumbnail4.jpg", link: "post4.html" }
];

var postContainer = document.getElementById("post-container");
var loadingMessage = document.getElementById("loading-message");

function createPostCard(post) {
  var cardDiv = document.createElement("div");
  cardDiv.classList.add("col-md-4", "post-card");

  var title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = post.title;

  var content = document.createElement("p");
  content.classList.add("card-text");
  content.textContent = post.content;

  var thumbnail = document.createElement("img");
  thumbnail.classList.add("post-thumbnail");
  thumbnail.src = post.thumbnail;
  thumbnail.alt = "Thumbnail";

  cardDiv.appendChild(thumbnail); // Add the thumbnail image
  cardDiv.appendChild(title);
  cardDiv.appendChild(content);

  cardDiv.addEventListener("click", function() {
    window.location.href = post.link;
  });

  return cardDiv;
}

function loadMorePosts() {
  var startIndex = postContainer.children.length; // 已加载帖子的数量
  var endIndex = startIndex + 3; // 每次加载3个帖子
  for (var i = startIndex; i < endIndex && i < posts.length; i++) {
    var postCard = createPostCard(posts[i]);
    postContainer.appendChild(postCard);
  }
  if (startIndex >= posts.length) {
    window.removeEventListener("scroll", handleScroll);
    loadingMessage.style.display = "none";
  }
}

function handleScroll() {
  var scrollTop = document.documentElement.scrollTop;
  var windowHeight = window.innerHeight;
  var documentHeight = document.documentElement.scrollHeight;
  if (scrollTop + windowHeight >= documentHeight - 100) {
    loadingMessage.style.display = "block";
    setTimeout(function() {
      loadMorePosts();
      loadingMessage.style.display = "none";
    }, 1000);
  }
}

window.addEventListener("scroll", handleScroll);
loadMorePosts(); // 初始加载


