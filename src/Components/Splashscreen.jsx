import React, { useEffect, useState } from 'react'

function Splashscreen({ onFinish }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);

        const fadeOut = setTimeout(() => {
            setVisible(false)
        }, 2500)

        const finishVisible = setTimeout(() => {
            onFinish()
        }, 3000)

        return () => {
            clearTimeout(fadeOut);
            clearTimeout(finishVisible);
        }
    }, [onFinish])

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-white z-50'>
            <h1
                className={`text-7xl font-serif tracking-[0.3em] transition-opacity duration-700 will-change-opacity ${visible ? "opacity-100" : "opacity-0"
                    }`}
            >
                SHI
            </h1>

        </div>
    )
}

export default Splashscreen