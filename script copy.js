console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay')
let myProgressBar = document.getElementById('myProgressBar')
let gif = document.getElementById('gif')
let masterSongName = document.getElementById('masterSongName')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Teri Tasweer - Bayaan", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Sab Tumhary Liye - PaposhNagar", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Still Rollin - Shubh", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Dil Ka Ghar - Bayaan", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Faasle - Aditya Rikhari", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Waqt Ki Baatein - Dream Note", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Mein Koun Houn - Mooroo", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Khel Tamasha - Bayaan", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Jaane Wo Kaise - Sanam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Mera Musafir - Bayaan", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName
});

// audioElement.play();


// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play()
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }
    else{
        audioElement.pause()
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
        gif.style.opacity = 0
    }

})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    myProgressBar.value= progress
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})




Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log("Button clicked: ", e.target.id);
        // If the clicked song is already playing, pause it
        if (songIndex === parseInt(e.target.id)) {
            console.log("Current song clicked.")
            if (audioElement.paused) {
                audioElement.play();
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            } else {
                console.log("New song clicked.")
                audioElement.pause();
                e.target.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
            }
        } else { // Otherwise play the clicked song
            makeAllPlays();
            songIndex = parseInt(e.target.id);
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
        }
    })
});







document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= 9){
        songIndex = 0
    }
    else{
        songIndex += 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})


document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0){
        songIndex = 0
    }
    else{
        songIndex -= 1
    }
    audioElement.src = `songs/${songIndex+1}.mp3`
    masterSongName.innerText = songs[songIndex].songName
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
})

