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
