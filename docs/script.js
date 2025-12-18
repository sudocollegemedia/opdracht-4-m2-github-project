const target = new Date('2025-12-31T23:59:59')

const canvas = document.getElementById("canvas")
const cvs = canvas.getContext("2d")

let snowflakes = []

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    initSnowflakes()
}

function clear() {
    cvs.clearRect(0, 0, canvas.width, canvas.height)
}

function Snowflake(x, y, size, speed) {
    this.baseX = x
    this.baseY = y
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed * 0.5
    this.angle = (20 + Math.random() * 20 - 10) * (Math.PI / 180)
    this.sineOffset = Math.random() * 1000
    this.sineSpeed = Math.random() * 0.002 + 0.001
    this.sineAmplitude = Math.random() * 20 + 10
}

Snowflake.prototype.randomize = function () {
    this.size = Math.random() * 3 + 1
    this.speed = (Math.random() * 2 + 1) * 0.5
    this.angle = (20 + Math.random() * 20 - 10) * (Math.PI / 180)
    this.sineOffset = Math.random() * 1000
    this.sineSpeed = Math.random() * 0.002 + 0.001
    this.sineAmplitude = Math.random() * 20 + 10
}

Snowflake.prototype.update = function (time) {
    this.x = this.baseX + Math.sin(time * this.sineSpeed + this.sineOffset) * this.sineAmplitude
    this.y += this.speed * Math.cos(this.angle)
    this.baseX += this.speed * Math.sin(this.angle)

    if (this.x > canvas.width + this.size) {
        this.baseX = -this.size
        this.x = this.baseX
        this.randomize()
    }

    if (this.x < -this.size) {
        this.baseX = canvas.width + this.size
        this.x = this.baseX
        this.randomize()
    }

    if (this.y > canvas.height + this.size) {
        this.y = -this.size
        this.randomize()
    }
}

Snowflake.prototype.draw = function () {
    cvs.save()
    cvs.fillStyle = "white"
    cvs.beginPath()
    cvs.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    cvs.fill()
    cvs.restore()
}

function initSnowflakes() {
    snowflakes = []
    const count = 200
    for (let i = 0; i < count; i++) {
        snowflakes.push(new Snowflake(
            Math.random() * canvas.width,
            Math.random() * canvas.height,
            Math.random() * 3 + 1,
            Math.random() * 2 + 1
        ))
    }
}

function drawScene(time = 0) {
    clear()

    for (let flake of snowflakes) {
        flake.update(time)
        flake.draw()
    }

    requestAnimationFrame(drawScene)
}

window.addEventListener("resize", resizeCanvas)
resizeCanvas()
drawScene()

function updateCountdown() {
    const now = new Date()
    const diff = target - now

    if (diff <= 0) {
        document.getElementById('days').textContent = '0'
        document.getElementById('hours').textContent = '0'
        document.getElementById('mins').textContent = '0'
        document.getElementById('secs').textContent = '0'
        document.getElementById('done').style.display = 'block'
        clearInterval(tick)
        return
    }

    const seconds = Math.floor(diff / 1000)
    const days = Math.floor(seconds / (60 * 60 * 24))
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60))
    const mins = Math.floor((seconds % (60 * 60)) / 60)
    const secs = seconds % 60

    document.getElementById('days').textContent = String(days)
    document.getElementById('hours').textContent = String(hours).padStart(2, '0')
    document.getElementById('mins').textContent = String(mins).padStart(2, '0')
    document.getElementById('secs').textContent = String(secs).padStart(2, '0')
}

updateCountdown()
const tick = setInterval(updateCountdown, 1000)
