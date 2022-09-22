const canvas = document.getElementById("canvas1")  
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')
const particleArr = []
let hue = 0

window.addEventListener('resize', function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

})
const mouse = {
    x: undefined,
    y: undefined

}
class Particle {
    constructor() {
        this.x = mouse.x
        this.y = mouse.y
        this.color = 'hsl(' + hue + ', 100% , 50%)'
        this.size = Math.random() * 15 + 1
        this.speedX = Math.random() * 4 - 1
        this.speedY = Math.random() * 4 - 1
    }
    update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.size > 0.2) {
            this.size -= 0.1
        }
    }
    draw() {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.size,0, Math.PI * 2)
        ctx.fill()
    }

}
canvas.addEventListener('click', function (event) {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 10; i++) {
        particleArr.push(new Particle())
    }
})
canvas.addEventListener('mousemove', function (event) {
    mouse.x = event.x
    mouse.y = event.y
    for (let i = 0; i < 10; i++) {
        particleArr.push(new Particle())
    }
})


function handleParictle() {
    for (let i = 0; i < particleArr.length; i++) {
        particleArr[i].update()
        particleArr[i].draw()
        for (let j = i; j < particleArr.length; j++) {
            const dx = particleArr[i].x - particleArr[j].x
            const dy = particleArr[i].y - particleArr[j].y
            const distance = Math.sqrt(dx * dx - dy * dy)
            if (distance < 100) {
                ctx.beginPath()
                ctx.strokeStyle = particleArr[i].color
                ctx.lineWidth = 0.2
                ctx.moveTo(particleArr[i].x, particleArr[i].y)
                ctx.lineTo(particleArr[j].x, particleArr[j].y)
                ctx.stroke()
                ctx.closePath()
            }
        }
        if (particleArr[i].size <= 0.3) {
            particleArr.splice(i, 1)
            i--
        }
    }
}

function animatedMouse() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = 'rgba(0,0,0,0.2)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    handleParictle()
    hue += 5
    requestAnimationFrame(animatedMouse)
}
animatedMouse();