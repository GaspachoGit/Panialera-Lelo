const form = document.getElementById('editForm'); // Obtener el formulario por su id

form.addEventListener('submit', e => {
  e.preventDefault();
  
  const data = new FormData(form)
  const obj = {}
  data.forEach((value,key)=> {
    if (value) {
      obj[key] = value
    }
  } )

  const productId = e.target.querySelector('button[type="submit"]').dataset.productId;
  const url = `http://localhost:8080/api/products/${productId}`
  const headers = {
    'Content-Type': 'application/json'
  }
  const method = 'PATCH'
  const body = JSON.stringify(obj)

  fetch(url, {
    headers,
    method,
    body
  })
  .then(response => response.json)
  .then(data => console.log(data))
  .catch(err=> console.log(err))

});