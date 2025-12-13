import { redirect } from '@sveltejs/kit';
import { db } from '$lib/server/db';  // your Drizzle db instance
import { users } from '$lib/server/db/schema';

// Replace this with your actual session/user logic
 // You'll need this – see below

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ locals, url }) {
  const user = locals.user;  // or however you get the session

  if (user) {
    // Not logged in → redirect to login (preserve intended URL)
    throw redirect(302, `/home`);
  }



  // Authorized – pass user to pages
  return { user };
}