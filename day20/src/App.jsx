import { useContext, useState, createContext } from 'react'
import './App.css'
import { useReducer, useRef } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import Edit from "./pages/Edit";
import NotFound from './pages/NotFound'

const mockData = [
  {
    id: 1,
    createdDate: new Date("2025-07-19").getTime(),
    emotionId: 1,
    content: "1번 일기 내용",
  },
  {
    id: 2,
    createdDate: new Date("2025-07-18").getTime(),
    emotionId: 2,
    content: "2번 일기 내용",
  },
  {
    id: 3,
    createdDate: new Date("2025-06-19").getTime(),
    emotionId: 3,
    content: "3번 일기 내용",
  },
];

function reducer(state, action){
  switch(action.type){
    case 'CREATE': return [action.data, ...state];
    case 'UPDATE': 
    return state.map((item) =>
      String(item.id) === String(action.data.id)
       ? action.data 
       : item
    );
    case 'DELETE':
      return state.filter((item) => String(item.id) !== String(action.id));
    default:
      return state;
  }
}

  // 1. "/" 모든 일기를 조회하는 Home 페이지
  // 2. "/new" 새로운 일기를 작성하는 new 페이지
  // 3. "diary" 일기를 상세히 조회하는 diary 페이지

export const DiaryStateContext = createContext();
export const DiaryDispatchContect = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(4);

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
      }
    )
  }

  return (
    <>
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
