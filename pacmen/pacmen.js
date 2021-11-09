var pos = 0;
   const pacArray = [
        ['images/PacMan1.png', 'images/PacMan2.png'],
        ['images/PacMan3.png', 'images/PacMan4.png']
    ];

    var direction = 0;
    const pacMen = []; 
    var focus = 0;
    let idPacmen = 0;
    const velocity = 250;

    function setToRandom(scale) {
        return {
            x: Math.random() * scale,
            y: 30 + Math.random() * scale
        }
    }
    function identification(id,direction) {
        return {
            idPacman : id,
            dirPacman : direction
        }
    }

    // Factory to make a PacMan at a random position with random velocity
    function makePac() {
        // returns an object with random values scaled {x: 33, y: 21}
        let velocity = setToRandom(30); // {x:?, y:?}
        let position = setToRandom(window.innerWidth - 500);

        let id = identification(idPacmen,direction);
        idPacmen= idPacmen + 1;

        // Add image to div id = game
        let game = document.getElementById('game');
        let newimg = document.createElement('img');
        newimg.style.position = 'absolute';

        newimg.src = 'images/PacMan1.png';
        newimg.width = 100;
        //
        // set position here
        newimg.style.left = position.x;
        newimg.style.top = position.y;
        //

        // add new Child image to game
        game.appendChild( newimg );
        // return details in an object
        return {
            position,
            velocity,
            newimg,
            id
        }
    }

    function update() {
        focus = (focus + 1) % 2;
        pacMen.forEach((item) => {
            checkCollisions(item)
            item.position.x += item.velocity.x;
            item.position.y += item.velocity.y;

            item.newimg.style.left = item.position.x;
            item.newimg.style.top = item.position.y;

            item.newimg.src = pacArray[item.id.dirPacman][focus];

        })

        setTimeout(update, velocity);
    }

    function checkCollisions(item) {
        if(item.position.x + item.velocity.x + item.newimg.width > window.innerWidth ||
            item.position.x + item.velocity.x < 0) {
            item.velocity.x = -item.velocity.x;
            item.id.dirPacman = (item.id.dirPacman + 1) % 2;
        }

        if(item.position.y + item.velocity.y + item.newimg.height > window.innerHeight ||
            item.position.y + item.velocity.y < 0) item.velocity.y = -item.velocity.y;
    }

    function makeOne() {
        pacMen.push(makePac()); 
    }
