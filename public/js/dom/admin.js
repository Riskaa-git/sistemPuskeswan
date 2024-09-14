document.addEventListener('DOMContentLoaded', function() {
  // Fetch consultations
  fetch('/api/admin/consultations', {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
  })
  .then(response => response.json())
  .then(data => {
      const consultationsDiv = document.getElementById('consultations');
      if (data.consultations) {
          consultationsDiv.innerHTML = `
              <h2>Consultation Requests</h2>
              <div class="table-responsive">
                  <table id="consultations-table" class="display table table-striped table-hover">
                      <thead>
                          <tr>
                              <th scope="col">Nama Hewan</th>
                              <th scope="col">Umur Hewan</th>
                              <th scope="col">Jenis Kelamin</th>
                              <th scope="col">Jenis Hewan</th>
                              <th scope="col">Keluhan</th>
                              <th scope="col">Antrian</th>
                              <th scope="col">Action</th>
                          </tr>
                      </thead>
                      <tbody>
                      </tbody>
                  </table>
              </div>
          `;
          const tbody = consultationsDiv.querySelector('tbody');
          data.consultations.forEach(consultation => {
              tbody.innerHTML += `
                  <tr>
                      <td>${consultation.namaHewan}</td>
                      <td>${consultation.umurHewan}</td>
                      <td>${consultation.jenisKelamin}</td>
                      <td>${consultation.jenisHewan}</td>
                      <td>${consultation.keluhan}</td>
                      <td>${consultation.queueNumber}</td>
                      <td>
                          <a href="/consultation-detail/${consultation.id}" class="btn btn-primary btn-sm">Detail</a>
                      </td>
                  </tr>
              `;
          });

          // Initialize DataTable
          $(document).ready(function() {
              $('#consultations-table').DataTable({
                  "pageLength": 10,
                  "lengthMenu": [10, 25, 50, 75, 100],
              });
          });
      } else {
          consultationsDiv.innerText = data.message || 'Error fetching consultations';
      }
  })
  .catch(error => {
      document.getElementById('consultations').innerText = 'Error fetching consultations';
      console.error('Error:', error);
  });


});


document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/admin/users', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const usersDiv = document.getElementById('users');
    if (data.users) {
      // Membuat div dengan kelas 'table-responsive'
      const tableResponsiveDiv = document.createElement('div');
      tableResponsiveDiv.className = 'table-responsive';
      
      // Membuat tabel dengan kelas 'table table-striped table-hover'
      const table = document.createElement('table');
      table.id = 'basic-datatables';
      table.className = 'display table table-striped table-hover';
      table.innerHTML = `
        <thead>
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      `;
      
      // Memasukkan data pengguna ke dalam tabel
      const tbody = table.querySelector('tbody');
      data.users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.email}</td>
          <td>${user.role}</td>
        
        `;
        tbody.appendChild(row);
      });

      // Menambahkan tabel ke dalam div 'table-responsive'
      tableResponsiveDiv.appendChild(table);

      // Mengganti isi usersDiv dengan tabel yang telah dibuat
      usersDiv.innerHTML = '';
      usersDiv.appendChild(tableResponsiveDiv);

      // Initialize DataTable
      $(document).ready(function() {
        $('#basic-datatables').DataTable();
      });
    } else {
      usersDiv.innerText = data.message || 'Error fetching users';
    }
  })
  .catch(error => {
    document.getElementById('users').innerText = 'Error fetching users';
    console.error('Error:', error);
  });
});



document.getElementById('createAdmin').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  
  fetch('/api/admin/create-admin', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    alert(data.message || 'created admin succcess');
    refreshPage(); // Refresh halaman setelah alert
  })
  .catch(error => {
    document.getElementById('message').innerText = 'Error registering';
    console.error('Error:', error);
  });
});
  
  function rejectConsultation(id) {
    fetch(`/api/admin/handle-consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ consultationId: id, action: 'reject' })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message || 'Consultation rejected');
      removeConsultationElement(id); // Hapus elemen dari DOM
      refreshPage(); // Refresh halaman setelah alert
  
    })
    .catch(error => {
      alert('Error rejecting consultation');
      console.error('Error:', error);
    });
  }
  
  function removeConsultationElement(id) {
    const consultationDiv = document.querySelector(`[data-consultation-id="${id}"]`);
    if (consultationDiv) {
      consultationDiv.remove();
    }
  }
  
  function refreshPage() {
    window.location = window.location.href;
  }
