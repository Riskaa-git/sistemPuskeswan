document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk mengambil dan menampilkan riwayat konsultasi berdasarkan userId
    const userId = localStorage.getItem('userId'); // atau document.getElementById('userId').value;
    if (userId) {
      getConsultationsByUserId(userId);
    } else {
      console.error('User ID not found');
    }
    function getConsultationsByUserId(userId) {
      fetch(`/api/consultations/getStatusById/${userId}`, {
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
          <div class="col-md-6 mb-4">
                <div class="card">
                  <div class="card-header">
                    <h5 class="card-title">Detail Konsultasi</h5>
                  </div>
                  <div class="card-body">
                    <h5>Informasi Hewan</h5>
                    <p><strong>Nama Hewan:</strong> ${consultation.namaHewan}</p>
                    <p><strong>Umur Hewan:</strong> ${consultation.umurHewan}</p>
                    <p><strong>Jenis Kelamin:</strong> ${consultation.jenisKelamin}</p>
                    <p><strong>Jenis Hewan:</strong> ${consultation.jenisHewan}</p>
                    <p><strong>Keluhan:</strong> ${consultation.keluhan}</p>
                    <p><strong>Status:</strong> ${consultation.status}</p>
                  </div>
                </div>
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
  
  });