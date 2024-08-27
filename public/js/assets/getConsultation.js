// document.addEventListener('DOMContentLoaded', function() {
//   const userId = localStorage.getItem('userId'); // atau document.getElementById('userId').value;

//   fetch(`/api/consultations/getStatusById/${userId}`, {
//     headers: {
//       method: 'GET',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     }
//   })
//   .then(response => response.json())
//   .then(data => {
//     const detailDiv = document.getElementById('consultation-detail');
//     if (data.user) {
//       const createdAtDate = new Date(data.consultation.createdAt);
//       const formattedDate = createdAtDate.toLocaleDateString();
//       detailDiv.innerHTML = `
//       <div class="row">
//       <div class="card">
//         <div class="card-header">
//        <div class="card-title">Detail Konsultasi Dan Informasi Pemilik</div>
//        </div>
//        <div class="card-body">
//       <div class="row mb-3">
//         <div class="col-md-6">
//           <h5>Informasi Hewan</h5>
//           <p><strong>Nama Hewan:</strong> ${consultation.namaHewan}</p>
//           <p><strong>Umur Hewan:</strong> ${consultation.umurHewan}</p>
//           <p><strong>Jenis Kelamin:</strong> ${consultation.jenisKelamin}</p>
//           <p><strong>Jenis Hewan:</strong> ${consultation.jenisHewan}</p>
//           <p><strong>Keluhan:</strong> ${consultation.keluhan}</p>
//           <p><strong>Status:</strong>${consultation.status}</p>
//           <p><strong>Tanggal:</strong> ${formattedDate}</p>
//         </div>
//         <div class="col-md-6">
//           <h5>Informasi Pemilik</h5>
//           <p><strong>Nama Pemilik:</strong> ${user.nama}</p>
//           <p><strong>NIK:</strong> ${user.NIK}</p>
//           <p><strong>Alamat:</strong> ${user.alamat}</p>
//           <p><strong>Kelurahan:</strong> ${user.kelurahan}</p>
//           <p><strong>Kecamatan:</strong> ${user.kecamatan}</p>
//           <p><strong>Nomor WA:</strong> ${user.nomorWA}</p>
//         </div>
//       </div>
//       <div class="d-flex justify-content-end">
//       </div>
//       </div>
//       </div>
//       </div>
//       `;
//     } else {
//       detailDiv.innerText = data.message || 'Error fetching consultation details';
//     }
//   })
//   .catch(error => {
//     document.getElementById('consultation-detail').innerText = 'Error fetching consultation details';
//     console.error('Error:', error);
//   });

// });


document.addEventListener('DOMContentLoaded', function() {
  // Fungsi untuk mengambil dan menampilkan riwayat konsultasi berdasarkan userId
  const userId = localStorage.getItem('userId'); // atau document.getElementById('userId').value;
  if (userId) {
    getConsultationsByUserId(userId);
  } else {
    console.error('User ID not found');
  }
  function getConsultationsByUserId(userId) {
    fetch(`/api/consultations/userConsultation/${userId}`, {
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


document.addEventListener('DOMContentLoaded', function() {
  const userId = localStorage.getItem('userId'); // atau document.getElementById('userId').value;
  if (userId) {
    getConsultationsByUserId(userId);
  } else {
    console.error('User ID not found');
  }

  function getConsultationsByUserId(userId) {
    fetch(`/api/consultation/queue/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const userConsultationsDiv = document.getElementById('userQueue');
      if (data.consultations) {
        userConsultationsDiv.innerHTML = '<h2>Antrian</h2>';
        data.consultations.forEach(consultation => {
          userConsultationsDiv.innerHTML += `
          <div class="card card-stats card-round">
            <div class="card-body">
              <div class="row align-items-center">
               <div class="col-icon">
                        <div
                          class="icon-big text-center icon-primary bubble-shadow-small"
                        >
                          <i class="fas fa-users"></i>
                        </div>
                      </div>
            <div class="col col-stats ms-3 ms-sm-0">
              <div class="numbers">
                  <h5 class="card-category">Nama Hewan: ${consultation.namaHewan}</h5>
                  <p class="card-title"><strong>Nomor Antrian:</strong> ${consultation.queueNumber}</p>
              </div>
            </div>
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

