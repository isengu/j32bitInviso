function paletteImageUpload() {
	const fileInput = document.getElementById("paletteImageUpload");

	const file = fileInput.files[0];

	let formData = new FormData();
	formData.append("file", file);

	let response = await fetch(backendLocation + '/api/file/upload', {
		method: "POST",
		headers: {
			Authorization: "Bearer " + getCookie("token"),
		}, 
		body: formData
	});

	if (response.ok) {
		let el = document.getElementById("imageLink");
		console.log(backendLocation + "/file/", "\n", response.text());
		el.value = backendLocation + "/file/" + response.text();
		console.log(response.text());
		el.dispatchEvent(new Event('change'));
	} else {
		alert("Something went wrong!");
	}
}

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}