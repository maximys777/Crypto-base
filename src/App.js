import React, { useEffect, useState } from 'react';
import {Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import { ThemeProvider } from './contex/ThemeContext';
import Home from './routes/Home';
import Login from './routes/Login';
import Signup from './routes/Signup';
import Account from './routes/Account';
import CoinPage from './routes/CoinPage';
import axios from 'axios';
import Footer from './components/Footer';
import { AuthContextProvider } from './contex/AuthContext';

function App() {
  const [coins, setCoins] = useState([])

  const url ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true'

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data)
      // console.log(response.data)
    })
  }, [url])

  return (
    <ThemeProvider>
    <AuthContextProvider>

     <Navbar/>
     <Routes>
      <Route path='/' element={<Home coins={coins}/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/account' element={<Account/>}/>
      <Route path='/coin/:coinId' element={<CoinPage/>}>
        <Route path=':coinId'/>
      </Route>
     </Routes>
     <Footer/>
    </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
