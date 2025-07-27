import { useContext, useState, createContext, useEffect } from 'react'
import './App.css'
import { useReducer, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from "./pages/Edit";
import NotFound from './pages/NotFound'

// import { getEmotionImage } from './util/get-emotion-image'
// import Button from './components/Button'
// import Header from './components/Header'

function reducer(state, action){
  let nextState;

  switch(action.type){
    case 'INIT':
      return action.data;
    case 'CREATE': {
      nextState = [action.data, ...state];
      break;
    }
    case 'UPDATE': {
      nextState = state.map((item) =>
      String(item.id) === String(action.data.id)
       ? action.data 
       : item
      );
      break;
    }
    case 'DELETE': {
      nextState = state.filter((item) => String(item.id) !== String(action.id)
      );
      break;
    }
    default:
      return state;
  }

  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

  // 1. "/" 모든 일기를 조회하는 Home 페이지
  // 2. "/new" 새로운 일기를 작성하는 new 페이지
  // 3. "diary" 일기를 상세히 조회하는 diary 페이지

export const DiaryStateContext = createContext();
export const DiaryDispatchContect = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(()=>{
    const storeData = localStorage.getItem("diary");
    if(!storeData){
      setIsLoading(false);
      return;
    }

    const parsedData = JSON.parse(storeData);
    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }

    let maxId = 0;
    parsedData.forEach((item)=>{
      if(Number(item.id) > maxId){
        maxId = Number(item.id)
      }
    })

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // 새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type:"CREATE",
      data : {
        id : idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    })
  }

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch(
      {
        type:"UPDATE",
        data: {
          id,
          createdDate,
          emotionId,
          content,
        }
      }
    )
  }
  // 기존 일기 삭제
  const onDelete = (id) => {
    dispatch(
      {
      type: "DELETE",
      id,
      });
  };

  // const nav = useNavigate();

  // const onClickButton = () => {
  //   nav("/new");
  // }

  if(isLoading) {
    return <div>데이터 로딩중입니다...</div>
  }
  
  return (
    <>
    {/* <Header title={"Header"}
      leftChild={<Button text={"Left"} />}
      rightChild={<Button text={"Right"} />}
    />

    <Button 
      text={123} 
      onClick={()=>{
      console.log("123번 클릭");
    }}/>

    <Button 
      text={123} 
      type={"POSITIVE"}
      onClick={()=>{
      console.log("123번 클릭");
    }}/>

    <Button 
      text={123} 
      type={"NEGATIVE"}
      onClick={()=>{
      console.log("123번 클릭");
    }}/> */}

    {/* <div>
      <img src={getEmotionImage(1)}/>
      <img src={getEmotionImage(2)}/>
      <img src={getEmotionImage(3)}/>
      <img src={getEmotionImage(4)}/>
      <img src={getEmotionImage(5)}/>
    </div>
    <div>
    <Link to={"/"}>Home </Link>
    <Link to={"/new"}>new </Link>
    <Link to={"/diary/1"}>diary </Link>
    </div> */}
  {/* <button onClick={onClickButton}>New 페이지 이동</button> */}
   {/* <button 
    onClick={()=>{
      onCreate(new Date().getTime(), 1, "Hello")
    }}>
    일기 추가 테스트
    </button>

    <button onClick={()=>{
      onUpdate(1, new Date().getTime(), 3, "수정된 일기입니다")
    }}>
    일기 수정 테스트
    </button>

    <button onClick={()=>{
      onDelete(1)
    }}>
    일기 삭제 테스트
    </button> */}
<DiaryStateContext.Provider value={data}>
  <DiaryDispatchContect.Provider 
    value={{
      onCreate,
      onUpdate,
      onDelete,
    }}>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/New" element={<New />}/>
      <Route path="/diary/:id" element={<Diary />}/>
      <Route path="/edit/:id" element={<Edit />}/>
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </DiaryDispatchContect.Provider>
</DiaryStateContext.Provider> 
    </>
  );
}

export default App
