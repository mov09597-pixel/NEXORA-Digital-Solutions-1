function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]')
}

function saveOrders(orders) {
  localStorage.setItem('orders', JSON.stringify(orders))
}

export function createOrder() {
  const user_id = localStorage.getItem('user_id')
  if(!user_id) {
    alert('Please login first!')
    return
  }

  const project_name = document.getElementById('project_name').value
  const description = document.getElementById('description').value
  const category = document.getElementById('category').value

  const orders = getOrders()
  const order = { id: Date.now(), user_id, project_name, description, category, status: 'pending' }
  orders.push(order)
  saveOrders(orders)

  alert('Order submitted successfully!')
  displayOrders()
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

window.createOrder = createOrder
window.displayOrders = displayOrders

// عرض الأوردرات عند فتح الصفحة
displayOrders()
