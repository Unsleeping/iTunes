import { addZero } from './supScript.js';

export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoVolume = document.querySelector('.video-volume'),
        videoFullscreen = document.querySelector('.video-fullscreen'),
        videoTimeTotal = document.querySelector('.video-time__total');

    videoPlayer.currentTime = 0;

    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const togglePlay = () => {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
    };

    const stopPlay = () => {
        videoPlayer.pause();
        toggleIcon();
        videoPlayer.currentTime = 0;
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoButtonStop.addEventListener('click', stopPlay);
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime,
            duration = videoPlayer.duration;

        let minutePassed = Math.floor(currentTime / 60),
            secondPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60),
            secondTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = addZero(minutePassed) + ':' + addZero(secondPassed);
        videoTimeTotal.textContent = addZero(minuteTotal) + ':' + addZero(secondTotal);

        videoProgress.value = (currentTime / duration) * 100;
    });

    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration,
            value = videoProgress.value;

        videoPlayer.currentTime = value * duration / 100;
    });

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.webkitEnterFullScreen();
    });

    videoVolume.addEventListener('input', () => {
        videoPlayer.volume = videoVolume.value / 100;
    });

    videoPlayer.volume = 0.1;
    videoVolume.value = videoPlayer.volume * 100;

    videoPlayerInit.stop = () => {
        if (!videoPlayer.paused) stopPlay();
    };
};