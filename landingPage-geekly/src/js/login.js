const tabLogin = document.getElementById('tabLogin')
const tabRegister = document.getElementById('tabRegister')
const loginForm = document.getElementById('loginForm')
const registerForm = document.getElementById('registerForm')

const showLogin = () => {
    tabLogin.classList.add('active')
    tabRegister.classList.remove('active')
    loginForm.classList.remove('hidden')
    registerForm.classList.add('hidden')
}

const showRegister = () => {
    tabRegister.classList.add('active')
    tabLogin.classList.remove('active')
    registerForm.classList.remove('hidden')
    loginForm.classList.add('hidden')
}

tabLogin.addEventListener('click', showLogin)
tabRegister.addEventListener('click', showRegister)

document.querySelectorAll('.switch-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault()
        const target = link.getAttribute('data-target')
        target === 'register' ? showRegister() : showLogin()
    })
})

loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // TODO: integrate with the authentication backend
    console.log('Login submitted:', {
        email: document.getElementById('loginEmail').value
    })
})

registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const password = document.getElementById('registerPassword').value
    const confirm = document.getElementById('registerConfirm').value

    if (password !== confirm) {
        alert('Passwords do not match.')
        return
    }

    // TODO: integrate with the registration backend
    console.log('Register submitted:', {
        name: document.getElementById('registerName').value,
        email: document.getElementById('registerEmail').value
    })
})
