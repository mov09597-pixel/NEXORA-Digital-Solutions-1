// ===============================
// Orders + Wallets + Automation Bots
// ===============================

// ======= Helper Functions =======
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

// ======= Automation Bots =======

// بوت تصميمات أوتوماتيك
function designBot(order) {
  console.log(`🤖 Bot: Creating design for "${order.project_name}" in category "${order.category}"...`)
  setTimeout(() => {
    console.log(`✅ Design for "${order.project_name}" is ready!`)
    order.designLink = `https://example.com/designs/${order.id}`
    saveOrders(getOrders())
    displayOrders()
  }, 5000) // 5 ثواني للتنفيذ
}

// بوت إنشاء المواقع أوتوماتيك
function websiteBot(order) {
  console.log(`🤖 Bot: Building website for "${order.project_name}"...`)
  setTimeout(() => {
    console.log(`✅ Website for "${order.project_name}" is ready!`)
    order.websiteLink = `https://example.com/websites/${order.id}`
    order.status = 'completed'
    saveOrders(getOrders())
    displayOrders()
  }, 8000) // 8 ثواني للتنفيذ
}

// ======= Main Functions =======

// إنشاء أوردر + تحديث المحفظة + تنفيذ البوتات
export function createOrder() {
  const user_id = localStorage.getItem('user_id')
  if(!user_id) { alert('Please login first!'); return }

  const project_name = document.getElementById('project_name').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value
  const price = Number(document.getElementById('price').value) || 0

  // التحقق من رصيد العميل
  let wallet = getWallet()
  if(wallet < price) {
    alert('Insufficient balance! Add funds first.')
    return
  }
  wallet -= price
  setWallet(wallet)

  // إضافة الأوردر
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

  // تحويل الفلوس للمالك
  let ownerWallet = getOwnerWallet()
  ownerWallet += price
  setOwnerWallet(ownerWallet)

  alert('Order submitted! Wallet updated + Bot is processing...')
  displayOrders()

  // تشغيل البوتات تلقائياً
  designBot(order)
  websiteBot(order)
}

// عرض الأوردرات
export function displayOrders() {
  const user_id = localStorage.getItem('user_id')
  const orders = getOrders().filter(o => o.user_id === user_id)
  const ul = document.getElementById('order_list')
  if(!ul) return
  ul.innerHTML = ''
  orders.forEach(o => {
    const li = document.createElement('li')
    li.textContent = `${o.project_name} - ${o.category} - $${o.price} - ${o.status}`
    ul.appendChild(li)
  })
}

// ======= Initialization =======
displayOrders()
setWallet(getWallet())
setOwnerWallet(getOwnerWallet())

window.createOrder = createOrder
window.displayOrders = displayOrders
