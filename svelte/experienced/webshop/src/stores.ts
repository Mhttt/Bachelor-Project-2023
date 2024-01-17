import { persisted } from 'svelte-local-storage-store';

export const loggedInUser = persisted<string>('Register', 'Register')