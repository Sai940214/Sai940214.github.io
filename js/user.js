
import { User } from "../js/class/User.js";


const profile_email = document.querySelector('#profile-email')

const user = new User()
console.log(user.isLoggedIn)
console.log(user.email)

if(user.isLoggedIn){
    profile_email.innerHTML = user.username +  "<br>"+ user.email  
}else{
}
