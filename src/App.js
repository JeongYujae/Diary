import { useState, useRef } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';



function App() {

  const [data,setData]= useState([]); //일기 리스트니까 초기 값- > [] 빈 배열

  const dataId = useRef(1);

  const onCreate = (author, content, emotion) => {
    const created_date= new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,created_date,
      id: dataId.current
    };

    dataId.current+=1;
    setData([newItem, ...data])
  };


  const onRemove = (targetId) =>{
    const newDiaryList= data.filter((it)=>it.id!==targetId);
    setData(newDiaryList);
  };

  const onEdit = (targetId,newContent) => {
    setData(
      data.map((it)=>
        it.id===targetId ? {...it, content:newContent} : it)
    )

  };

  return(
    <div className='App'>
      {/* 상태가 변화하면 재 랜더링 */}
      {/* props로 onCreate 함수를 전달 */}
      <DiaryEditor onCreate={onCreate}/> 
      <DiaryList onEdit={onEdit}onRemove={onRemove} diaryList={data}/>  {/* props 값으로 data 전달*/}
      
    </div>
  )
}

export default App;
