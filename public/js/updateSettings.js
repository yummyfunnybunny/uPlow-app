import axios from "axios";
import { showToast } from "./toastNotification";

// ANCHOR -- Update Account Info --
// type is either 'password' or 'data'
export const updateSettings = async (data, type) => {
  console.log("running updateSettings...");
  try {
    // Set the url based on the 'type' parameter
    const url =
      type === "password"
        ? "/api/v1/users/updateMyPassword"
        : "/api/v1/users/updateMe";

    const res = await axios({
      method: "PATCH",
      url: url,
      data: data,
    });

    if (res.data.status === "success") {
      showToast("success", `${type.toUpperCase()} updated successfully!`);

      // refresh the window aftert 1 second once the data was updated successfully
      window.setTimeout(() => {
        location.reload();
      }, 1000);
    }
  } catch (err) {
    showToast("error", err.response.data.message);
  }
};
