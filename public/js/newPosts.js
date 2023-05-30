const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value.trim();
  const post = document.querySelector("#post").value.trim();

  if (title && post) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title, post }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Response Status:", response.status);
    console.log("Response Status Text:", response.statusText);

    if (response.ok) {
      document.location.replace("/");
    } else {
      const responseBody = await response.json();
      console.log("Response Body:", responseBody);

      if (responseBody.errors) {
        // Process and display the validation errors
        const errorMessages = responseBody.errors.map((error) => error.message);
        alert("Validation Error: " + errorMessages.join(", "));
      } else {
        alert("Failed to create post");
      }
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
