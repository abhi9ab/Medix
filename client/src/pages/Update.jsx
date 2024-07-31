import React, { useContext, useState } from 'react'
import { loader } from '../assets';
import { useNavigate, useParams } from 'react-router-dom';
import { AppState } from '../App';

const Update = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { contract } = useContext(AppState);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: '',
    bloodType: '',
    allergies: '',
    diagnosis: '',
    treatment: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await contract.updateRecord(parseInt(id), form.name, parseInt(form.age), form.gender, form.bloodType, form.allergies, form.diagnosis, form.treatment);
      await tx.wait();
      setLoading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      navigate('/data');
    }
  }

  if (loading) {
    return <div className='flex min-w-screen min-h-screen justify-center items-center'><img src={loader} width={60}/></div>;
  }

  return (
    <div className='min-w-screen min-h-screen flex justify-center items-center py-5'>
        <div className='bg-[#41506b] shadow-lg shadow-black rounded-xl w-11/12 md:w-[400px] h-7/12 p-6'>
            <form className='flex flex-col text-black' onSubmit={handleSubmit}>
                <div className='flex justify-between items-center'>
                    <h1 className='font-bold text-2xl capitalize text-[#B1D4E0]'>update patient data</h1>
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='name'
                    placeholder='name'
                    onChange={(e) => handleFormFieldChange('name', e)}
                    value={form.name}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='number'
                    name='age'
                    placeholder='age'
                    onChange={(e) => handleFormFieldChange('age', e)}
                    value={form.age}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='gender'
                    placeholder='gender'
                    onChange={(e) => handleFormFieldChange('gender', e)}
                    value={form.gender}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='bloodType'
                    placeholder='bloodType'
                    onChange={(e) => handleFormFieldChange('bloodType', e)}
                    value={form.bloodType}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='allergies'
                    placeholder='allergies'
                    onChange={(e) => handleFormFieldChange('allergies', e)}
                    value={form.allergies}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='diagnosis'
                    placeholder='diagnosis'
                    onChange={(e) => handleFormFieldChange('diagnosis', e)}
                    value={form.diagnosis}
                    required
                />
                </div>

                <div className='flex justify-between items-center bg-white rounded-xl mt-5 h-[40px]'>
                <input 
                    className='bg-transparent w-full text-md border-0 focus:outline-none focus:ring-0 mx-5 py-2'
                    type='text'
                    name='treatment'
                    placeholder='treatment'
                    onChange={(e) => handleFormFieldChange('treatment', e)}
                    value={form.treatment}
                    required
                />
                </div>

                <div className='flex justify-center items-center w-full'>
                <button className='mt-5 bg-[#90f6d7] rounded-full w-1/5 py-2 text-white font-medium shadow-md hover:opacity-50 transition-opacity ' type='submit'>
                    Submit
                </button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Update