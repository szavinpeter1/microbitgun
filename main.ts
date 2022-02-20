let score = 0
let enemiesGotIn = 0
let scoreToWin = 50
let maxEnemies = 5
let gameOver = false

function compare(number1:Number, number2:Number) {
    if(number1 >= number2) {
        return true
    } else {
        return false
    }
}

interface Led {
    x: number | null
    y: number | null
}

let enemies:Led[] = []

let gun:Led = {
    x: 2,
    y: 4
}

let bullet:Led = {x:-1, y:-1}

function createBullet(x: number, y: number) {
    return {
        x: x,
        y: y
    }
}

led.plot(gun.x, gun.y)
input.onButtonPressed(Button.A, function() {
    if (gun.x > 0) {
        led.unplot(gun.x, gun.y)
        gun.x -= 1
        led.plot(gun.x, gun.y)
    }
})

input.onButtonPressed(Button.B, function() {
    if (gun.x < 4) {
        led.unplot(gun.x, gun.y)
        gun.x += 1 
        led.plot(gun.x, gun.y)
        }
})

input.onButtonPressed(Button.AB, function() {
    bullet = createBullet(gun.x, gun.y)
    while(bullet.y > -1){
        bullet.y--
        led.plot(bullet.x, bullet.y)
        basic.pause(80)
        checkTargets(bullet)
        led.unplot(bullet.x, bullet.y)
    }
    bullet.y = gun.y
    bullet.x = gun.x
})

function checkTargets(bullet:Led) {
    for(let e of enemies) {
        if(bullet.x === e.x && bullet.y === e.y) {
            enemies = enemies.filter(function(enemy):boolean{
                return enemy !== e
            })
           score ++
           let gameWon = compare(score, scoreToWin)
           if(gameWon === true) {
               gameOver = true
               basic.clearScreen()
               basic.showString("WIN!", 200)
               basic.showLeds(`
                # . . . #
                . . . . .
                # . . . #
                # . . . #
                . # # # .
                `)
           }
        }
    }
}

function createEnemy(x:number, y:number):Led {
    return {
        x: Math.floor(Math.random() * x),
        y: y,
    }
}

function addEnemies() {
    enemies.push(createEnemy(5, 0))
    enemies.push(createEnemy(5, 0))
    enemies.push(createEnemy(5, 0))
}

function manageEnemies() {
    let shouldCreateEnemies = true
    while(!gameOver) {
        if (shouldCreateEnemies === true) {
            addEnemies()
        }
        for (let enemy of enemies) {
            led.plot(enemy.x, enemy.y)
        }
        basic.pause(2000)
        for (let e of enemies) {
            led.unplot(e.x, e.y)
            if (e.y < 5) {
                e.y++
            }
            if (e.y === 5) {
                let index = enemies.indexOf(e)
                enemies.splice(index, 1)
                enemiesGotIn ++
            }
        }
        let gameLost = compare(enemiesGotIn, maxEnemies)
        if (gameLost === true) {
            gameOver = true
            basic.clearScreen()
            basic.showString("LOST!", 200)
            basic.showLeds(`
                # . . . #
                . . . . .
                . # # # .
                # . . . #
                # . . . #
                `)
        }
        shouldCreateEnemies = !shouldCreateEnemies
    }
}

manageEnemies()
