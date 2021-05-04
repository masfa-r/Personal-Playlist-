const form = document.querySelector('#myform');
const addToPlayList = document.querySelector('#video-opt-form');
const playListContainer = document.querySelector('.collection');
const myVideoName = document.querySelector('#my-video-name');
let url1;

// Event Listeners
form.addEventListener("submit", extractURL);
document.addEventListener('DOMContentLoaded', getVideos);

// Get From Local Storage
function getVideos() {
    let videos;
    if (localStorage.getItem('videos') === null) {
        videos = [];
    }
    else {
        videos = JSON.parse(localStorage.getItem('videos'));
    }
    videos.forEach(function (obj) {
        let videoTitle = document.querySelector('#my-video-name').value;
        // console.log(videoTitle);
        let url = document.querySelector('#url').value;
        // console.log(url.value);
        // Create PlayList card
        const card = document.createElement('div');
        card.className = 'collection-item';
        // Music Icon
        const musicIcon = document.createElement('i');
        musicIcon.setAttribute("class", "fas fa-play");
        card.appendChild(musicIcon);
        // Video Title
        const titleDisplay = document.createElement('p');
        titleDisplay.innerHTML = obj.title;
        card.appendChild(titleDisplay);
        // Delete Btn Icon
        const delBtn = document.createElement('i');
        delBtn.setAttribute("class", "fas fa-times");
        card.appendChild(delBtn);
        // Append cards
        playListContainer.appendChild(card);
        // Adding to iframe on clicking cards
        card.onclick = function() {
            const result = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${obj.ID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
            const videoDisplay = document.querySelector('#result');
            videoDisplay.innerHTML = result;
            // Display title below iframe
            const displayVideoName = document.querySelector('#Display-video-name');
            displayVideoName.innerHTML = obj.title;
            document.querySelector('.download-btn').style.display = "flex";
        }
        // Delete playlist item onclick
        delBtn.onclick =
            function removeTask() {
                delBtn.parentElement.remove();
                removeFromLocalStorage(card);
            }
    })
}

// Extracting URL function 
function extractURL(e) {
    e.preventDefault();
    // Get User Input Video URL
    let url = document.querySelector('#url').value;
    // console.log(url);
    // console.log(typeof url);

    let vID = url.split("v=", url.length - 1)[1];
    let videoID = vID.split("&list")[0];
    console.log(videoID);

    const result = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
    // console.log(result);
    addToPlayList.addEventListener("submit", addToCards);
    const videoDisplay = document.querySelector('#result');
    videoDisplay.innerHTML = result;

    const displayVideoName = document.querySelector('#Display-video-name');
    displayVideoName.innerHTML = "";
    url1 = url;
    document.querySelector('#url').value = '';
}

// Add to PlayList
function addToCards(e) {
    e.preventDefault();

    let videoTitle = document.querySelector('#my-video-name').value;
    // console.log(videoTitle);
    // let url = document.querySelector('#url').value;
    // console.log(url.value);

    let vID = url1.split("v=", url1.length - 1)[1];
    let videoID = vID.split("&list")[0];

    // Create PlayList card
    const card = document.createElement('div');
    card.className = 'collection-item';
    // Music Icon
    const musicIcon = document.createElement('i');
    musicIcon.setAttribute("class", "fas fa-play");
    card.appendChild(musicIcon);
    // Video Title
    const titleDisplay = document.createElement('p');
    titleDisplay.innerHTML = videoTitle;
    card.appendChild(titleDisplay);
    // Delete Btn Icon
    const delBtn = document.createElement('i');
    delBtn.setAttribute("class", "fas fa-times");
    card.appendChild(delBtn);

    // Append cards
    playListContainer.appendChild(card);
    card.onclick = function () {
        const result = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
        const videoDisplay = document.querySelector('#result');
        videoDisplay.innerHTML = result;

        const displayVideoName = document.querySelector('#Display-video-name');
        displayVideoName.innerHTML = videoTitle;
        
        document.querySelector('.download-btn').style.display = "flex";
    }
    // Delete playlist item onclick
    delBtn.onclick =
        function removeTask() {
            delBtn.parentElement.remove();
            removeFromLocalStorage(card);
        }
    myVideoName.value = '';
    const displayVideoName = document.querySelector('#Display-video-name');
    displayVideoName.innerHTML = videoTitle;
    // Store tasks in Local Storage
    e.target.onclick = storeInLocalStorage(videoID, videoTitle);
}

// Add in Local Storage
function storeInLocalStorage(videoID, videoTitle) {
    let videoObj = {
        ID: `${videoID}`,
        title: `${videoTitle}`
    }
    let videos;
    if (localStorage.getItem('videos') === null) {
        videos = [];
    }
    else {
        videos = JSON.parse(localStorage.getItem('videos'));
    }
    videos.push(videoObj);
    localStorage.setItem('videos', JSON.stringify(videos));
    // console.log(videoObj);
}

// Remove From Local Storage
function removeFromLocalStorage(playlistItem) {
    let videos;
    if (localStorage.getItem('videos') === null) {
        videos = [];
    }
    else {
        videos = JSON.parse(localStorage.getItem('videos'));
    }
    console.log(playlistItem);
    videos.forEach(function (video, index) {
        if (playlistItem.textContent === video.title) {
            console.log(videos.splice(index, 1));
        }
    });
    localStorage.setItem('videos', JSON.stringify(videos));
}

