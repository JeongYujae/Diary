import React, { useContext } from "react";
import { DiaryStateContext } from "./App";
import DiaryItem from './DiaryItem'
import { DiaryDispatchContext } from "./App";

//onRemove 함수 받고

const DiaryList= () =>{

    const {onEdit}= useContext(DiaryDispatchContext)
    const {onRemove}= useContext(DiaryDispatchContext)

    // Context를 만들고 provider로 감싸고 value를 전달했는데
    //그 value 를 받으려고 하는 짓/  () 안에는 값을 꺼내오고 싶은 context 를 넣는다
    //즉, () context 에서 값을 꺼내서 쓰는 것
    const diaryList=useContext(DiaryStateContext)
    return(
        <div className="DiaryList">
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다</h4>
            <div>
                {diaryList.map((it)=> (
                    <DiaryItem key={it.id} {...it} onEdit={onEdit} onRemove={onRemove}/> //onRemove 함수 내려주고
                ))}
            </div>

        </div>
    )
}

// undefined 값이 나올 수 있기 때문에, default를 빈 배열
DiaryList.defaultProps={
    diaryList:[],
}



export default DiaryList;