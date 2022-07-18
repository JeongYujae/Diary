import React,{useState} from "react";

// 사용자의 입력 처리 : state

//input 값을 state 값으로 받아서 이를 처리해주기

const DiaryEditor = () =>{

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
        console.log(state);
        alert('성공적으로 저장되었습니다')
    }


    return(
        <div className="DiaryEditor">
            <h2> 오늘의 일기</h2>

            <div>
                <input 
                name="author"
                value={state.author}
                onChange={handleChangeState}
                />
            </div>

            <div>
                <textarea
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