let gun = {
    x: 2,
    y: 4
}
console.log(gun.y)

led.plot(gun.x, gun.y)
input.onButtonPressed(Button.A, function () {
    if (gun.x > 0) {
        led.unplot(gun.x, gun.y)
        gun.x = gun.x - 1
        led.plot(gun.x, gun.y)
    } else {
        console.log("x már 0")
    }
})

input.onButtonPressed(Button.B, function () {
    if (gun.x < 4) {
        led.unplot(gun.x, gun.y)
        gun.x = gun.x + 1
        led.plot(gun.x, gun.y)
    } else {
        console.log("x már 4")
    }
})
