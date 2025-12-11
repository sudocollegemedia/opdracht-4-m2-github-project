
const target = new Date('2025-12-31T23:59:59');

function updateCountdown() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('mins').textContent = '0';
        document.getElementById('secs').textContent = '0';
        document.getElementById('done').style.display = 'block';
        clearInterval(tick);
        return;
    }

    const seconds = Math.floor(diff / 1000);
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
    const mins = Math.floor((seconds % (60 * 60)) / 60);
    const secs = seconds % 60;

    document.getElementById('days').textContent = String(days);
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('mins').textContent = String(mins).padStart(2, '0');
    document.getElementById('secs').textContent = String(secs).padStart(2, '0');
}

updateCountdown();
const tick = setInterval(updateCountdown, 1000);