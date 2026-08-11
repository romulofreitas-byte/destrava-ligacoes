import { cookies } from 'next/headers';
import { ADMIN_COOKIE, verifyAdminSessionToken } from './admin-auth';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return verifyAdminSessionToken(token);
}
