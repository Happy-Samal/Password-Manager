import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function Body() {
    const [form, setForm] = useState({ url: "", username: "", password: "" })
    const [data, setData] = useState([])
    const eyeRef = useRef()

    useEffect(() => {
        let notEmpty = localStorage.getItem("OurPasswords")
        if (notEmpty) {
            let newData = JSON.parse(localStorage.getItem("OurPasswords"))
            setData(newData)
        }
    }, [])


    const inputClicked = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const saveClick = () => {
        if (form.url.length > 3 && form.username.length > 3 && form.password.length > 5) {
            setData([...data, { id: uuidv4(), form }])
            setForm({ url: "", username: "", password: "" })
            localStorage.setItem("OurPasswords", JSON.stringify([...data, { id: uuidv4(), form }]))
        }
        if(toast){
            toast('🦄 save successfully!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }

    }
    const editClick = (id) => {
        let newData = data.filter((e) => {
            return e.id == id
        })
        setForm(newData[0].form)
        let Data = data.filter((e) => {
            return e.id != id
        })
        setData(Data)
    }
    const deleteClick = (id) => {
        let cnf = confirm("Are sure to delete!")
        if (cnf) {
            let newData = data.filter((e) => {
                return e.id != id
            })
            setData(newData)
            localStorage.setItem("OurPasswords", JSON.stringify(newData))
        }
    }
    const eyeClick = () => {
        if (eyeRef.current.type == "password") {
            eyeRef.current.type = "text"
        } else {
            eyeRef.current.type = "password"
        }
    }
    const copy = (text) => {
        navigator.clipboard.writeText(text)

        if(toast){ 
            toast('🦄 copy successfully!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        }
            
    }
    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={1000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />

            <div className="absolute inset-0 -z-10 h-full w-full  bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#7144ff] opacity-20 blur-[100px]"></div></div>


            <div className='sm:myContainer p-[20px] '>
                <div className='flex flex-col justify-center items-center'>
                    <div className='flex items-center font-bold text-[#7144FF] sm:text-2xl text-[20px]'>
                        <span >&lt;</span><span className='text-[#191330]'>Pass</span><span>OP/&gt;</span>
                    </div>
                    <span className='sm:text-lg text-[16px] text-stone-900 font-semibold'>Your Own Password Manager</span>
                </div>
                <div className='flex flex-col items-center gap-4 my-5'>
                    <input className='rounded-full w-full px-4 py-1 border-2 border-[#8159ff]' placeholder='Enter Website URL' type="text" onChange={inputClicked} name='url' value={form.url} />
                    <div className=' flex sm:flex-row flex-col gap-4 w-full'>
                        <input className=' sm:w-1/2 rounded-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter User Name ' type="text" onChange={inputClicked} name='username' value={form.username} />
                        <div className='relative sm:w-1/2'>
                            <input ref={eyeRef} className='rounded-full w-full px-3 py-1 border-2 border-[#8159ff]' placeholder='Enter Password ' type="password" onChange={inputClicked} name='password' value={form.password} />
                            <span onClick={eyeClick} className='absolute right-[10px]'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/fmjvulyw.json"
                                    trigger="hover"
                                    colors="primary:#121331,secondary:#ebe6ef,tertiary:#3a3347,quaternary:#7144ff,quinary:#f9c9c0,senary:#f24c00"
                                >
                                </lord-icon>
                            </span>
                        </div>
                    </div>
                    <button onClick={saveClick} className='text-[16px] text-white bg-[#7144FF] w-28 h-[39px] border-2  rounded-full flex items-center justify-center gap-2'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ujxzdfjx.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#000000,secondary:#ffffff"
                            style={{ width: "30px", height: "30px" }}>
                        </lord-icon>
                        <span>Save</span></button>
                </div>
                {data.length === 0 && <div>No data to show</div>}
                {data.length != 0 && <table className="sm:w-full w-[100%] text-[8px] sm:text-[16px]">
                    <thead className='bg-[#bca6ff] text-white '>
                        <tr>
                            <th>Website</th>
                            <th>User Name</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {data.map((item) => {
                        return <tbody className='bg-[#ebe4ff]  ' key={item.id}>
                            <tr>
                                <td><div className='tdFlex'><a href={item.form.url} target='_blank'>{item.form.url} </a><img src="./copy.png" className='cursor-pointer' onClick={() => { copy(item.form.url) }} /></div></td>
                                <td><div className='tdFlex'><div>{item.form.username}</div><img src="./copy.png" className='cursor-pointer' onClick={() => { copy(item.form.username) }} /></div></td>
                                <td><div className='tdFlex'><div>{"*".repeat(item.form.password.length)}</div><img src="./copy.png" className='cursor-pointer' onClick={() => { copy(item.form.password) }} /></div></td>
                                <td>
                                    <div className='tdFlex'>
                                        <button onClick={() => { editClick(item.id) }} ><lord-icon
                                            src="https://cdn.lordicon.com/lsrcesku.json"
                                            trigger="hover"
                                            style={{ width: "20px", height: "20px" }}>
                                        </lord-icon></button>
                                        <button onClick={() => { deleteClick(item.id) }}><lord-icon
                                            src="https://cdn.lordicon.com/xekbkxul.json"
                                            trigger="hover"
                                            style={{ width: "20px", height: "20px" }}>
                                        </lord-icon></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    })}
                </table>
                }
            </div>
        </>
    )
}

export default Body
