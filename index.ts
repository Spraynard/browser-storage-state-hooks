import React from "react";
import { GeneralStorageType, UnserializerFn, SerializerFn } from "./types";

/**
 * Function to encapsulate our saving procedures.
 *
 * @param setter Setter hook
 * @param key Key that we are to save to session storage to
 * @param transforms Object that transforms our given value, or values within our given value (if it itself is an object )
 */
const setStorageState = <T>(
    key: string,
    setter: React.Dispatch<React.SetStateAction<T>>,
    serializer: SerializerFn<T>,
    storage: Storage
) =>
    (value: any) => {
        /** Sets state in our browser storage */
        storage.setItem(key, serializer(value));

        /** Sets state in application */
        return setter(value);
    }


/**
 * Hook that abstracts over the useState function in order to
 *
 *  * Store state data in browser storage
 *  * Persist through refreshes from said storage
 *
 * A serializer function is include in order to prepare the data in state for storage. Sometimes a more robust
 * preparation step is necessary in order to store some items in storage, such as functions. That is why we allow for the ability
 * to insert your own function.
 *
 * An unserializer function should act in the opposite way of the serializer function to take our storage string and create a state
 * object from it.

 * @param initial Initial value if there is no session state
 * @param key Key to store our session state at for this specific state
 * @param unserializerFn Function that takes content from Storage and converts it into object to use in application
 * @param serializerFn Function that takes domain object and converts it into an object acceptable for putting through JSON.stringify
 * @param storage Browser storage type that we are using.
 */

function useStorageState<T extends any>(
    key: string,
    initial: T,
    unserializerFn: UnserializerFn<T>,
    serializerFn: SerializerFn<T>,
    storage: Storage = window.localStorage,
) {
    let serialized: string | null = null;
    let unserialized: T = initial;

    if (window.localStorage.getItem(key)) {
        serialized = storage.getItem(key)
    }

    if (serialized) {
        unserialized = unserializerFn(serialized);
    }

    const [state, setState] = React.useState<T>(unserialized);

    return [state, setStorageState(key, setState, serializerFn, storage)]
}

/**
 * Function that abstracts over useStorage state to specify which browser storage is used
 * @see useStorageState
 */
export function useBrowserLocalStorage<T>(
    key: string,
    initial: T,
    unserializerFn: UnserializerFn<T>,
    serializerFn: SerializerFn<T>
) {
    return useStorageState<T>(key, initial, unserializerFn, serializerFn, window.localStorage);
}

/**
 * Function that abstracts over useStorage state to specify which browser storage is used
 * @see useStorageState
 */
export function useBrowserSessionStorage<T>(
    key: string,
    initial: T,
    unserializerFn: UnserializerFn<T>,
    serializerFn: SerializerFn<T>
) {
    return useStorageState<T>(key, initial, unserializerFn, serializerFn, window.sessionStorage);
}
/**
 * General function that assumes the state you
 * @param initialState Initial state for storage
 * @param key key for storage
 */
export function useLocalStorageState<T extends GeneralStorageType<string | number | object>>(
    key: string,
    initialState: T,
) {
    return useBrowserLocalStorage<T>(
        key,
        initialState,
        (value) => JSON.parse(value),
        (value) => JSON.stringify(value),

    )
}

/**
 * General function that assumes the state you
 * @param initialState Initial state for storage
 * @param key key for storage
 */
export function useSessionStorageState<T extends GeneralStorageType<string | number | object>>(
    key: string,
    initialState: T,
) {
    return useBrowserSessionStorage<T>(
        key,
        initialState,
        (value) => JSON.parse(value),
        (value) => JSON.stringify(value),

    )
}