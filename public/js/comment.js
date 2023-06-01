const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("newCommentHandler triggered");

  const comment_text = document.querySelector("#comment-text").value.trim();

  if (comment_text) {
    console.log("comment_text: ", comment_text);
    const id = event.target.getAttribute("data-id");
    const response = await fetch(`/api/comments/${id}`, {
      method: "POST",
      body: JSON.stringify({ comment_text }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);

    if (response.ok) {
      console.log("Comment posted");
      document.location.replace(`/`);
    } else {
      alert("Failed to post comment");
    }
  }
};

document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);
