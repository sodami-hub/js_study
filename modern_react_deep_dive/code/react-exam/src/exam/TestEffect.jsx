import {useEffect, useState} from "react";

export function TestComponent(){
    const [cnt, setCnt] = useState(0)

    const handleClick = () => {
        setCnt(cnt=>cnt + 1)
    }

    return (
        <>
            <h1>{cnt}</h1>
            <button onClick={handleClick}>Click me!</button>
        </>
    )

}