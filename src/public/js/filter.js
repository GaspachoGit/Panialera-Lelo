document.getElementById('filter-form').addEventListener('submit', function (e){
	e.preventDefault()

	const url = '/api/products?'
	const filterData = {
    type: encodeURIComponent(document.getElementById('type').value),
    brand: encodeURIComponent(document.getElementById('brand').value),
    size: encodeURIComponent(document.getElementById('size').value)
  };

	fetch(url + new URLSearchParams(filterData))
	.then(res => res.json)
	.then(data => console.log(data))
	.catch(err => console.log(err))
})