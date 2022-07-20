import React, { useEffect, useState } from "react";


//부모 component가 변경될 때, 자식 요소들이 모두 리랜더링 하는게 싫을 때

//textview가 변경되지 않으면 랜더링하지 X
const TextView=React.memo(({text}) => {
    
    return <div>{text}</div>
});

//Countview가 변경되지 않으면 랜더링 X
const CountView = React.memo(({count})=>{
    return <div>{count}</div>
});

const OptimizeTest = () => {

    const [count,setCount]=useState(1);

    const [text,setText]=useState("");

    return(
        <div style={{padding:30}}>
            <h2>Count</h2>
            <CountView count={count}/>
            <button onClick={()=>setCount(count+1)}>+1</button>
            <h2>Text</h2>
            <TextView text={text}/>
            <input value={text} onChange={(e)=>setText(e.target.value)}></input>
        </div>
    )
}

export default OptimizeTest