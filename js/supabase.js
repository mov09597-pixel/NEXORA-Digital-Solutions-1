import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const SUPABASE_URL = 'https://vpxwtoxtjqchxsgodjzf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZweHd0b3h0anFjaHhzZ29kanpmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2ODA1Mzk3OCwiZXhwIjoyMDgzNjI5OTc4fQ.9-s7SYHCLT8Dmu3qQwi-hbP2mRW6KTd49Q9pe_NKTgc'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
