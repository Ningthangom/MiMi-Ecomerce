import React from 'react';

import UserNav from './UserNav';




const History = () => {
    return(
        <div className="container-fluid "> 
            <div className="row">
                <div className="colmd-2 ml-3">
                    <UserNav />
                </div>
                <div className="col">User history</div>
            </div>
        </div>
    )
}

export default History;