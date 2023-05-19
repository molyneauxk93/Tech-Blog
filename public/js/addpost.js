const newPostHandler = async (event) => {
    event.preventDefault();

    //get the title and content of the new blog post from the ui
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    
// if title and content exist it will make a POST request to the api blog route passing along these values 
    if (title && content) {
        const response = await fetch('/api/blog', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if response is ok then the dashboard will replace the current view 
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.post-form')
    .addEventListener('submit', newPostHandler);