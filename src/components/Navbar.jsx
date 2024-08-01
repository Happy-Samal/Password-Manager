import React from 'react'

function Navbar() {
    return (
        <>
            <div className=' flex justify-between items-center bg-[#191330] py-2 px-8 '>
                <div className='flex items-center font-bold text-[#7144FF] sm:text-2xl text-[14px]'>
                    <span >&lt;</span><span className='text-white'>Pass</span><span>OP/&gt;</span>
                </div>
                <ul className='flex items-center gap-4 text-white sm:text-[16px] text-[10px]'>
                    <li>
                        <lord-icon
                            src="https://cdn.lordicon.com/epietrpn.json"
                            trigger="loop"
                            >
                        </lord-icon></li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </div>
        </>
    )
}

export default Navbar
