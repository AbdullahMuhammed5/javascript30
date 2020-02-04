const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const playerButton = player.querySelector('.player__button');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullScreen = player.querySelector('.full-screen-toggle');


function handlePlay() {
	video.paused ? video.play() : video.pause()
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function updateButtonIcon() {
	const icon = this.paused ? '►' : '❚ ❚';
	playerButton.textContent = icon;	
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip)
}

function updateProgress() {
	parseInt(progress.style.flexBasis)
	video.currentTime = progress.style.flexBasis
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function toggleFullScreen() {
	// Method 1 .. by browser APIs
	// document.webkitIsFullScreen ? document.webkitExitFullscreen() : player.webkitRequestFullscreen()
	// Method 2 .. by CSS classes
	player.classList.contains('full-screen') ? player.classList.remove('full-screen') : player.classList.add('full-screen')
}

// events
playerButton.addEventListener('click', handlePlay)
video.addEventListener('click', handlePlay)
video.addEventListener('play', updateButtonIcon)
video.addEventListener('pause', updateButtonIcon)
video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach((button) => button.addEventListener('click', skip))

ranges.forEach((range) => range.addEventListener('change', handleRangeUpdate))

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullScreen.addEventListener('click', toggleFullScreen)