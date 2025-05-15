import {useEffect, useMemo, useState} from "react";

function ExpensiveComponent({value}) {
    useEffect(() => {
        console.log('rendering!')
    });
    return <span>{value+1000}</span>
}

export function ExpensiveApp() {
    const [value, setValue] = useState(10);
    const [trigger,triggerRendering] = useState(false)

    // 렌더링이 발생하지 않음
    const MemoizedComponent = useMemo(()=>
        <ExpensiveComponent value={value}/>
    ,[value]
    )

    // 렌더링 발생!
    const MemoizedComponent2 = <ExpensiveComponent value={value}/>

    function handleChange(e) {
        setValue(Number(e.target.value))
    }
    function handleClick () {
        triggerRendering(prev=>!prev)
    }

    return (
        <>
            <input onChange={handleChange} value={value}/>
            <button onClick={handleClick}>렌더링</button>
            {MemoizedComponent}
        </>
    )


}