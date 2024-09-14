async function fetchProfile() {
    try {
      const response = await fetch('/api/user/profil', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const result = await response.json();
      
      if (result.success) {
        document.getElementById('nama').value = result.user.nama;
        document.getElementById('alamat').value = result.user.alamat;
        document.getElementById('kelurahan').value = result.user.kelurahan;
        document.getElementById('kecamatan').value = result.user.kecamatan;
        document.getElementById('nomorWA').value = result.user.nomorWA;
      } else {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
      }
    } catch (error) {
      document.getElementById('message').innerHTML = '<div class="alert alert-danger">Failed to fetch profile</div>';
    }
  }

  document.addEventListener('DOMContentLoaded', fetchProfile);

  document.getElementById('updateProfileForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const kelurahan = document.getElementById('kelurahan').value;
    const kecamatan = document.getElementById('kecamatan').value;
    const nomorWA = document.getElementById('nomorWA').value;

    try {
      const response = await fetch('/api/user/profil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ nama, alamat, kelurahan, kecamatan, nomorWA })
      });

      const result = await response.json();

      if (result.success) {
        swal({
          title: "Update Profil Berhasill!",
          icon: "success",
          buttons: {
              confirm: {
                  text: "OK",
                  className: "btn btn-success",
                  value: true,
                  visible: true,
                  className: "",
                  closeModal: true
              }
          }
      }).then((value) => {
          if (value) {
              location.reload();
          }
      });
        // document.getElementById('message').innerHTML = '<div class="alert alert-success">Profile updated successfully</div>';
        // location.reload();
      } else {
        document.getElementById('message').innerHTML = `<div class="alert alert-danger">${result.message}</div>`;
      }
    } catch (error) {
      document.getElementById('message').innerHTML = '<div class="alert alert-danger">Failed to update profile</div>';
    }
  });