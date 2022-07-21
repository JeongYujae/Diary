import React, { useRef, useState,useContext } from "react";
import { DiaryDispatchContext } from "./App";


const DiaryItem = ({author, content, created_date, emotion, id}) => {

    const {onEdit,onRemove}= useContext(DiaryDispatchContext)


    // true => 수정 중인 기능 수행, false => 일상적인 페이지 보여줌 (true 일 때 수정 가능하게 할거야)
    const [isEdit, setIsEdit]=useState(false);

    //상태를 바꿔쥐
    const toggleIsEdit = () => setIsEdit(!isEdit);

    // 삭제하는 과정 따로 뺴두기
    const handleRemove = () => {
            if (window.confirm(`${id}번째 일기를 삭제하시겠습니까?`)){
                onRemove(id);
            
        }
    };

    // 수정하기 위한 state 값 생성
    const [localContent, setLocalContent]=useState(content);

    //focus를 위한 ref
    const localContentInput = useRef();

    //수정 취소 시 다시 원본 내용으로 돌리기

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = () => {
        if (localContent.length <5){
            localContentInput.current.focus();
            return;
        }

        if(window.confirm(`${id}번째 일기를 수정하시겠습니까?`)){
            onEdit(id, localContent);
            toggleIsEdit();

        }

    }

    return(
        <div className="DiaryItem">
            <div className="info">

                <span>
                    작성자: {author} |
                    감정점수: {emotion}
                </span>
                <br/>
                <span className="date">
                    {new Date(created_date).toLocaleDateString()}
                </span>
            </div>

            <div className="content">
                {isEdit ? <>
                    <textarea ref={localContentInput} value={localContent} onChange={(e)=>{
                        setLocalContent(e.target.value)
                    }}/>
                </>
                // content를 value로 받고, 변화 있다면 value를 content state로 바꿔준다  
                : 
                <>{content}</>}
            </div>

            {isEdit ? 
            <> 
            <button onClick={handleQuitEdit}>
                수정 취소
            </button>
            <button onClick={handleEdit}>
                수정완료
            </button>
            </>
            :
            <>
            <button onClick={toggleIsEdit}>
                수정하기
            </button>
            <button onClick={handleRemove}>
                삭제하기
            </button>
            </>
            }
        
                
                
        </div>

    );
}

// 최적화 1단계 React.memo 로 묶어주기
export default React.memo(DiaryItem);