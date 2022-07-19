import React, { useState } from "react";

const UnmountTest = () => {
    return(
        <div>
            UnmountTest
        </div>
    )
}


const LifeCycle_2 = () => {

    const [isVisible, setIsVisible] =useState(false);
    const toggle = () => {
        setIsVisible(!isVisible)
    }
    
    return(
        <div style={{padding:20}}>
            <div>
                <button onClick={toggle}>ON/OFF</button>
                {isVisible && <UnmountTest/>}
            </div>

        </div>
        )
}

export default LifeCycle_2;