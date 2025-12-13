import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/');
  }


  const userInfo = await db
    .select()
    .from(users)
    .where(eq(users.id, locals.user.id))
    .then((rows) => rows[0]);
    
  return { user: locals.user, userInfo: userInfo };
};

