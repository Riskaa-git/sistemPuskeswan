document.addEventListener('DOMContentLoaded', function() {
  fetch('/api/admin/consultations/approved-rejected', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const approvedRejectedDiv = document.getElementById('approvedRejectedConsultations');
      if (data.consultations) {
          const tableResponsiveDiv = document.createElement('div');
          tableResponsiveDiv.className = 'table-responsive';

          const table = document.createElement('table');
          table.id = 'approved-rejected-table';
          table.className = 'display table table-striped table-hover';
          table.innerHTML = `
              <thead>
                  <tr>
                      <th scope="col">Nama Hewan </th>
                      <th scope="col">Keluhan</th>
                      <th scope="col">Status</th>
                      <th scope="col">Detail</th>
                  </tr>
              </thead>
              <tbody>
              </tbody>
          `;

          const tbody = table.querySelector('tbody');
          data.consultations.forEach(consultation => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td>${consultation.namaHewan}</td>
                  <td>${consultation.keluhan}</td>
                  <td>${consultation.status}</td>
                  <td>
                  <a href="/admin/consultation-detail-admin/${consultation.id}" class="btn btn-primary btn-sm">Detail</a>

                  </td>

              `;
              tbody.appendChild(row);
          });

          tableResponsiveDiv.appendChild(table);
          approvedRejectedDiv.innerHTML = '';
          approvedRejectedDiv.appendChild(tableResponsiveDiv);

          $(document).ready(function() {
              $('#approved-rejected-table').DataTable({
                  "pageLength": 10,
                  "lengthMenu": [10, 25, 50, 75, 100],
                  
              });
          });
      } else {
        approvedRejectedDiv.innerText = data.message || 'Error fetching approved/rejected consultations';
      }
    })
    .catch(error => {
      document.getElementById('approvedRejectedConsultations').innerText = 'Error fetching approved/rejected consultations';
      console.error('Error:', error);
    });
});


    document.addEventListener('DOMContentLoaded', function() {
        // Fungsi untuk mengambil dan menampilkan riwayat konsultasi berdasarkan userId
        function getConsultationsByUserId(userId) {
          fetch(`/api/admin/consultations/user/${userId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {
            const userConsultationsDiv = document.getElementById('userConsultations');
            if (data.consultations) {
              userConsultationsDiv.innerHTML = '<h2>User Consultations</h2>';
              data.consultations.forEach(consultation => {
                userConsultationsDiv.innerHTML += `
                  <div>
                    <p>${consultation.keluhan} - ${consultation.status}</p>
                  </div>
                `;
              });
            } else {
              userConsultationsDiv.innerText = data.message || 'Error fetching user consultations';
            }
          })
          .catch(error => {
            document.getElementById('userConsultations').innerText = 'Error fetching user consultations';
            console.error('Error:', error);
          });
        }
      
        // Fungsi untuk mencari konsultasi berdasarkan query
        function searchConsultations(query) {
          fetch(`/api/admin/consultations/search?query=${query}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          .then(response => response.json())
          .then(data => {
            const searchResultsDiv = document.getElementById('searchResults');
            if (data.consultations) {
              searchResultsDiv.innerHTML = '<h2>Search Results</h2>';
              data.consultations.forEach(consultation => {
                searchResultsDiv.innerHTML += `
                  <div>
                    <p>${consultation.keluhan} - ${consultation.status}</p>
                  </div>
                `;
              });
            } else {
              searchResultsDiv.innerText = data.message || 'No results found';
            }
          })
          .catch(error => {
            document.getElementById('searchResults').innerText = 'Error fetching search results';
            console.error('Error:', error);
          });
        }
      
        // Fungsi untuk menangani pencarian
        function search() {
          const query = document.getElementById('searchQuery').value;
          searchConsultations(query);
        }
      
        //  event listener ke tombol pencarian
        document.getElementById('searchButton').addEventListener('click', search);
      
        //  fungsi search ke dalam global scope untuk bisa dipanggil dari HTML
        window.searchConsultations = searchConsultations;
      });
      