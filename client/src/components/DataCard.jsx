import React, { useContext, useState } from 'react'
import { AppState } from '../App';
import { loader } from '../assets';
import { useNavigate } from 'react-router-dom';

const DataCard = ({ id, address, name, age, gender, bloodType, allergies, diagnosis, treatment }) => {
    const { contract, walletAddress } = useContext(AppState);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleDelete = async() => {
        try {
            setLoading(true);
            if(walletAddress.toLowerCase() === address.toLowerCase()) {
                const tx = await contract.deleteRecord(parseInt(id));
                await tx.wait();
                setLoading(false);
            } else {
                alert("Invalid credentials");
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }

    }

    const handleUpdate = async() => {
        if(walletAddress.toLowerCase() === address.toLowerCase()) {
            navigate(`/update/${id}`);
        } else {
            alert("Invalid credentials");
        }
    }

    if (loading) {
        return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
    }

    return (
    <div className='flex items-center justify-between bg-[#2E8BC0] w-full h-fit capitalize px-3 py-3 text-white text-sm rounded-2xl shadow-md shadow-black'>
        <div className='h-[40px] w-[30px] flex justify-start items-center'>
            <h2 className='text-ellipsis overflow-hidden'>{id}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2 className='text-ellipsis overflow-hidden pr-2'>{address}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{name}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{age.toString()}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{gender}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{bloodType}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{allergies}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{diagnosis}</h2>
        </div>
        <div className='h-[40px] w-[110px] flex justify-start items-center'>
            <h2>{treatment}</h2>
        </div>
        <div className='h-[40px] w-[70px] rounded-full hover:shadow-black shadow-lg flex justify-center items-center border-[1px] border-[#B1D4E0] mr-1'>
            <button onClick={handleUpdate}>Update</button>
        </div>
        <div className='h-[40px] w-[70px] rounded-full hover:shadow-black shadow-lg flex justify-center items-center border-[1px] border-[#B1D4E0] mr-1'>
            <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
    )
}

export default DataCard