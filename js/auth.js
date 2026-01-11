// Mock backend باستخدام localStorage

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]')
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users))
}

export function registerUser() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const users = getUsers()
  if(users.find(u => u.email === email)) {
    alert('User already exists!')
    return
  }

  users.push({ email, password, id: Date.now() })
  saveUsers(users)
  alert('Registered successfully! Now login.')
}

export function loginUser() {
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const users = getUsers()
  const user = users.find(u => u.email === email && u.password === password)
  if(!user) {
    alert('Invalid credentials!')
    return
  }

  localStorage.setItem('user_id', user.id)
  localStorage.setItem('user_email', user.email)
  alert('Login successful!')
  window.location.href = 'dashboard.html'
}
