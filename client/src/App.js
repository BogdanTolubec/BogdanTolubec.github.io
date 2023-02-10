import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/ApRouter';
import Menu from './components/Menu/Menu';
import Footer from './components/Footer/Footer'
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Context } from '.';
import { auth } from './http/userApi';

const App = observer(() => {
  const {user} = useContext(Context)
  const [loading, setLoading] = useState(true)

  useEffect (() => {
    auth().then( (data) => {

        user.setUser(user)
        user.setIsAuth(true) //after page loading we checking user token about isValid?

      }).finally( () => {setLoading(false)})
  }, [])

  return (
    <BrowserRouter>
      <Menu></Menu>
        <AppRouter/>
      <Footer></Footer>
    </BrowserRouter>
  );
})

export default App;