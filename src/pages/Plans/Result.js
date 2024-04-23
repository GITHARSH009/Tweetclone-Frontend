import React from 'react'
import { useSearchParams } from 'react-router-dom'
export const Result = () => {
    const query=useSearchParams()[0]
    const reference=query.get("reference")
  return (
    <div style={{'display':'flex','flexDirection':'column','alignItems':'center','width':'100vw','padding':'0px 50px','height':'110vh','flex':'0.4'}}>
        <h3 style={{'display':'flex','color':'green','textAlign':'center'}}>Congratulations!! Payment Successfull</h3>
        <h4 style={{'display':'flex','color':'aqua','textAlign':'center','justifyContent':'center'}}>Payment Reference_Id:{reference}</h4>
    </div>
   
  )
}

// display: flex;
//     align-items: center;
//     width: 100vw;
//     padding: 0 50px;
//     height: 110vh;
//     flex: 0.4;