import React from "react";
import DiaryItem from './DiaryItem'

//onRemove 함수 받고

const DiaryList= ({onEdit,onRemove, diaryList}) =>{

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