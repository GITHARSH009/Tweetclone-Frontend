import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import News from './pages/News/News';
import Signup from './pages/Login/Signup';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { PageLoading } from './pages/Login/PageLoading';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Movies from './pages/Movies/Movies';
import Profile from './pages/Profile/Profile';
import Feed from './pages/Feed/Feed';
import { Result } from './pages/Plans/Result';
import Plan from './pages/Plans/Plan';
import Chat from './pages/Messages/Chat/Chat'

function App() {
  return (
    <div className="App">
    <UserAuthContextProvider>
     <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route index element={<Feed/>}/>
        </Route>
        <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route index element={<Feed/>}/>
        </Route>
        {/* <Route path='/home' element={<Home2/>}/> */}
        <Route path='Home' element={<Home/>}>
        <Route path='feed' element={<Feed/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='messages' element={<Messages/>}/>
        <Route path="/Home/messages/chat/:chatUserEmail" element={<Chat />} />
        <Route path='movies' element={<Movies/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='plan' element={<Plan/>}/>
        <Route path='paymentsuccess' element={<Result/>}/>
        <Route path='news' element={<News/>}/>

        </Route>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/loading' element={<PageLoading/>}/>
      </Routes>
     </Router>
    </UserAuthContextProvider>
    </div>
  );
}

export default App;
