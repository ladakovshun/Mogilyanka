document.addEventListener("DOMContentLoaded", () => {
    const commentsList = document.getElementById("comments-list");
    const commentInput = document.getElementById("comment-input");
    const submitComment = document.getElementById("submit-comment");

    let comments = JSON.parse(localStorage.getItem("comments")) || [];

    function renderComments() {
        commentsList.innerHTML = "";
        comments.forEach((comment, index) => {
            const commentDiv = document.createElement("div");
            commentDiv.classList.add("comment");

            commentDiv.innerHTML = `
                <div class="avatar"></div>
                <p><strong>${comment.username}</strong>: ${comment.text}</p>
                <div class="like-dislike">
                    <img src="../img/like.png" class="like-btn" data-index="${index}" alt="like">
                    <span class="like-count">${comment.likes}</span>
                </div>
            `;

            commentsList.appendChild(commentDiv);
        });

        document.querySelectorAll(".like-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                comments[index].likes++;
                localStorage.setItem("comments", JSON.stringify(comments));
                renderComments();
            });
        });
    }

    submitComment.addEventListener("click", () => {
        const text = commentInput.value.trim();
        if (text) {
            const username = "Анонім"; // 
            comments.push({ username, text, likes: 0 });
            localStorage.setItem("comments", JSON.stringify(comments));
            commentInput.value = "";
            renderComments();
        }
    });

    renderComments();
});
