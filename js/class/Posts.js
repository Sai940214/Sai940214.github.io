import { BACKEND_URL } from '../config.js'
import { Post } from './Post.js'

class Posts {
  #posts = []
  
  getPosts = () => {
    return new Promise(async(resolve, reject) => {
      fetch(BACKEND_URL + '/post/homepost')
      .then(response => response.json())
      .then(json => {
        this.readJson(json) // 读取并处理JSON数据
        resolve(this.#posts)
      }).catch(error => {
        reject(error)
      })
    })
  }

  readJson = (json) => {
    console.log("Processing JSON data:", json); // 添加日志语句
    this.#posts = []; // 清空posts数组，防止数据重复

    json.forEach(node => {
        const post = new Post(node.id, node.title, node.content, null, node.saved, null, null);
        this.#posts.push(post);
    });
  }
}

export { Posts }
