const deleteButtonHandler = async (event) => {
  event.preventDefault();
  const target = event.target.closest(".delete-post");
  if (target && target.hasAttribute("data-id")) {
    const id = target.getAttribute("data-id");

    // Display confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (confirmed) {
      const response = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to delete post");
      }
    }
  }
  console.log("Delete button clicked");
};

document
  .querySelector(".delete-post")
  .addEventListener("click", deleteButtonHandler);
