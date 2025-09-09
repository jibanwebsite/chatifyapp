import { toast } from "react-toastify";
import "./login.css";
import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../lib/firebase";
import { doc, setDoc } from "firebase/firestore";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Upload avatar to Cloudinary if a file is selected
      let imgUrl = "";
      if (avatar.file) {
        const uploadData = new FormData();
        uploadData.append("file", avatar.file);
        uploadData.append("upload_preset", "ml_default");

        const uploadRes = await fetch(
          "https://api.cloudinary.com/v1_1/dzye00uul/image/upload",
          {
            method: "POST",
            body: uploadData,
          }
        );
        const uploadResult = await uploadRes.json();
        if (uploadResult.secure_url) {
          imgUrl = uploadResult.secure_url;
        } else {
          console.error("Cloudinary upload failed:", uploadResult);
        }
      }

      //   save user to firebase
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        id: res.user.uid,
        avatar: imgUrl || "",
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success(
        "You have created account successfully! You can login now."
      );
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful 🎉");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {/* Copyright / Powered by */}
      <p
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "14px",
          color: "#555",
        }}
      >
        © {new Date().getFullYear()} Powered by <strong>JibanDev</strong>
      </p>
      <div className="item">
        <h2>Welcome back,</h2>
        <form action="" onSubmit={handleLogin}>
          <input type="text" placeholder="email or username" name="email" />
          <input
            type="password"
            placeholder="enter your password"
            name="password"
          />
          <button disabled={loading}>{loading ? "loading" : "Login"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload Images
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="Your email" name="email" />
          <input
            type="password"
            placeholder="Type your password"
            name="password"
          />
          <button disabled={loading}>{loading ? "loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
