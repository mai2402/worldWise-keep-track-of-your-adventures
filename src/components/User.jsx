
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
//import Button from "./Button";
import styles from "./User.module.css";



function User() {
 const {user,logout}=useAuth();
 const navigate=useNavigate();
 console.log(user,"meoe")
 function handleLogOut(){
    logout()
    navigate("/")
 }
 if (!user) {
  return <p>User not logged in</p>;
}

  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button  onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
