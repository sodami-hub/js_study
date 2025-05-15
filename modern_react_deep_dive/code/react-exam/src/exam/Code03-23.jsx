import {useEffect, useRef, useState} from "react";

function usePrevious(value) {
    const ref = useRef();

    // useEffect는 렌더링 이후에 실행된다. 따라서 ref.current의 처음 값은 undefined 이다.
    useEffect(()=>{
        ref.current = value;
        console.log(ref.current);
    },[value]);
    return ref.current;
}

export function SomeComponent() {
    const [counter, setCounter] = useState(0);
    const previous = usePrevious(counter);
    console.log(previous);
    function handleClick() {
        setCounter(ctn=>ctn + 1);
    }

    return (
        <button onClick={handleClick}>
            {counter} {previous}
        </button>
    )
}