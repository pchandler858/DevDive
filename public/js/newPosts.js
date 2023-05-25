const newFormHandler = async (event) => {
  event.preventDefault();

  const { title: titleInput, post: postInput } = event.target.elements;

  // Check if the values are defined

  const postData = { title: titleInput, post: postInput };
  // Send a POST request to the API endpoint
  fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData),
  }).then((response) => {
    if (response.ok) {
      console.log("made it to this point");
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post");
    }
  });
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);
