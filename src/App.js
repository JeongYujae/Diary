import { useState, useRef, useEffect, useMemo } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';
import OptimizeTest from './OptimizeTest';
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

  //useMemo로 감싸주면 return 값을 최적화 하는데 도움을 준다
  //[] 가 변화할때만 새롭게 계산해서 반환한다 ([] 값 변화가 없다면 그대로 return 한다)
  //함수가 아니라 값으로 사용해야함
  const getDiaryAnalysis = useMemo(() => {
    const goodCount= data.filter((it)=>it.emotion>=3).length;
    const badCount=data.length- goodCount;
    const goodRatio= (goodCount/data.length)*100;
    return {goodCount,badCount,goodRatio}
  },[data.length]);

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis;

  return(
    <div className='App'>
      {/* 상태가 변화하면 재 랜더링 */}
      {/* props로 onCreate 함수를 전달 */}
      <OptimizeTest/>
      <DiaryEditor onCreate={onCreate}/> 
      <div>좋아좋아:{goodCount}</div>
      <div>싫어싫어:{badCount}</div>
      <div>좋아비율:{goodRatio}%</div>
      <DiaryList onEdit={onEdit}onRemove={onRemove} diaryList={data}/>  {/* props 값으로 data 전달*/}
      
    </div>
  )
}

export default App;
