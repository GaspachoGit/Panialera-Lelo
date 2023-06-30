document.getElementById('closeDailyBtn').addEventListener('click', function(event) {
  const bid = '649f1d1e487f581e1e53370d'; // ID de la caja actual
  const url = `http://localhost:8080/api/box/${bid}/daily`;
  const method = 'PATCH';
  
  fetch(url, { method })
    .then(response => response.json())
    .then(data => {
      console.log(data);
			location.reload();
    })
    .catch(error => {
      console.error(error);
      // Manejar el error de la solicitud, mostrar mensaje de error, etc.
    });
});