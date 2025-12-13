// src/routes/(app)/profile/+page.server.ts
import type { PageServerLoad, Actions } from './$types';
import { db } from '$lib/server/db';
import { users, user } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';

// Load initial data (same as layout — but we re-fetch to be safe)
export const load: PageServerLoad = async ({ parent }) => {
  const { user } = await parent(); // gets data.user from (app)/+layout.server.ts
  return { user };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const username = formData.get('username')?.toString().trim();
    const nativeLanguage = formData.get('nativeLanguage')?.toString().trim();
    const targetLanguage = formData.get('targetLanguage')?.toString().trim();

    if (!username || username.length < 3) {
      return fail(400, { error: 'Username must be at least 3 characters' });
    }
    if (!nativeLanguage || !targetLanguage) {
      return fail(400, { error: 'Please select both languages' });
    }

    try {
        await db
        .update(user)
        .set({
            username
        })
        .where(eq(user.id, locals.user!.id))

      await db
        .update(users)
        .set({
          nativeLanguage,
          targetLanguage
        })
        .where(eq(users.id, locals.user!.id));

    


    //   return { success: true, message: 'Profile updated!' };
    } catch (err) {
      console.error(err);
      return fail(500, { error: 'Failed to save profile' });
    }
    throw redirect(303, '/home');
   
  }

  
};