const updatePostHandler = async (event) => {
    event.preventDefault();

    //takes the title, content, and blog post id from the ui
    const title = document.querySelector('#edit-title').value.trim();
    const content = document.querySelector('#edit-content').value.trim();
    const id = document.querySelector('#update-button').value.trim();

    //if title and content have value then the PUT request will be made to the blog api route using the id of the blog post to be updated 
    if (title && content) {
        const response = await fetch(`/api/blog/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if the response if ok then the view will be replaced with the dashboard 
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const delButtonHandler = async (event) => {

    //gets the id from the ui
    id = document.querySelector('#delete-blog').value.trim();

    //makes delete request to the blog api aourte based on the blog id 
    const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
    });

    //if response is ok it will replace the current view with the user dashboard 
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