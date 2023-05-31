const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("newCommentHandler triggered");

  const comment_text = document.querySelector("#comment-text").value.trim();

  if (comment_text) {
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({ comment_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/`);
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".new-comment")
  .addEventListener("submit", newCommentHandler);
