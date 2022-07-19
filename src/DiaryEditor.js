import React,{useRef, useState} from "react";

// 사용자의 입력 처리 : state

//input 값을 state 값으로 받아서 이를 처리해주기

// 원하는 DOM 요소에 접근하기 : useRef

const DiaryEditor = () =>{

    const authorInput= useRef(); //함수 실행 후 값을 저장

    const contetnInput=useRef();

    const [state,setState]=useState({
        author:"",
        content:"",
        emotion:1,
    })

    const handleChangeState= (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value
            //스프레드 후, 원하는 정보 수정
        })
    }

    const handleSubmit = () =>{
        if (state.author.length<1){
            authorInput.current.focus();
            return; //return 해주면 -> 더 이상 후속 작업이 실행이 안됨
        }
        
        if (state.content.length<3){
            contetnInput.current.focus()
            return;
        }

        alert('성공적으로 저장되었습니다')
    }


    return(
        <div className="DiaryEditor">
            <h2> 오늘의 일기</h2>

            <div>
                <input
                ref={authorInput}
                name="author"
                value={state.author}
                onChange={handleChangeState}
                />
            </div>

            <div>
                <textarea
                ref={contetnInput}
                name="content"
                value={state.content}
                onChange={handleChangeState}

                
                />
            </div>

            <div>
                감정 점수: 
                <select name="emotion" value={state.emotion} onChange={handleChangeState}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                </select>
            </div>

            <div>
                <button onClick={handleSubmit}>저장</button>
            </div>
        </div>
    )
}

export default DiaryEditor;