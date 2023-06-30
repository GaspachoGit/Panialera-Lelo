document.getElementById('updateForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const price = parseFloat(document.getElementById('price').value);
  const bid = '649f1d1e487f581e1e53370d';

	const url = `http://localhost:8080/api/box/${bid}`
	const method = 'PATCH'
	const headers = {
		'Content-Type': 'application/json'
	}
	const body = JSON.stringify({price})

  fetch(url, {
    method,
    headers,
    body
  })
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