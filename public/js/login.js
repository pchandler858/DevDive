const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.status);

    // setTimeout allows login before attempting redirect
    setTimeout(() => {
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace("/dashboard");
      } else {
        // alert(response.statusText);
        alert("Incorrect email or password, please try again.");
      }
    }, 1000);
    const navLogin = document.querySelector("#nav-login");
    navLogin.classList.add("hidden");
  }
};

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
