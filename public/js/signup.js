const signupFormHandler = async (event) => {
    event.preventDefault();

    //get the username and password entered on sign up 
    const username = document.querySelector('#name-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    //if both have values then the POSt request will be made the the users api route which will then save this information to the database 
    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        //if the response is ok then the user dashboard will be rendered 
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);