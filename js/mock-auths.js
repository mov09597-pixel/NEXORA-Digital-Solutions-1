import { supabase } from './supabase.js'

export async function registerUser(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) return alert(error.message)
  alert('Registered successfully! Please login.')
}

export async function loginUser(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return alert(error.message)
  alert('Login successful!')
  location.href = 'dashboard.html'
}
