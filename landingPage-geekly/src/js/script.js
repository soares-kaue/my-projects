const hamburger = document.getElementById('hamburger')
const menu = document.getElementById('menu')

hamburger.addEventListener('click', (e) => {
    e.stopPropagation()
    hamburger.classList.toggle('active')
    menu.classList.toggle('open')
})

document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active')
        menu.classList.remove('open')
    }
})

const track = document.getElementById('book-track')
const prevBtn = document.getElementById('scrollPrev')
const nextBtn = document.getElementById('scrollNext')
const scrollByCard = (dir) => {
    const card = track.querySelector('.book-card');
    const distance = card ? card.getBoundingClientRect().width + 24 : 240
    track.scrollBy({ left: dir * distance * 2, behavior: 'smooth' })
}
prevBtn.addEventListener('click', () => scrollByCard(-1))
nextBtn.addEventListener('click', () => scrollByCard(1))


document.querySelectorAll('.fav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const pressed = btn.getAttribute('aria-pressed') === 'true'
        btn.setAttribute('aria-pressed', String(!pressed))
    })
})