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

  async getPostId(id) {
    const data = JSON.stringify({ id: id });
    const response = await fetch(BACKEND_URL + "/user/getPostId", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      this.#id = json.id;
      return json.id ;
    } else {
      throw response.statusText;
    }
  }
}

export { Post }