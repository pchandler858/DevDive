const editButtonHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const post = document.querySelector("#post-body").value.trim();

  if (title && post) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({ title, post }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update post");
    }
  }
  console.log(`Title: ${title} Post: ${post}`);
};

document
  .querySelector(".edit-post")
  .addEventListener("submit", editButtonHandler);
