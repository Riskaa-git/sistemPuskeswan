// public/js/register.js

document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const nama = document.getElementById('nama').value;
    const NIK = document.getElementById('NIK').value;
    const alamat = document.getElementById('alamat').value;
    const kelurahan = document.getElementById('kelurahan').value;
    const kecamatan = document.getElementById('kecamatan').value;
    const nomorWA = document.getElementById('nomorWA').value;
    
    fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, nama, NIK, alamat, kelurahan, kecamatan, nomorWA })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('message').innerText = data.message || 'Registration successful';
      if (data.success) {
        console.log('Redirecting to login page');
        window.location.href = '/login'; // Redirect ke halaman login setelah berhasil
      }
    })
    .catch(error => {
      document.getElementById('message').innerText = 'Error registering';
      console.error('Error:', error);
    });
  });
  