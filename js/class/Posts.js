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

  // getPostDetails = (id) => {
  //   return new Promise(async(resolve, reject) => {
  //     fetch(`${BACKEND_URL}/post/${id}`)
  //     // fetch(BACKEND_URL + '/:postId')
  //     .then(response => response.json())
  //     .then(json => {
  //       this.readJson(json) 
  //       resolve(this.#posts)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // }

  readJson = (json) => {
    console.log("Processing JSON data:", json); // 添加日志语句
    this.#posts = []; // 清空posts数组，防止数据重复

    json.forEach(node => {
      const post = new Post(node.post_id, node.title, node.content, null, node.time, node.username, null);
      this.#posts.unshift(post); // 将新帖子添加到数组开头
    }
  );

     // 对帖子数组按照时间降序排序
    this.#posts.sort((a, b) => {
    return new Date(b.time) - new Date(a.time);
    });
  }
}

export { Posts }