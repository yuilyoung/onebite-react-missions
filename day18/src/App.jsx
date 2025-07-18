import { useState } from 'react'
import './App.css'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Diary from './pages/Diary'
import New from './pages/New'
import NotFound from './pages/NotFound'
import Edit from './pages/Edit'

  // 1. "/" 모든 일기를 조회하는 Home 페이지
  // 2. "/new" 새로운 일기를 작성하는 new 페이지
  // 3. "diary" 일기를 상세히 조회하는 diary 페이지
function App() {
  const nav = useNavigate();

  const onClickButton = () => {
    nav("/new");
  }

  return (
    <>
    <div>
    <Link to={"/"}>Home </Link>
    <Link to={"/new"}>new </Link>
    <Link to={"/diary/1"}>diary </Link>
    <Link to={"/Edit/1"}>Edit </Link>
  </div>
  <button onClick={onClickButton}>New 페이지 이동</button>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/New" element={<New />}/>
      <Route path="/diary/:id" element={<Diary />}/>
      <Route path="/Edit/:id" element={<Edit />} />
      <Route path="*" element={<NotFound />}/>
    </Routes>
    </>
  );
}

export default App
