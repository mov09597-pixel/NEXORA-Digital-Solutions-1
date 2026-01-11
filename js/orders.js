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
  const price = Number(document.getElementById('price').value || 100) // مثال: 100$  

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
