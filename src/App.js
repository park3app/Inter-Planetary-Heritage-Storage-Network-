import { BrowserRouter , Routes ,Route } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import UploadAssets from './Components/UploadAssets/UploadAssets';
import Header from './Components/Header/Header';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import Assets from './Components/Assets/Assets';
import  Profile from "./Components/Profile/Profile"
import MyProposals from "./Components/Proposals/MyProposals/MyProposals"
import ActiveProposals from "./Components/Proposals/ActiveProposals/ActiveProposals"
import SuccessProposals from "./Components/Proposals/SucessProposals/SuccessProposals"
import UnSuccesFullProposals from "./Components/Proposals/UnSucessProposals/UnSucessProposals"
import EachAsset from './Components/EachAsset/EachAsset';
import EachProposal from "./Components/Proposals/EachProposal/EachProposal";
import Footer from './Components/Footer/Footer';
import Faucet from './Components/Faucet';


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
    <Route path='/assets/:id' element={<EachAsset/>} />
    <Route path='myproposals' element={<MyProposals/>}  />
    <Route path='activeproposals' element={<ActiveProposals/>} />
    <Route path='activeproposals/:id' element={<EachProposal/>} />
    <Route path='sucessproposals' element={<SuccessProposals/>} />
    <Route path='unsucessproposals' element={<UnSuccesFullProposals/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>
    </ThirdwebProvider>
  );
}

export default App;
