export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioVolume = document.querySelector('.radio-volume');
    const radioMute = document.querySelector('.radio-mute');

    let prevVolume = 0.1;

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;

    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.add('fa-stop');
            radioStop.classList.remove('fa-play');
        }
    };

    const selectItem = elem => {
        radioItem.forEach(item => item.classList.remove('select'));
        elem.classList.add('select');
    }

    radioNavigation.addEventListener('change', (event) => {
        const parent = event.target.closest('.radio-item'),
            title = parent.querySelector('.radio-name').textContent,
            img = parent.querySelector('.radio-img').src;

        selectItem(parent);
        radioHeaderBig.textContent = title;
        radioCoverImg.src = img;

        audio.src = event.target.dataset.radioStantion;

        audio.play();

        radioStop.disabled = false;
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });

    radioVolume.addEventListener('input', () => {
        audio.volume = radioVolume.value / 100;
        prevVolume = audio.volume;
    });

    audio.volume = 0.1;
    radioVolume.value = audio.volume * 100;

    radioMute.addEventListener('click', () => {
        if (audio.volume) {
            prevVolume = audio.volume;
            audio.volume = 0;
        } else {
            audio.volume = prevVolume;
        }
        radioVolume.value = audio.volume * 100;
    });

    radioPlayerInit.stop = () => {
        audio.pause();
        changeIconPlay();
    };
};