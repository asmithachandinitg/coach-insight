import { useEffect, useState } from "react";


export function usePersistedState<T>(key: string, defaultValue: T) {
    const [state, setState] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved !== null ? (JSON.parse(saved) as T) : defaultValue;
        } catch {
            return defaultValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
        } catch {
            // localStorage can fail in private browsing / storage-full cases —
            // fail silently rather than crash the page over a persistence nicety.
        }
    }, [key, state]);

    return [state, setState] as const;
}
