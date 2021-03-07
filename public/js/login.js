// ANCHOR -- Require Modules --
import axios from "axios";
import { showToast } from "./toastNotification";

// ANCHOR -- Login --
export const login = async (email, password) => {
  try {
    // 1) send login request to server
    console.log("running axios");
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email: email,
        password: password,
      },
    });
    // 2) create toast notification if login was successful
    if (result.data.status === "success") {
      console.log("success");
      showToast("success", "logged in successfully!");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
    }
    // 3) log error if login was unsuccessful
  } catch (err) {
    console.log(err);
    showToast("error", err.response.data.message);
  }
};

// ANCHOR -- Logout --
export const logout = async () => {
  try {
    // 1) send logout request to server
    const result = await axios({
      method: "GET",
      url: "/api/v1/users/logout",
    });
    if (result.data.status === "success") {
      location.assign("/");
    }
  } catch (err) {
    console.log(err.response);
    showToast("error", "Error logging out! Try again...");
  }
};