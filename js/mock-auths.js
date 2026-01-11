import { supabase } from './supabase.js'

export async function registerUser(email, password) {
  if(!email || !password) { alert('Please enter email & password'); return }
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return alert(error.message)
  localStorage.setItem('user_id', data.user?.id || Date.now())
  alert('Registered successfully! Please login.')
}

export async function loginUser(email, password) {
  if(!email || !password) { alert('Please enter email & password'); return }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return alert(error.message)
  localStorage.setItem('user_id', data.user?.id || Date.now())
  alert('Login successful!')
  location.href = 'dashboard.html'
}

// نجعلهم متاحين للـ HTML
window.registerUser = registerUser
window.loginUser = loginUser
