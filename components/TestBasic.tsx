import React from "react";
import { useSessionStorageState, useLocalStorageState } from "../index";

function TestBasic({ storageKey, text } : { storageKey : string, text : string}) {
    const [state, setState] = useLocalStorageState(storageKey, text);

    return (
        <div>
            {state}
        </div>
    )
}

export default TestBasic