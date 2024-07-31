import React, { useContext, useEffect, useState } from 'react';
import DataCard from '../components/DataCard';
import { AppState } from '../App';
import { loader } from '../assets';

const Data = () => {
  const { contract, walletAddress } = useContext(AppState);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllData = async () => {
    try {
      setLoading(true);
      const tx = await contract.getRecord();
      setData(tx);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllData();
    setLoading(false);
  }, [contract]);

  if (loading) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
  }

  return (
    <div className='min-w-screen min-h-screen flex flex-col gap-5 justify-start items-center px-10 py-4'>
      <div className=' flex items-center justify-between w-full h-[60px] capitalize px-3 font-semibold text-lg rounded-2xl shadow-md shadow-black border-[1px] border-[#B1D4E0]'>
        <div className=' h-[40px] w-[30px] flex justify-start items-center'>
          <h1>id</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>address</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>name</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>age</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>gender</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>bloodtype</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>allergies</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>diagnosis</h1>
        </div>
        <div className=' h-[40px] w-[110px] flex justify-start items-center'>
          <h1>treatment</h1>
        </div>
        <div className=' h-[40px] w-[70px] flex justify-start items-center'>
          <h1>update</h1>
        </div>
        <div className=' h-[40px] w-[70px] flex justify-start items-center'>
          <h1>delete</h1>
        </div>
      </div>
      <div className=' flex flex-col gap-4 items-center justify-start w-full h-full capitalize rounded-2xl'>
        { data.length > 0 ? (
          data.map((data, index) => (
            <DataCard key={index} id={index} address={walletAddress} name={data.name} age={data.age} gender={data.gender} bloodType={data.bloodType} allergies={data.allergies} diagnosis={data.diagnosis} treatment={data.treatment} />
          ))
        ) : (
          <div className='flex justify-center items-center w-full h-full'>
            <p className='text-center text-white'>No data available</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Data