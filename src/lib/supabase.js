import { createClient } from '@supabase/supabase-js';

// Use environment variables that won't be bundled into client-side code
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';

// For demo purposes, we'll use a mock client if environment variables are not set
let supabase;

if (supabaseUrl === 'https://demo.supabase.co' || supabaseAnonKey === 'demo-key') {
  // Create a mock Supabase client for demo purposes
  supabase = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: async () => ({ data: null, error: { message: 'Demo mode - Please set up Supabase credentials' } }),
      signInWithPassword: async () => ({ data: null, error: { message: 'Demo mode - Please set up Supabase credentials' } }),
      signOut: async () => ({ error: null })
    },
    from: () => ({
      insert: () => ({ error: { message: 'Demo mode - Database not available' } }),
      select: () => ({ data: [], error: null }),
      update: () => ({ error: { message: 'Demo mode - Database not available' } }),
      delete: () => ({ error: { message: 'Demo mode - Database not available' } })
    })
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
