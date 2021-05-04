const form = document.querySelector('#myform');
const addToPlayList = document.querySelector('#video-opt-form');
const playListContainer = document.querySelector('.collection');
const myVideoName = document.querySelector('#my-video-name');

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

        let videoID = url.split("=", url.length - 1)[1];
        // let vID = url.split("v=", url.length - 1)[1];
        // let videoID = vID.split("&")[0];
        // let videoID = vID.split("&index")[0];

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


        card.onclick = function(){
            const result = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${obj.ID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
            const videoDisplay = document.querySelector('#result');
            videoDisplay.innerHTML = result;
        }
          // Delete playlist item onclick
          delBtn.onmouseover
          delBtn.onclick =
          function removeTask() {
              delBtn.parentElement.remove();
              removeFromLocalStorage(card);
          }
    })

}

// Extracting URL function 
function extractURL(e) {
    // Get User Input Video URL
    let url = document.querySelector('#url').value;
    // console.log(url);
    // console.log(typeof url);

    // Extract Video ID
    let videoID = url.split("=", url.length - 1)[1];
    // console.log(videoID);
    // let vID = url.split("v=", url.length - 1)[1];
    // let videoID = vID.split("&index")[0];
    // ?autoplay=1&mute=0

    // https://www.youtube.com/watch?v=mVxMqmeeLXc&list=RDGMEMCMFH2exzjBeE_zAHHJOdxg&index=3
    const result = `
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;


    addToPlayList.addEventListener("submit", addToCards);


    const videoDisplay = document.querySelector('#result');
    videoDisplay.innerHTML = result;

    
    e.preventDefault();
}


// Add to PlayList
function addToCards(e) {
    let videoTitle = document.querySelector('#my-video-name').value;
    // console.log(videoTitle);
    let url = document.querySelector('#url').value;

    // console.log(url.value);
  
    // let vID = url.split("v=", url.length - 1)[1];
    // let videoID = vID.split("&")[0];
    // let videoID = vID.split("&index")[0];
    let videoID =url.split("=", url.length - 1)[1];
    // console.log(videoID);

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

    // 

    https://www.youtube.com/watch?v=TrPvQvbp3Cg
    card.onclick = function(){
        // <iframe width="940" height="632" src="https://www.youtube.com/embed/s-QnLRNu2K8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        const result = `
        <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoID}?autoplay=1&mute=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;


        const videoDisplay = document.querySelector('#result');
        videoDisplay.innerHTML = result;


    }
    
    // Delete playlist item onclick
    delBtn.onclick =
    function removeTask() {
        delBtn.parentElement.remove();
        removeFromLocalStorage(card);
    }

    myVideoName.value = '';
    document.querySelector('#url').value = '';
    // Store tasks in Local Storage
    e.target.onclick = storeInLocalStorage(videoID, videoTitle);
    e.preventDefault();
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
    videos.forEach(function(index) {

       videos.splice(index,1);
    });
    localStorage.setItem('videos', JSON.stringify(videos));
}

{/* <iframe width="853" height="480" src="https://www.youtube.com/embed/ZHKIs2CPEk4?list=RDMM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}