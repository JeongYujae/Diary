import { useState, useRef, useEffect } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
// import LifeCycle from './LifeCycle';
// import LifeCycle_2 from './LifeCycle_unmount'



function App() {

  const [data,setData]= useState([]); //일기 리스트니까 초기 값- > [] 빈 배열

  const dataId = useRef(1);

  //API 받아오기

  const getData = async () =>{

    const res= await fetch('https://jsonplaceholder.typicode.com/comments').then((res)=>res.json());
    
    const initData= res.slice(0,20).map((it)=>{
      return{
        author:it.email,
        content:it.body,
        emotion: Math.floor(Math.random()*5)+1,
        created_date: new Date().getTime(),
        id: dataId.current++
      }
    })

    setData(initData)

  }

  useEffect(()=>{
    getData();
  },[])

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
