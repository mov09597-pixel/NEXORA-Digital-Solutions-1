// ضمان وجود user
if(!localStorage.getItem("user_id")){
  localStorage.setItem("user_id","demo_user")
}

function getOrders(){
  return JSON.parse(localStorage.getItem("orders") || "[]")
}

function saveOrders(o){
  localStorage.setItem("orders", JSON.stringify(o))
}

function getWallet(){
  return Number(localStorage.getItem("wallet_balance") || 0)
}

function getOwnerWallet(){
  return Number(localStorage.getItem("owner_wallet_balance") || 0)
}

function setWallet(v){
  localStorage.setItem("wallet_balance", v)
  const el = document.getElementById("wallet_balance")
  if(el) el.innerText = v
}

function setOwnerWallet(v){
  localStorage.setItem("owner_wallet_balance", v)
  const el = document.getElementById("owner_wallet")
  if(el) el.innerText = v
}

function displayOrders(){
  const ul = document.getElementById("order_list")
  if(!ul) return
  ul.innerHTML = ""
  const orders = getOrders()
  orders.forEach(o=>{
    const li = document.createElement("li")
    li.textContent = `${o.project_name || o.project} - ${o.status}`
    ul.appendChild(li)
  })
}

function createOrder(){
  const project = document.getElementById("project_name")?.value || "New Project"
  const price = Number(document.getElementById("price")?.value || 100)

  const orders = getOrders()
  const order = {
    id: Date.now(),
    project: project,
    status: "processing"
  }

  orders.push(order)
  saveOrders(orders)

  setWallet(getWallet() + price)
  setOwnerWallet(getOwnerWallet() + price)

  displayOrders()

  // Bot simulation
  setTimeout(()=>{
    order.status = "completed"
    saveOrders(orders)
    displayOrders()
  },4000)
}

// ربط الزر
window.createOrder = createOrder

// تشغيل أول تحميل
setWallet(getWallet())
setOwnerWallet(getOwnerWallet())
displayOrders()
