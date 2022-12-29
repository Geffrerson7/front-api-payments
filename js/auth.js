var BASE_URL="http://127.0.0.1:8000/"

function validateAuth(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (!token) {
    window.location.href = "../templates/login.html";
  }
}

function validateToken(archivoRedirect) {
  let token = localStorage.getItem("authTokens");
  if (token) {
    window.location.href = archivoRedirect;
  }
}

function updateTokenInterval() {
    let Minutes=1000*60*60 
    let interval = setInterval(() => {
        updateToken();
      }, Minutes);
      return () => clearInterval(interval);
}

let updateToken = async () => {
  console.log("UPDATE TOKEN CALLED");
  let authTokens = JSON.parse(localStorage.getItem("authTokens"));

  let response = await fetch(BASE_URL+"users/jwt/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: authTokens?.refresh }),
  });
  let data = await response.json();
  if (response.status === 200) {
    authTokens.access=data.access
    localStorage.setItem("authTokens", JSON.stringify(authTokens));
  } else {
    logoutUser();
  }

};

let logoutUser = () => {
  localStorage.removeItem("authTokens");
  localStorage.removeItem("user");
  window.location.replace("./login.html");
};

export { validateAuth, validateToken, updateTokenInterval,logoutUser, BASE_URL };