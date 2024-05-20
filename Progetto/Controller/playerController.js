const lerp = (start, end, speed) => start + (end - start) * speed


class Controller {
    KEY_CODES = {
        W: 87,
        A: 65,
        S: 83,
        D: 68,
        SHIFT: 16,
        ESCAPE: 27
    };

    // player left stik movement
    xStik;
    yStik;

    // keys left stik
    wKey;
    sKey;
    aKey;
    dKey;

    //
    shiftKey;

    constructor() {

        //fix
        canvas.addEventListener('click', () => {
            canvas.requestPointerLock();
        });

        this.xStik = 0;
        this.yStik = 0;

        this.wKey = false;
        this.sKey = false;
        this.aKey = false;
        this.dKey = false;

        this.shiftKey = false;

        this.setFuncion();
    }

    setFuncion() {

        let self = this;

        window.addEventListener('mousemove', function (e) {
            console.log(e.movementX);

            game.playerTurnHead(e.movementX, e.movementY)
        })

        window.onkeyup = function (e) {
            switch (e.keyCode) {
                case self.KEY_CODES.W:
                    self.wKey = false;
                    break;
                case self.KEY_CODES.S:
                    self.sKey = false;
                    break;
                case self.KEY_CODES.A:
                    self.aKey = false;
                    break;
                case self.KEY_CODES.D:
                    self.dKey = false;
                    break;
                case self.KEY_CODES.SHIFT:
                    self.shiftKey = false;
                    break;
            }
        }

        window.onkeydown = function (e) {
            switch (e.keyCode) {
                case self.KEY_CODES.W:
                    self.wKey = true;
                    break;
                case self.KEY_CODES.S:
                    self.sKey = true;
                    break;
                case self.KEY_CODES.A:
                    self.aKey = true;
                    break;
                case self.KEY_CODES.D:
                    self.dKey = true;
                    break;
                case self.KEY_CODES.SHIFT:
                    self.shiftKey = true;
                    break;
                case self.KEY_CODES.ESCAPE:
                    //fix
                    canvas.releasePointerCapture();
                    break
            }
        };
    }

    loop() {
        this.yStik = this.inclineStik(this.wKey, this.sKey, this.yStik);
        this.xStik = this.inclineStik(this.dKey, this.aKey, this.xStik);

        this.yStik = this.roundStick(this.yStik);
        this.xStik = this.roundStick(this.xStik);

        game.playerWalk(this.xStik, -this.yStik);
        game.setPlayerRunning(this.shiftKey);
    }

    inclineStik(positive, negative, value) {
        if (positive || negative) {
            if (positive)
                value = lerp(value, 1, 0.1);
            else
                value = lerp(value, -1, 0.1);
        }
        else
            value = lerp(value, 0, 0.3);
        return value;
    }

    roundStick(value) {
        if (value >= 0.99)
            value = 1
        if (value <= 0.01 && value >= -0.01)
            value = 0
        if (value <= -0.99)
            value = -1

        return value;
    }
}

const controller = new Controller();