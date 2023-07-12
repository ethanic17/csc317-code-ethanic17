async function logPhotos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums/2/photos");
    const photos = await response.json();
    console.log(photos);
}




logPhotos();