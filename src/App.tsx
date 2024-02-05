import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import DeletarCategorias from './components/categorias/deletarCategorias/DeletarCategorias'
import FormCategoria from './components/categorias/formCategoria/FormCategoria'
import ListaCategorias from './components/categorias/listaCategorias/ListaCategorias'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import { AuthProvider } from './contexts/AuthContext'
import Cadastro from './pages/cadastro/Cadastro'
import Contato from './pages/contato/Contato'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Sobre from './pages/sobre/Sobre'

import DeletarProduto from './components/produtos/deletarProduto/DeletarProduto'
import FormProduto from './components/produtos/formProdutos/FormProduto'
import ListarProdutos from './components/produtos/listarProdutos/ListarProdutos'
import Cart from './components/produtos/cart/Cart'
import { CartProvider } from './contexts/CartContext'


function App() {
  return (
    <>
    <CartProvider>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastrarCategoria" element={<FormCategoria />} />
              <Route path="/editarCategoria/:id" element={<FormCategoria />} />
              <Route path="/categorias" element={<ListaCategorias />} />
              <Route path="/deletarCategoria/:id" element={<DeletarCategorias />} />
              <Route path="/deletarproduto/:id" element={<DeletarProduto />} />
              <Route path="/cadastroProduto" element={<FormProduto />} />
              <Route path="/editarproduto/:id" element={<FormProduto />} />
              <Route path="/produtos" element={<ListarProdutos />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
      </CartProvider>
    </>
  )
}

export default App

