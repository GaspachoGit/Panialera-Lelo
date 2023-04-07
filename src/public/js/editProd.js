const form = document.querySelector("#editForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch("/ruta/para/actualizar/producto", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    console.log("Producto actualizado");
  } else {
    console.error("Error al actualizar el producto");
  }
});
