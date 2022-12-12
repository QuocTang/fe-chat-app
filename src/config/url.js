const URL_CLOUDINARY = "https://api.cloudinary.com/v1_1/dohex0rdu/image/upload";
let URL_API = "";
let url = "";

const environment = "proc";

if (environment === "local") {
  url = "http://localhost:5000";
} else if (environment === "proc") {
  url = "https://api-chat-app-4dq2.onrender.com/";
}

URL_API = url;

export { URL_CLOUDINARY, URL_API };
