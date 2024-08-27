document.getElementById('consultationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const namaHewan = document.getElementById('namaHewan').value.trim();
  const umurHewan = document.getElementById('umurHewan').value.trim();
  const jenisKelamin = document.querySelector('input[name="jenisKelamin"]:checked').value.trim();
  const jenisHewan = document.getElementById('jenisHewan').value.trim();
  const keluhan = document.getElementById('keluhan').value.trim();
  const MAX_LENGTH = 255;

  if (namaHewan.length > MAX_LENGTH || umurHewan.length > MAX_LENGTH || jenisKelamin.length > MAX_LENGTH || jenisHewan.length > MAX_LENGTH || keluhan.length > MAX_LENGTH) {
    document.getElementById('message').innerText = `Seluruh Form Minimal ${MAX_LENGTH} characters`;
    return;
  }

  fetch('/api/consultation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({ namaHewan, umurHewan, jenisKelamin, jenisHewan, keluhan })
  })
  .then(response => response.json())
  .then(data => {
    swal({
        title: "Pendaftaran Berhasill!",
        text: "pendataftaran akan segera di proses!",
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
})
.catch(error => {
    document.getElementById('message').innerText = 'Masukan dahulu data hewan: ' + error;
    console.error('Error:', error);
});

});

document.getElementById('cancelButton').addEventListener('click', function() {
  document.getElementById('consultationForm').reset();
});

// $("#alert_demo_3_3").click(function (e) {
//   swal("Good job!", "You clicked the button!", {
//     icon: "success",
//     buttons: {
//       confirm: {
//         className: "btn btn-success",
//       },
//     },
//   });
// });
