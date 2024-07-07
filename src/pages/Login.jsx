
import { useNavigate } from "react-router";
import Button from "../components/Button";
import PagesNav from"../components/pageNav_component/PagesNav";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";
import {  useEffect,useState } from "react";
/* eslint-disable */

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const{login,isAuthenticated}=useAuth();
  const navigate=useNavigate();
function handleSubmit(e){
  e.preventDefault();
  if(email&& password) login(email,password);
}
useEffect(()=>{
  if(isAuthenticated) navigate("/app" ,{replace:true})
},[isAuthenticated,navigate])

  return (
    <main className={styles.login}>
      <PagesNav/>
      <form className={styles.form} onSubmit={handleSubmit}  > 
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
        <Button type="primary">login</Button>
        </div>
      </form>
    </main>
  );
}
