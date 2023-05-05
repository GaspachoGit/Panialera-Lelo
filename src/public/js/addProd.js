const form = document.getElementById('addProdForm')

form.addEventListener('submit', e=>{
	e.preventDefault()

	const data = new FormData(form)
	const obj = {}
	data.forEach((value,key)=> obj[key] = value)

	const url = `http://localhost:8080/api/products`
	const headers = {
		'Content-Type': 'application/json'
	}
	const method = 'POST'
	const body = JSON.stringify(obj)

	fetch(url, {headers, method, body})
	.then(response => response.json)
	.then(data => console.log(data))
	.then(error=> console.log(error))

})