import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

// eslint-disable-next-line import/no-anonymous-default-export
export default () =>
  createServerComponentSupabaseClient({
    headers,
    cookies,
  });
