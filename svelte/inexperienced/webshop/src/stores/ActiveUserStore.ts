import { writable } from "svelte/store";
import type { ActiveUser } from "../types/ActiveUser";

export const activeUser = writable<ActiveUser | undefined>(undefined)