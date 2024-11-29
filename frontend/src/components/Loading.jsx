import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'
function Loading() {
  return (
    <div style={{position:"absolute",top:"50%",left:"50%"}}>
      <ThreeCircles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        innerCircleColor="#FF69B4"  
        middleCircleColor="#4682B4" 
        outerCircleColor="#FFD700"  
        ariaLabel="three-circles-loading"
        wrapperStyle={{} }
        wrapperClass=""


        />
        
    </div>
  )
}

export default Loading