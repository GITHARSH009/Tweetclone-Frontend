import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Home2 from './pages/Home/Home2';
import Signup from './pages/Login/Signup';
import { UserAuthContextProvider } from './Context/UserAuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import { PageLoading } from './pages/Login/PageLoading';
import Explore from './pages/Explore/Explore';
import Notifications from './pages/Notifications/Notifications';
import Messages from './pages/Messages/Messages';
import Bookmarks from './pages/Bookmarks/Bookmarks';
import Lists from './pages/Lists/Lists';
import Profile from './pages/Profile/Profile';
import More from './pages/More/More';
import Feed from './pages/Feed/Feed';
import { Result } from './pages/Plans/Result';
import Plan from './pages/Plans/Plan';
import Room from './pages/More/Room/Room';
import Homelive from './pages/More/Main/Homelive';

function App() {
  return (
    <div className="App">
    <UserAuthContextProvider>
     <Router>
      <Routes>
        <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}>
          <Route index element={<Feed/>}/>
        </Route>
        <Route path='/home' element={<Home2/>}/>
        <Route path='Home' element={<Home/>}>
        <Route path='feed' element={<Feed/>}/>
        <Route path='explore' element={<Explore/>}/>
        <Route path='notifications' element={<Notifications/>}/>
        <Route path='messages' element={<Messages/>}/>
        <Route path='bookmarks' element={<Bookmarks/>}/>
        <Route path='lists' element={<Lists/>}/>
        <Route path='profile' element={<Profile/>}/>
        <Route path='more' element={<More/>}/>
        <Route path='plan' element={<Plan/>}/>
        <Route path='paymentsuccess' element={<Result/>}/>
        <Route path='live' element={<Homelive/>}/>
  
        </Route>
        
        <Route path='/room/:roomid' element={<Room/>}/>
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
