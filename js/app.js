const container = document.getElementById('container')
const audio = document.getElementById('audio')
const cover = document.getElementById('cover')
const title = document.getElementById('title')
const start = document.getElementById('start')
const end = document.getElementById('end')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const volume = document.getElementById('volume')


// music names
const songs = [
    'JONY-Титры',
    'Xcho - Ты и Я',
    'Escape & Даня Милохин - So low',
    'Hammali & Navai & Khalib - Боже, как завидую',
    'Macan - Кино',
]

// songIndex
let songIndex = 0

loadSong(songs[songIndex])


function loadSong(song) {
    title.textContent = song
    audio.src = `../musics/${song}.mp3`
    cover.src = `../album/${song}.jpg`
}

// play Songs
function playSong() {
    container.classList.add('play')
    playBtn.innerHTML = `<i class="fas fa-pause"</i>`
    audio.play()
}

// pause Song
function pauseSong() {
    container.classList.remove('play')
    playBtn.innerHTML = `<i class="fas fa-play"</i>`
    audio.pause()
}

// next Music
function nextMusic() {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    audio.play()
}

// pervious music
function prevMusic() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    audio.play()
}


function progres(e) {
    const duration = e.srcElement.duration
    const curTime = e.srcElement.currentTime
    const presentageWidth = (curTime / duration) * 100
    progress.style.width = `${presentageWidth}%`

    // end time
    let endMinutes = Math.floor(duration / 60)
    let endSecondes = Math.floor(duration % 60)
    end.textContent = `${endMinutes}:${(endSecondes = endSecondes <  10 ? '0'+ endSecondes : endSecondes)}`


    // start
    let startMinutes = Math.floor(curTime / 60)
    let startSecondes = Math.floor(curTime % 60)
    start.textContent = `${endMinutes = startMinutes < 10 ? '0' + startMinutes : startMinutes }:${(startSecondes = startSecondes <  10 ? '0'+ startSecondes : startSecondes)}`
}
// setProgress
function setProgress(e) {
    const width = this.clientWidth
    const widthX = e.offsetX
    const duration = audio.duration
    audio.currentTime = (widthX / width) * duration
}

function changeVolume(e) {
    const volumeMusic = +volume.value / +volume.max
    audio.volume = volumeMusic
}

// evens

playBtn.addEventListener('click', function() {
    const isPlaying = container.classList.contains('play')

    if (isPlaying) {
        pauseSong()
    } else {
        playSong()
    }
})


nextBtn.addEventListener('click', nextMusic)
prevBtn.addEventListener('click', prevMusic)
audio.addEventListener('timeupdate', progres)
audio.addEventListener('ended', nextMusic)
volume.addEventListener('input', changeVolume)
progressContainer.addEventListener('click', setProgress)