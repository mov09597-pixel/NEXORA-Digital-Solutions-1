import { supabase } from './supabase.js'

// إنشاء أوردر جديد
export async function createOrder(project_name, description, category, price, bot_type='none') {
  const user = supabase.auth.user()
  if(!user) return alert('Please login first!')

  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: user.id, project_name, description, category, price, status:'pending', bot_type }])
  
  if(error) return alert(error.message)

  // تحديث Wallet المالك
  const { data: walletData, error: walletError } = await supabase
    .from('owner_wallet')
    .select('*')
    .limit(1)
  
  let balance = walletData[0].balance + price

  await supabase
    .from('owner_wallet')
    .update({ balance })
    .eq('id', walletData[0].id)

  alert(`Order submitted! $${price} added to your wallet.`)

  // Bot تلقائي: بعد 5 ثواني يحول الحالة لـ completed
  setTimeout(async () => {
    await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', data[0].id)
    alert('Bot completed the order automatically!')
  }, 5000)
}
