const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ['Dance With the Dead - Blind', 'Five Finger Death Punch - Wrong side of heaven', 'Krokus - Hoodoo Woman'];

// Keep track of song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);


// window.AudioContext = window.AudioContext || window.webkitAudioContext;
// const audioContext = new AudioContext();

// const drawAudio = ???!!! // не знаю як його підєднати

// const filterData = audioBuffer => {
//   const rawData = audioBuffer.getChannelData(0); 
//   const samples = 70;
//   const blockSize = Math.floor(rawData.length / samples);
//   const filteredData = [];
//   for (let i = 0; i < samples; i++) {
//     let blockStart = blockSize * i;
//     let sum = 0;
//     for (let j = 0; j < blockSize; j++) {
//       sum = sum + Math.abs(rawData[blockStart + j]);
//     }
//     filteredData.push(sum / blockSize);
//   return filteredData;
// };


// const normalizeData = filteredData => {
//     const multiplier = Math.pow(Math.max(...filteredData), -1);
//     return filteredData.map(n => n * multiplier);
// }

// const draw = normalizedData => {
//   const canvas = document.querySelector("myCanvas");
//   const dpr = window.devicePixelRatio || 1;
//   const padding = 20;
//   canvas.width = canvas.offsetWidth * dpr;
//   canvas.height = (canvas.offsetHeight + padding * 2) * dpr;
//   const ctx = canvas.getContext("2d");
//   ctx.scale(dpr, dpr);
//   ctx.translate(0, canvas.offsetHeight / 2 + padding);


//   const width = canvas.offsetWidth / normalizedData.length;
//   for (let i = 0; i < normalizedData.length; i++) {
//     const x = width * i;
//     let height = normalizedData[i] * canvas.offsetHeight - padding;
//     if (height < 0) {
//         height = 0;
//     } else if (height > canvas.offsetHeight / 2) {
//         height = height > canvas.offsetHeight / 2;
//     }
//     drawLineSegment(ctx, x, height, width, (i + 1) % 2);
//   }
// };

// const drawLineSegment = (ctx, x, height, width, isEven) => {
//   ctx.lineWidth = 1; // how thick the line is
//   ctx.strokeStyle = "#fff"; // what color our line is
//   ctx.beginPath();
//   height = isEven ? height : -height;
//   ctx.moveTo(x, 0);
//   ctx.lineTo(x, height);
//   ctx.arc(x + width / 2, height, width / 2, Math.PI, 0, isEven);
//   ctx.lineTo(x + width, 0);
//   ctx.stroke();
// };

// drawAudio();