
import { User } from "../js/class/User.js";


const profile_email = document.querySelector('#profile-email')

const user = new User()
console.log(user.isLoggedIn)
console.log(user.email)
<<<<<<< HEAD
console.log("profile_email: " + profile_email)
console.log(user.id)


if(user.isLoggedIn) {
    // for testing
    console.log("user.username: " + user.username)
    console.log("user.email: " + user.email)
    profile_email.innerHTML = user.username +  "<br>"+ user.email;
} else {
=======

if(user.isLoggedIn){
    profile_email.innerHTML = user.username +  "<br>"+ user.email  
}else{
>>>>>>> 54861c8 (sidebar完成&navbar颜色样式修改&logout功能完成)
}
