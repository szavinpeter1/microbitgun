let gun = {
    x: 2,
    y: 4
}

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
        console.log(gun)
    } else {
        console.log("x már 0")
    }
})

input.onButtonPressed(Button.B, function() {
    if (gun.x < 4) {
        led.unplot(gun.x, gun.y)
        gun.x += 1 
        led.plot(gun.x, gun.y)
        console.log(gun)
    } else {
        console.log("x már 4")
    }
})

input.onButtonPressed(Button.AB, function() {
    let bullet = createBullet(gun.x, gun.y)
    while(bullet.y > -1){
        bullet.y--
        led.plot(bullet.x, bullet.y)
        basic.pause(80)
        led.unplot(bullet.x, bullet.y)
    }
    bullet.y = gun.y
    bullet.x = gun.x
})
