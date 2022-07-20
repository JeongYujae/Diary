import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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
    setTimeout(()=>{
      getData()
    },1500)

  },[])

  //useCallback 최적화
  //Diary Editor에서 일기리스트에 대해 컨트롤 할때, 일기 작성칸에서도 재랜더링이 일어남
  //첫 번째 인자: 콜백 함수 + [] 를 빈 배열로 둬서 처음에만 변경 + 그 다음부터는 같은 값으로 전달
  //문제: [] 빈 인자로 계속 전달을 해서 -> 일기 리스트가 지속이 안됨

  const onCreate = useCallback((author, content, emotion) => {
    const created_date= new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,created_date,
      id: dataId.current
    };

    dataId.current+=1;
    //함수인자로 콜백 함수를 전달하여 해결
    setData((data)=>[newItem, ...data])
  },[]);

  
  const onRemove = useCallback((targetId) =>{
    setData(data => data.filter((it)=>it.id!==targetId));  
    // 인자 부분, 최신의 data 를 전달
  },[]);

  const onEdit = useCallback((targetId,newContent) => {
    setData((data)=>
      data.map((it)=>
        it.id===targetId ? {...it, content:newContent} : it)
    )

  },[]);

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
      <DiaryEditor onCreate={onCreate}/> 
      <div>좋아좋아:{goodCount}</div>
      <div>싫어싫어:{badCount}</div>
      <div>좋아비율:{goodRatio}%</div>
      <DiaryList onEdit={onEdit}onRemove={onRemove} diaryList={data}/>  {/* props 값으로 data 전달*/}
      
    </div>
  )
}

export default App;
