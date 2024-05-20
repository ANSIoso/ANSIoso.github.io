class Transform {
    transformMatrix;
    // una matrice m4 è così ordinata
    //  0 |  4 |  8 | 12
    // ------------------
    //  1 |  5 |  9 | 13
    // ------------------
    //  2 |  6 | 10 | 14
    // ------------------
    //  3 |  7 | 11 | 15

    constructor() {
        this.transformMatrix = m4.identity();
    }

    translate(xTransl, yTransl, zTransl, lockY) {
        m4.translate(this.transformMatrix, xTransl, yTransl, zTransl, this.transformMatrix);

        if(lockY)
            this.transformMatrix[13] = 0;
    }

    rotate(xRotate, yRotate, zRotate) {
        m4.xRotate(this.transformMatrix, xRotate, this.transformMatrix);
        m4.yRotate(this.transformMatrix, yRotate, this.transformMatrix);
        m4.zRotate(this.transformMatrix, zRotate, this.transformMatrix);
    }

    scale(xScale, yScale, zScale) {
        m4.scale(this.transformMatrix, xScale, yScale, zScale, this.transformMatrix);
    }

    getPosition() {
        return { x: this.transformMatrix[12], y: this.transformMatrix[13], z: this.transformMatrix[14] }
    }

    test() {
        console.log(this.transformMatrix);
        console.log(this.transformMatrix[0], this.transformMatrix[1]);
    }
}

function degToRad(deg) {
    return deg * Math.PI / 180;
}

class Game {
    // le info sugli oggetti presenti nel gioco saranno espresse nel formato:
    //          - modelID:      che indica quale mash rappresenta l'oggetto
    //          - transform:    che indica le trasformazioni da applicargli

    
    player;

    // player movement
    playerRunning;
    playerWalkSpeed = 1.5;
    playerRunSpeed = 3;

    entities = [];

    structures;

    terrain = [];

    dimTerrainX = 5;
    dimTerrainY = 5;
    terrainTailOffset = 200;

    constructor() {
        this.buildTerrain();


        this.player = new Transform();


        var t = new Transform();
        t.translate(0,-2,0);
        t.rotate(degToRad(-90), 0, 0);

        this.entities.push({
            transform: t,
            modelID: "gatto"
        })
    }

    // metodi settaggi iniziali
    buildTerrain(){
        for (let x = 0; x < this.dimTerrainX; x++) {
            for (let y = 0; y < this.dimTerrainY; y++) {
                
                var t = new Transform();
                t.translate(this.terrainTailOffset*x, -20, this.terrainTailOffset*y);
                // t.rotate(degToRad(-90), 0, 0);
                t.scale(10,10,10);
                
                this.terrain.push({
                    transform: t,
                    modelID: "terreno"
                })
            }
        }
    }

    // movimento
    playerWalk(x, z){
        let playerTopSpeed;

        if(this.playerRunning)
            playerTopSpeed = this.playerRunSpeed;
        else
            playerTopSpeed = this.playerWalkSpeed;

        this.player.translate(x * playerTopSpeed, 0, z * playerTopSpeed, true);
    }

    playerTurnHead(x, y){

        this.player.rotate(-degToRad(y/5), -degToRad(x/5), 0);
    }



    setPlayerRunning(isRunning){
        this.playerRunning = isRunning;
    }

    updateStatus(){
    }

    // metodi get
    getGameObjInfo(){
        var gameObjInfo = [];

        gameObjInfo.push(...this.terrain);
        gameObjInfo.push(...this.entities);

        return gameObjInfo;
    }
}