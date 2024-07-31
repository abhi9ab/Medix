import React, { useContext, useEffect, useState } from 'react'
import { logo } from '../assets';
import { useNavigate } from 'react-router-dom';
import { AppState } from '../App';

const Navbar = () => {

  const {ethereum} = window;
  const navigate = useNavigate();
  const { setLogin, walletAddress, setWalletAddress } = useContext(AppState);

  const handleLogin = async() => {
    try {
      await ethereum.request({method: "wallet_requestPermissions", params: [{eth_accounts: {}}]})
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
      setLogin(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const savedWalletAddress = localStorage.getItem('walletAddress');
    if (savedWalletAddress) {
      setWalletAddress(savedWalletAddress);
    }
    
    ethereum.on("accountsChanged", (accounts) => {
      setWalletAddress(accounts[0]);
      localStorage.setItem('walletAddress', accounts[0]);
    });
  },[ethereum, setWalletAddress])

  return (
    <div className='flex justify-between h-[60px] shadow-lg rounded items-center bg-[#145DA0] px-5'>
      <button type='button' onClick={() => navigate("/")} className='flex w-[120px] h-[65px] justify-center items-center rounded-md object-contain'>
        <img src={logo} width={150}/>
      </button>
      <div className='flex w-fit h-[40px] items-center gap-10 cursor-pointer'>
        <button type='button' className='bg-[#90f6d7] rounded-full text-[#263849] w-[100px] h-full font-bold uppercase hover:opacity-20 overflow-hidden text-ellipsis px-2 py-1' onClick={() => navigate('/data')}>Data</button>
        <button type='button' className='bg-[#90f6d7] rounded-full text-[#263849] w-[100px] h-full font-bold uppercase hover:opacity-20 overflow-hidden text-ellipsis px-2 py-1' onClick={handleLogin}>{ walletAddress ? walletAddress : "connect" }</button>
      </div>
    </div>
  )
}

export default Navbar