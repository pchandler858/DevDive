// Purpose: to create a new post
const newFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const shop_name = document.querySelector("#shop-name").value.trim();
  const taco_type = document.querySelector("#taco-type").value.trim();
  const rating = document.querySelector("#rating").value.trim();
  const comments = document.querySelector("#comments").value.trim();

  // Send a POST request to the API endpoint
  if (shop_name && taco_type && rating && comments) {
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({
        comments,
        post_title,
        user_post,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
