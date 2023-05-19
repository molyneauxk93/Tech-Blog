const logout = async () => {
  //POST request made to user logout api route which will remove the log in session 
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  //if successful it will then replace the current view with login 
  if (response.ok) {
    document.location.replace('/login');
  } else {
    alert(response.statusText);
  }
};

document.querySelector('#logout').addEventListener('click', logout);
