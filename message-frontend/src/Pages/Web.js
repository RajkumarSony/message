import React from 'react'
import SplitPane, { Pane } from 'react-split-pane';
import "./Pane.css"
export default function Web() {
    return (
        <SplitPane minSize={350} maxSize={450} defaultSize="400px" style={{height:"84vh",overflow:"hidden"}} split="vertical"  >
  <Pane  className="Resizer" style={{backgroundColor:"grey"}} >
      You can use a Pane component
  </Pane>
 
  <Pane className="Resizer" >
    Using a Pane allows you to specify any constraints directly
  </Pane>
</SplitPane>
       
    )
}
