import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import UploadAssets from './Components/UploadAssets/UploadAssets';
import Header from './Components/Header/Header';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import Assets from './Components/Assets/Assets';
import  Profile from "./Components/Profile/Profile"

function App() {
  return (
    <ThirdwebProvider>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='uploadassets' element={<UploadAssets/>} />
    <Route path='/assets' element={<Assets/>} />
    <Route path='/profile' element={<Profile/>} />
    {/* <Route path='/assets/:id' el /> */}
    </Routes>
    </BrowserRouter>
    </ThirdwebProvider>
  );
}

export default App;
