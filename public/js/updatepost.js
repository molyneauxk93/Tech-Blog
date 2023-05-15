const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();
    const id = document.querySelector('#update-button').value.trim();

    if (title && content) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const delButtonHandler = async (event) => {

    id = document.querySelector('#delete-blog').value.trim();

    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete blog post');
    }

};

document
    .querySelector('.update-post')
    .addEventListener('click', updatePostHandler);

document
    .querySelector('.delete-post')
    .addEventListener('click', delButtonHandler)