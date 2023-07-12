async function logPhotos() {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums/2/photos");
    const photos = await response.json();

    return photos;
}


printPhotos(); 

async function printPhotos() { /* wrap for loop inside another
     async funtion bc logPhotos() is an async function */

    var totalPhotos = 0;
    for (let photos of await logPhotos()) { 
        console.log(photos); 

        var card = document.createElement("div");
        var imgDiv = document.createElement("div");
        var textDiv = document.createElement("div");

        card.append(imgDiv);
        card.append(textDiv);

        var gallery = document.getElementById("video-gallery");
        gallery.append(card);

        var imgTag = document.createElement("img");

        imgTag.setAttribute("class", "img-responsive");
        imgTag.setAttribute("src", photos.thumbnailUrl);
        imgTag.setAttribute("alt", "placeholder picture");

        imgDiv.append(imgTag);

        var textTag = document.createElement("p");

        textTag.textContent = photos.title;

        textDiv.append(textTag);

        
        var totalPhotos = totalPhotos + 1;
        
    }
    
    // return totalPhotos;
    displayTotalPhotos(totalPhotos);
    /* 

    calls to displayTotalPhotos because otherwise
    that function would have not been called.

    1. printPhotos() gets called and ran
    2. calls displayTotalPhotos and passes totalPhotos as argument

    */
}



async function displayTotalPhotos(total) {
    var videos = document.getElementById("site-videos");

    videos.textContent = total;
}


