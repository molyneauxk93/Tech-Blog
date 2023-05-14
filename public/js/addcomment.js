const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#post-comment').value.trim();
    
    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.comment-post')
    .addEventListener('submit', newCommentHandler);