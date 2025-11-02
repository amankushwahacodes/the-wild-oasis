
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://fqqtvmwdzptmmtbggjub.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxcXR2bXdkenB0bW10YmdnanViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE5MDYyODIsImV4cCI6MjA3NzQ4MjI4Mn0.qX8hgMo7KTaW5dlqIDR3_GRhzIDswPzkxZ_awKnYND8";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;