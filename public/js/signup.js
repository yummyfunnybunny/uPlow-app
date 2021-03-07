// ANCHOR -- Require Modules --
import axios from "axios";
import { showToast } from "./toastNotification";

// ANCHOR -- Signup --
export const signup = async (name, email, password, passwordConfirm, role) => {
  console.log("running signup");
  try {
    // 1) send signup request to server
    const result = await axios({
      method: "POST",
      url: "/api/v1/users/signup",
      data: {
        name: name,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        role: role,
      },
    });
    // 2) create toast notification if login was successful
    if (result.data.status === "success") {
      console.log("success");
      showToast("success", "signed up successfully!");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showToast("error", "you suck at signing up!");
  }
};
