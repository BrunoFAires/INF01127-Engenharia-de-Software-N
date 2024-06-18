import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://azjdjlyxrulhmgmhmnrg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF6amRqbHl4cnVsaG1nbWhtbnJnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MzUxNDQsImV4cCI6MjAzNDMxMTE0NH0.O46VyDmhGEdZvQUrjKuxxlKMXXWT13s4iQKeeWta9_U'
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
