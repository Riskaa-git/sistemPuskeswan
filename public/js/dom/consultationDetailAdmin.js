document.addEventListener('DOMContentLoaded', function() {
    const consultationId = window.location.pathname.split('/').pop();

    fetch(`/api/consultations/${consultationId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => response.json())
    .then(data => {
      const detailDiv = document.getElementById('consultation-detail');
      if (data.consultation) {
        const createdAtDate = new Date(data.consultation.createdAt);
        const formattedDate = createdAtDate.toLocaleDateString();
        detailDiv.innerHTML = `
        <div class="row">
        <div class="card">
          <div class="card-header">
         <div class="card-title">Detail Konsultasi Dan Informasi Pemilik</div>
         </div>
         <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-6">
            <h5>Informasi Hewan</h5>
            <p><strong>Nama Hewan:</strong> ${data.consultation.namaHewan}</p>
            <p><strong>Umur Hewan:</strong> ${data.consultation.umurHewan}</p>
            <p><strong>Jenis Kelamin:</strong> ${data.consultation.jenisKelamin}</p>
            <p><strong>Jenis Hewan:</strong> ${data.consultation.jenisHewan}</p>
            <p><strong>Keluhan:</strong> ${data.consultation.keluhan}</p>
            <p><strong>Status:</strong>${data.consultation.status}</p>
            <p><strong>Tanggal:</strong> ${formattedDate}</p>
          </div>
          <div class="col-md-6">
            <h5>Informasi Pemilik</h5>
            <p><strong>Nama Pemilik:</strong> ${data.consultation.User.nama}</p>
            <p><strong>NIK:</strong> ${data.consultation.User.NIK}</p>
            <p><strong>Alamat:</strong> ${data.consultation.User.alamat}</p>
            <p><strong>Kelurahan:</strong> ${data.consultation.User.kelurahan}</p>
            <p><strong>Kecamatan:</strong> ${data.consultation.User.kecamatan}</p>
            <p><strong>Nomor WA:</strong> ${data.consultation.User.nomorWA}</p>
          </div>
        </div>
        <div class="d-flex justify-content-end">
            <button class="btn btn-danger btn-sm delete-btn" data-id="${data.consultation.id}">Hapus</button>
        </div>
        </div>
        </div>
        </div>
        `;
        
        // Tambahkan event listener untuk tombol delete setelah elemen-elemen HTML di-render
        document.querySelector('.delete-btn').addEventListener('click', function() {
          const consultationId = this.getAttribute('data-id');
          deleteConsultation(consultationId);
        });

      } else {
        detailDiv.innerText = data.message || 'Error fetching consultation details';
      }
    })
    .catch(error => {
      document.getElementById('consultation-detail').innerText = 'Error fetching consultation details';
      console.error('Error:', error);
    });

});

function deleteConsultation(consultationId) {
    if (confirm('Apakah Anda yakin ingin menghapus konsultasi ini?')) {
      fetch(`/api/admin/consultations/${consultationId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Error deleting consultation');
          });
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('Konsultasi berhasil dihapus');
          window.location.href = '/manageConsultation';
        } else {
          alert('Error deleting consultation');
          console.error('Delete error:', data);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert(`Error deleting consultation: ${error.message}`);
      });
    }
}
