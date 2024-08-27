document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  if (!email || !password) {
    document.getElementById('message').innerText = 'Email and password are required';
    return;
  }
  
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('message').innerText = data.message || 'Login successful';
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.userId);
      window.location.href = '/userDashboard';
    }
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error logging in';
    console.error('Error:', error);
  });
});
