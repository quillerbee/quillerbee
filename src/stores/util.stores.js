import { readable } from 'svelte/store';

export const locale = readable("en", (set) =>
	set(navigator?.language ||
		navigator?.browserLanguage ||
		navigator?.languages?.[0] || ["en"])
);

export const timezoneOffset = readable(0, (set) => set(-new Date().getTimezoneOffset() / 60));
