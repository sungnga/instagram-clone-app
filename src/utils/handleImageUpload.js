async function handleImageUpload(image, uploadPreset = 'instagram') {
	// FormData() is a constructor that returns a data object
	// What we append to data object is key/value pair
	const data = new FormData();
	data.append('file', image);
	data.append('upload_preset', uploadPreset);
	data.append('cloud_name', 'sungnga');
	const response = await fetch(
		'https://api.cloudinary.com/v1_1/sungnga/image/upload',
		{
			method: 'POST',
			accept: 'application/json',
			body: data
		}
	);
	const jsonResponse = await response.json();
	return jsonResponse.url;
}

export default handleImageUpload;
