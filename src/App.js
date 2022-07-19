import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

const dummyList=[
  {
    id:1,
    author:'JEONG',
    content:'안녕안녕',
    emotion: 4,
   created_date: new Date().getTime()
  },
  {
    id:2,
    author:'King',
    content:'Good morning',
    emotion: 3,
   created_date: new Date().getTime()
  },
  {
    id:3,
    author:'Passmore',
    content:'LOL bro',
    emotion: 2,
   created_date: new Date().getTime()
  }
]

function App() {
  return(
    <div>
      <DiaryEditor/>
      <DiaryList diaryList={dummyList}/>  {/* props 값으로 전달 */}
      
    </div>
  )
}

export default App;
