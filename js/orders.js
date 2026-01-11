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
  return Number(localStorage.getItem('owner_wallet') || 0)
}

function setOwnerWallet(amount) {
  localStorage.setItem('owner_wallet', amount)
  document.getElementById('owner_wallet').textContent = amount
}

// إنشاء أوردر + تحديث Wallet الخاص بالمالك + تنفيذ بوت
export function createOrder() {
  const user_id = localStorage.getItem('user_id')
  if(!user_id) { alert('Please login first!'); return }

  const project_name = document.getElementById('project_name').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const price = Number(document.getElementById('price').value || 100)

  const orders = getOrders()
  const order = { 
    id: Date.now(), 
    user_id, 
    project_name, 
    description, 
    category, 
    price, 
    status: 'pending' 
  }
  orders.push(order)
  saveOrders(orders)

  // 💰 تحويل المبلغ مباشرة لمحفظتك كمالك الموقع
  let ownerWallet = getOwnerWallet()
  ownerWallet += price
  setOwnerWallet(ownerWallet)

  alert(`Order submitted! $${price} added to your wallet. Bot is processing...`)
  displayOrders()

  // Bot: بعد 5 ثواني يحول الحالة لـ completed
  setTimeout(() => {
    order.status = 'completed'
    saveOrders(orders)
    displayOrders()
  }, 5000)
}

export function displayOrders() {
  const user_id = localStorage.getItem('user_id')
  const orders = getOrders().filter(o => o.user_id === user_id)
  const ul = document.getElementById('order_list')
  ul.innerHTML = ''
  orders.forEach(o => {
    const li = document.createElement('li')
    li.textContent = `${o.project_name} - ${o.category} - ${o.status} - $${o.price}`
    ul.appendChild(li)
  })
}

// عند فتح الصفحة، نعرض الأوردرات والمحفظة
displayOrders()
setWallet(getWallet())
setOwnerWallet(getOwnerWallet())

window.createOrder = createOrder
window.displayOrders = displayOrders
