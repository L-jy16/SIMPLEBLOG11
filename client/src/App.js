import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser, clearUser } from './reducer/userSlice'
import firebase from './firebase.js'

import Header from './components/layout/Header'
import Main from './components/layout/Main'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Write from './components/post/PostWrite'
import List from './components/post/PostList'
import Detail from './components/post/PostDetail'
import Modify from './components/post/PostModify'
import Login from './components/user/Login'
import Join from './components/user/Join'

const App = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      console.log("userInfo : ", userInfo);
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }

    })
  }, [dispatch]);

  // useEffect(() => {
  //   console.log("user : ", user)
  // }, [user])

  // useEffect(() => {
  //   // firebase.auth().signOut();
  // }, []);

  return (
    <>
      <Header />
      <Main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/list' element={<List />}></Route>
          <Route path='/detail/:postNum' element={<Detail />}></Route>
          <Route path='/modify/:postNum' element={<Modify />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/join' element={<Join />}></Route>
        </Routes>
      </Main>
      <Footer />
    </>
  )
}

export default App
