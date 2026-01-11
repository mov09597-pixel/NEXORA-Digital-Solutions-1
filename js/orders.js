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

// إنشاء أوردر + تحديث المحفظة + تنفيذ بوت تلقائي
export function createOrder() {
  const user_id = localStorage.getItem('user_id')
  if(!user_id) { alert('Please login first!'); return }

  const project_name = document.getElementById('project_name').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value

  const orders = getOrders()
  const order = { 
    id: Date.now(), 
    user_id, 
    project_name, 
    description, 
    category, 
    status: 'pending' 
  }
  orders.push(order)
  saveOrders(orders)

  // تحديث Wallet (نضيف 100$ لكل أوردر مثال)
  let wallet = getWallet()
  wallet += 100
  setWallet(wallet)

  alert('Order submitted! Wallet updated + Bot is processing...')
  displayOrders()

  // Bot تلقائي: بعد 5 ثواني يحول الحالة لـ completed
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
    li.textContent = `${o.project_name} - ${o.category} - ${o.status}`
    ul.appendChild(li)
  })
}

// عند فتح الصفحة، نعرض الأوردرات والمحفظة
displayOrders()
setWallet(getWallet())

window.createOrder = createOrder
window.displayOrders = displayOrders
