const newCommentHandler = async (event) => {
    event.preventDefault();

    // get comment and blog id value saved on the submit button from the UI
    const comment = document.querySelector('#post-comment').value.trim();
    const id = document.querySelector('#submit-btn').value.trim();

    // if comment exists, it will then do the api POST request to the comment api route by the id acquired 
    if (comment) {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the response is ok then it will render the save page again to reflect the newly created comment 
        if (response.ok) {
            document.location.replace(`/blog/${id}`);
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-post')
    .addEventListener('submit', newCommentHandler);