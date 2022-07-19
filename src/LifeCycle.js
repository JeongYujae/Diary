import React,{useEffect, useState} from "react";

const LifeCycle = () => {

    const [count, setCount]=useState(0);
    const [text, setText]=useState(0);

    //Mount(생성) 되었을 때만 실행하고 싶을 때, [] 를 비워두면 시작할 때만 처음 한번만 실행
    useEffect(()=>{
        console.log("MOUNT!")
    },[]);

    //컴포넌트가 update 될 때 실행하고 싶다면
    //state 변경, 부모로 받는 props 변경, 부모가 랜더링 되면 -> 재 랜더링이 된다!!!
    useEffect(()=>{
        console.log('UPDATE')
    })

    //dependency array [] 가 변경되는 순간에 useEffect 내부의 콜백 함수를 실행한다
    //[]안에 있는 값들'만' 통제할 수 있음

    useEffect(()=>{
        console.log(`${count} has been updated`)
    },[count])


    return(
    <div style={{padding:20}}>
        <div>
            {count}
            <button onClick={()=>{setCount(count+1)}}>+1</button>
        </div>
        <div>
            <input value={text} onChange={(e)=>setText(e.target.value)}></input>
        </div>
    </div>
    )
}

export default LifeCycle;