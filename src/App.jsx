import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './css/App.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Categories from './pages/Categories'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Cart from './pages/Cart'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/products' element={<Products />} />
      <Route path='/categories' element={<Categories />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/cart' element={<Cart />} />
    </Routes>
  )
}

export default App