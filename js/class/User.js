import { BACKEND_URL } from "../config.js";

class User {
  #id = undefined;
  #username = undefined;
  #email = undefined;
  #password = undefined;
  #newPassword = undefined;

  constructor() {
    const userFromStorage = sessionStorage.getItem("user");
    if (userFromStorage) {
      const userObject = JSON.parse(userFromStorage);
      this.#id = userObject.id;
      this.#username = userObject.username;
      this.#email = userObject.email;
    }
  }

  get id() {
    return this.#id
  }

  get username() {
    return this.#username
  }

  get email() {
    return this.#email
  }

  get password() {
    return this.#password
  }

  get newPassword() {
    return this.#newPassword
  }

  get isLoggedIn(){
    return this.#username !== undefined ? true : false
  }

  async login(username, password) {
    const data = JSON.stringify({ username: username, password: password });
    const response = await fetch(BACKEND_URL + "/user/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      this.#id = json.id;
      this.#username = json.username;
      sessionStorage.setItem("user", JSON.stringify(json));
      return { username: json.username, id: json.id };
    } else {
      throw response.statusText;
    }
  }

  async signup(username, email, password) {
    const data = JSON.stringify({
      username: username,
      email: email,
      password: password,
    });
    const response = await fetch(BACKEND_URL + "/user/signup", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: data,
    });
    if (response.ok === true) {
      const json = await response.json();
      return json.id;
    } else {
      throw response.statusText;
    }
  }

  async checkEmailExists(email) {
    const data = JSON.stringify({ email: email });
    try {
      const response = await fetch(BACKEND_URL + "/user/check-email", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.status === 200) {
        // Email exists
        const json = await response.json();
        return json.exists;
      } else if (response.status === 404) {
        // Email does not exist
        return false;
      } else {
        throw new Error("Unexpected status code: " + response.status);
      }
    } catch (error) {
      console.error("An error occurred while checking email existence:", error);
      throw error;
    }
  }

  // async checkEmailExists(email) {
  //   const data = JSON.stringify({ email: email });
  //   try {
  //     const response = await fetch(BACKEND_URL + "/user/check-email", {
  //       method: "post",
  //       headers: { "Content-Type": "application/json" },
  //       body: data,
  //     });

  //     if (response.status === 200) {
  //       // Email exists
  //       const json = await response.json();
  //       return json.exists;
  //     } else if (response.status === 404) {
  //       // Email does not exist
  //       return false;
  //     } else {
  //       throw new Error("Unexpected status code: " + response.status);
  //     }
  //   } catch (error) {
  //     console.error("An error occurred while checking email existence:", error);
  //     throw error;
  //   }
  // }

  async checkUsernameExists(username) {
    const data = JSON.stringify({ username: username });
    try {
      const response = await fetch(BACKEND_URL + "/user/check-username", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.ok === true) {
        const json = await response.json();
        return json.exists;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while checking username existence:", error);
      throw error;
    }
  }

  async reset(email, newPassword) {
    const data = JSON.stringify({ email: email, newPassword: newPassword });
    try {
      const response = await fetch(BACKEND_URL + "/user/reset-password", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: data,
      });

      if (response.ok === true) {
        const json = await response.json();
        return json.newPassword;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during password reset:", error);
      throw error;
    }
  }

<<<<<<< HEAD
<<<<<<< HEAD
  async newPost(title, content, username) {
    const data = JSON.stringify({
      title: title,
      content: content,
      username: username,
    });

    // console.log(data.title)
    // console.log(data.content)
    // console.log(data.username)

    try {
      const response = await fetch(BACKEND_URL + "/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
      });
    
      if (response.ok) {
        const json = await response.json();
        // 根据需要处理json
        return json; // 可能包含帖子的信息或确认
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error("An error occurred during post creation:", error);
      throw error;
    }
=======
  logout() {
    this.#username = undefined
    sessionStorage.removeItem('user')
>>>>>>> 9f55737 (navbar颜色样式更改&侧边栏完成&logout功能完成&新增空文件mypost,newpost)
=======
  logout() {
    this.#username = undefined
    sessionStorage.removeItem('user')
>>>>>>> 54861c8 (sidebar完成&navbar颜色样式修改&logout功能完成)
  }
}



export { User };
