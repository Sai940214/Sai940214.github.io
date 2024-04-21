class Post {
  #id
  #title
  #content
  #image
  #saved
  #author
  #comments

  constructor(id,title,content,image,saved,author,comments) {
    this.#id = id
    this.#title = title
    this.#content = content
    this.#image = image
    this.#saved = saved
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

  get saved() {
    return this.#saved
  }

  get formattedSaved() {
    const date = new Date(this.#saved);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }

  get author() {
    return this.#author
  }

  get comments() {
    return this.#comments
  }
}

export { Post }