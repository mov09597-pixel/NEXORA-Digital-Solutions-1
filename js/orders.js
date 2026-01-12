// =======================
// Fake Login Auto Create User
// =======================
if (!localStorage.getItem('user_id')) {
  localStorage.setItem('user_id', 'demo_user')
}

// =======================
// Helper Functions
// =======================
function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]')
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders))
}

function getWallet() {
  return Number(localStorage.getItem('wallet_balance') || 0)
}

function setWallet(amount) {
  localStorage.setItem('wallet_balance', amount)
  document.getElementById('wallet_balance').textContent = amount
}

function getOwnerWallet() {
  return Number(localStorage.getItem('owner_wallet_balance') || 0)
}

function setOwnerWallet(amount) {
  localStorage.setItem('owner_wallet_balance', amount)
  document.getElementById('owner_wallet').textContent = amount
}

// =======================
// Create Order
// =======================
function createOrder() {
  const user_id = localStorage.getItem('user_id')

  const project_name = document.getElementById('project_name').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const price = Number(document.getElementById('price').value) || 0

  if (!project_name || !description || !category || price <= 0) {
    alert('Please fill all fields correctly')
    return
  }

  const orders = getOrders()

  const order = {
    id: Date.now(),
    user_id,
    project_name,
    description,
    category,
    price,
    status: 'completed'
  }

  orders.unshift(order)
  saveOrders(orders)

  // Update wallets
  setWallet(getWallet() + price)
  setOwnerWallet(getOwnerWallet() + price)

  displayOrders()

  alert("Order created successfully ✅")
}

// =======================
// Display Orders
// =======================
function displayOrders() {
  const user_id = localStorage.getItem('user_id')
  const orders = getOrders().filter(o => o.user_id === user_id)
  const ul = document.getElementById('order_list')
  ul.innerHTML = ''

  orders.forEach(o => {
    const li = document.createElement('li')
    li.textContent = `${o.project_name} - ${o.category} - $${o.price} - ${o.status}`
    ul.appendChild(li)
  })
}

// =======================
// Init
// =======================
displayOrders()
setWallet(getWallet())
setOwnerWallet(getOwnerWallet())

// Make functions global for HTML button
window.createOrder = createOrder
