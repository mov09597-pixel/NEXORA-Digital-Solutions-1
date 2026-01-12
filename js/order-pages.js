// معرفة نوع الخدمة من الرابط
const params = new URLSearchParams(window.location.search)
const serviceType = params.get('type')

// عرض النوع تلقائيًا
if(serviceType){
  document.getElementById('project_name').value = serviceType.toUpperCase() + " Project"
}

// إرسال الأوردر
function submitOrder(){
  const name = document.getElementById('project_name').value
  const desc = document.getElementById('description').value
  const price = document.getElementById('price').value

  if(!name || !desc || !price){
    alert("Fill all fields")
    return
  }

  const orders = JSON.parse(localStorage.getItem('orders') || "[]")

  orders.push({
    id: Date.now(),
    name,
    desc,
    price,
    status: "processing"
  })

  localStorage.setItem('orders', JSON.stringify(orders))

  alert("✅ Order received! Bot is working now.")
  location.href = "dashboard.html"
}
