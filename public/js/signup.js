// Purpose: to create a new user
const signupFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the form
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const confirmPassword = document
    .querySelector('#confirm-password-signup')
    .value.trim();

  // Send a POST request to the API endpoint
  if (name && email && password && confirmPassword === password) {
    const response = await fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    // setTimeout allows user to be created before attempting redirect
    setTimeout(() => {
      if (response.ok) {
        document.location.replace('dashboard');
      } else {
        alert('Passwords do not match, please try again.');
      }
    }, 1000);
  }
};

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
