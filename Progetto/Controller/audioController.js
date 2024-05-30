class AudioController {
    ambientAudio;
    switchAudio;
    walkingAudio;
    runningAudio;
    distortionAudio;

    audioOn;

    constructor() {
        this.audioOn = false;

        let AudioChekbox = document.getElementById("Audio-set");

        this.ambientAudio = new Audio('../assets/audio/night-environment.mp3');

        this.distortionAudio = new Audio('../assets/audio/distortion.mp3');
        this.distortionAudio = new Audio('../assets/audio/giuseppe1.mp3');

        this.switchAudio = new Audio('../assets/audio/standard-switch-sound.mp3');
        this.switchAudio.volume = 0.2;

        this.walkingAudio = new Audio('../assets/audio/walking.mp3');
        this.runningAudio = new Audio('../assets/audio/running.mp3')

        let self = this;

        // assegno la funzione alle checkbox
        AudioChekbox.addEventListener('change', function () {
            if (this.checked) {
                self.ambientAudio.play();
                self.audioOn = true;
            } else {
                self.ambientAudio.pause();
                self.ambientAudio.currentTime = 0;
                self.audioOn = false;
            }
        });

        this.ambientAudio.addEventListener('ended', function () {
            this.currentTime = 0;
            this.play();
        }, false);
    }

    performSwitchAudio() {
        if (!this.audioOn)
            return;

        this.switchAudio.play();
        this.switchAudio.currentTime = 0;
    }

    performPlayerMovmentAudio(running) {
        if (!this.audioOn)
            return;

        if (running && !this.walkingAudio.paused)
            this.walkingAudio.pause()

        if (!running && !this.runningAudio.paused)
            this.runningAudio.pause()

        if (running)
            this.runningAudio.play();
        else
            this.walkingAudio.play();
    }

    stopPlayerMovmentAudio() {
        this.walkingAudio.pause();
        this.runningAudio.pause();
    }

    performDistortion(intensity){
        
        this.distortionAudio.volume = intensity;
        this.distortionAudio.play();
    }
}