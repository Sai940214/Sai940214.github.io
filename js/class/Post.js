import { BACKEND_URL } from '../config.js'

// Define the Comment class
class Comment{
  constructor(postId, username, text){
    this.postId = postId;
    this.username = username;
    this.text = text;
  }
}

class Post {
  #id
  #title
  #content
  #image
  #time
  #author
  #comments

  constructor(id,title,content,image,time,author,comments) {
    this.#id = id
    this.#title = title
    this.#content = content
    this.#image = image
    this.#time = time
    this.#author = author
    this.#comments = comments
  }

  get id() {
    return this.#id
  }

  get title() {
    return this.#title
  }

  get content() {
    return this.#content
  }

  get image() {
    return this.#image
  }

  get time() {
    return this.#time
  }

  get formattedtime() {
    const date = new Date(this.#time);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

  get author() {
    return this.#author
  }

  get comments() {
    return this.#comments
  }

  // get post details
  async fetchPostDetails(id) {
    try {
      const response = await fetch(`${BACKEND_URL}/post/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch post details');
      }
      const postData = await response.json();
      // for test
      // console.log('Author:', postData.username);
      console.log(postData.comments);
      // 解构获取的数据并返回
      const { id: postID, title, content, image, time, username, comments } = postData;
      return { id: postID, title, content, image, time, username, comments };
    } catch (error) {
      throw error; // 如果发生错误，则抛出错误
    }
  }

  // Insert new comment to the database
  async insertComment(postId, username, text) {
    try {
      const comment = new Comment(postId, username, text);
      console.log(comment);
      const data = JSON.stringify(comment);
      const response = await fetch(`${BACKEND_URL}/post/insertComment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: data,
      });
      if (!response.ok) {
        throw new Error('Failed to insert comment');
      }
      const json = await response.json();
      return json.id;
    } catch (error) {
      throw error;
    }
  }
}

export { Post }