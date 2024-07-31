import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Footer, Navbar } from './components';
import { Home, Data, About, Update } from './pages';
import { ethers } from 'ethers';
import HospitalRecords from '../../web3/artifacts/contracts/HospitalRecords.sol/HospitalRecords.json' assert { type: "json" };

const AppState = createContext();

const App = () => {
  const [isLogin, setLogin] = useState(false);
  const [ walletAddress, setWalletAddress ] = useState("");
  
  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
  const abi = HospitalRecords.abi;
  const provider = new ethers.BrowserProvider(window.ethereum);

  const wallet = new ethers.Wallet(import.meta.env.VITE_PRIVATE_KEY, provider);

  const contract = new ethers.Contract(contractAddress, abi, wallet);

  return (
    <AppState.Provider value={{isLogin, setLogin, contract, walletAddress, setWalletAddress}}>
      <div className="relative bg-[#0C2D48] min-h-screen overflow-x-hidden flex flex-row justify-center text-white">
        <div className="flex-1 flex flex-col justify-between max-sm:w-full max-w-full">
          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/data" element={<Data />} />
            <Route path="/about" element={<About />} />  
            <Route path="/update/:id" element={<Update />} />  
          </Routes>

          <Footer />
        </div>
      </div>
    </AppState.Provider>
  )
}

export default App;
export {AppState};