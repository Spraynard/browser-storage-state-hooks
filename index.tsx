import React from "react";
import { GeneralStorageType } from "./types";

/**
 * Function to encapsulate our saving procedures.
 *
 * @param setter Setter hook
 * @param key Key that we are to save to session storage to
 * @param transforms Object that transforms our given value, or values within our given value (if it itself is an object )
 */
const setSessionStorageState = (setter: (value: any) => void, serializer: (value: any) => string, key: string) =>
    (value: any) => {
        window.sessionStorage.setItem(key, serializer(value));
        // This actually causes us to update our state
        return setter(value);
    }


/**
 * Hook that abstracts over the useState function in order to
 *
 *  * Store state data in browser localStorage
 *  * Persist through refreshes from said localStorage
 *
 * Uses a serializer function to go over the data and prepare it for storage. Sometimes this is needed for
 * items stored in state such as objects or what not. To successfully obtain from storage, we

 * Not too friendly because requires serializer and unserializer functions.
 * Could abstract that away through defaults or currying at some point.
 * @param initial Initial value if there is no session state
 * @param key Key to store our session state at for this specific state
 * @param unserializerFn Function that takes content from Storage and converts it into object to use in application
 * @param serializerFn Function that takes domain object and converts it into an object acceptable for putting through JSON.stringify
 */

export function useBaseSessionStorageState<T extends any>(
    initial: T,
    key: string,
    unserializerFn: (value: string) => T,
    serializerFn: (value: T) => string
) {
    let serialized: string | null = null;
    let unserialized: T = initial;

    if (window.sessionStorage.getItem(key)) {
        serialized = window.sessionStorage.getItem(key);
    }

    if (serialized) {
        unserialized = unserializerFn(serialized);
    }

    const [state, updateState] = React.useState<T>(unserialized);

    return [state, setSessionStorageState(updateState, serializerFn, key)]
}


export function useSessionStorageState<T extends GeneralStorageType<string | number | object>>(
    initialState: T,
    key: string,
) {
    return useBaseSessionStorageState<T>(
        initialState,
        key,
        (value) => JSON.parse(value),
        (value) => JSON.stringify(value)
    )
}