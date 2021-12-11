import React from 'react'
import SplitPane, { Pane } from 'react-split-pane';
import Contact from '../components/Web/Contact';
import Messanger from '../components/Web/Messanger';
import "./Pane.css"
export default function Web() {
    return (
        <SplitPane minSize={350} maxSize={450} defaultSize="400px" style={{height:"84vh",overflow:"hidden"}} split="vertical"  >
  <Pane  className="Resizer" style={{overflowY:"scroll"}} >
      <Contact Name="Nitesh" Message="Hi lahfsafjsadfa sfiksad fnsd" ProfileImg="https://avatars.githubusercontent.com/u/76529189?v=4"/>
      <Contact Name="Albert" Message="Time is Relative" ProfileImg="https://static.parade.com/wp-content/uploads/2021/08/albert-einstein-quotes.jpg"/>
      <Contact Name="Marie" Message="Recently Got pair of Nobel Prize" ProfileImg="https://upload.wikimedia.org/wikipedia/commons/c/c8/Marie_Curie_c._1920s.jpg"/>
      <Contact Name="Hawking" Message="You want to know what is blackhole" ProfileImg="https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2018/11/10/Photos/Processed/stephenhawking.jpg"/>
      <Contact Name="Newton" Message="wana know about Gravity" ProfileImg="https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/EXSZVVEU4NASDN4OPV2OTKK77A.png&w=767"/>
      <Contact Name="Elon" Message="Space Toure" ProfileImg="https://www.casino-king.com/images/articles/elon-musk.jpg"/>
      <Contact Name="Tesla" Message="Wireless Charnger for your Android" ProfileImg="https://www.energy.gov/sites/default/files/styles/full_article_width/public/tesla_portrait_0.jpeg?itok=GnME4zta"/>
        
      <Contact Name="Heisenberg" Message="It's Not Walter White" ProfileImg="https://static2.srcdn.com/wordpress/wp-content/uploads/2020/07/Breaking-Bad-Werner-Heisenberg.jpg?q=50&fit=crop&w=960&h=500&dpr=1.5"/>
      <Contact Name="Physics Wallah" Number="23342432342" Message="Don't Forget Me" ProfileImg="https://1.bp.blogspot.com/-s4O8dvCpf1I/YQdfGkHDsWI/AAAAAAAAAH0/VR3ProaDon0J5tu4ppNvDGB67msKBpNDgCLcBGAsYHQ/w320-h292/PicsArt_12-06-11.16.51.png"/>
      <Contact  Number="+91 6483904870" Message="Guess Who" />
        
  </Pane>
 
  <Pane h="100%" className="Resizer" style={{overflow: 'hidden'}} >
    <Messanger/>
  </Pane>
</SplitPane>
       
    )
}
