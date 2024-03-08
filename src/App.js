import React, { useEffect,useRef } from "react";
import { useState } from "react";

const textArray=["Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
"Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat","Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
"Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"];


function App() {

  const [text,setText]=useState("");
  const [Index,setIndex]=useState(0);
  const [count,setCount]=useState(0)
  const [prewText,setPrewText]=useState("")
  const [correct,setCorrent]=useState(false);
  const [arrIndex,setArrIndex]=useState(0);
  const [final,setFinal]=useState(true);
  const [finish,setFinish]=useState(false);
  const [started,setStarted]=useState(false);

  const [sec,setSec]=useState(0);
  const [mins,setMins]=useState(0)

  const Ref=useRef(null);
  
  useEffect(()=>{
    if(prewText===textArray[arrIndex].split(" ")[Index-1]){
      setCount(prew=>prew+1)
      setCorrent(true)
    }
    else{
      setCorrent(false)
    }
    if(Index===textArray[arrIndex].split(" ").length && final){
      setArrIndex(prew=>prew+1)
      setIndex(0)
    }
    if(arrIndex===textArray.length-1){
      setFinal(false)
    }
    if(Index===textArray[arrIndex].split(" ").length && arrIndex===textArray.length-1){
      setFinish(true);
      Ref.current.disabled=true;
    }
  },[prewText,Index,arrIndex,final])

  useEffect(()=>{
    const countUp=()=>{
    if(started){
      setSec(sec+1);
      if(sec===59){
        setSec(0);
        setMins(mins+1);
      }
    }
  }
    const c=setInterval(countUp,1000)
    if(finish){
      clearInterval(c)
    }
    return ()=>clearInterval(c)
  },[sec,mins,finish,started])


  function handleFocus(){
    Ref.current.disabled=false;
    Ref.current.focus()
    setStarted(true)
  }
 
  
  function handleTap(e){
    if(e.key===" "){
      setPrewText(e.target.value)
      setIndex(index=>index+1);
      setText("")
      }
      else{
        setText(e.target.value) 
      }
    }
    function handleReset(){
      Ref.current.disabled=true;
      setText("");
      setPrewText("");
      setArrIndex(0)
      setCount(0);
      setIndex(0);
      setMins(0);
      setSec(0);
      setCorrent(false);
      setFinal(true);
      setFinish(false);
      setStarted(false);
    }

  return (
    <div>
        <h1 className="Title">Typing app</h1>
        <h2>{mins}:{sec.toString().padStart(2,"0")}</h2>
        {
       textArray[arrIndex].split(" ").map((item,index)=>{
        if(Index-1===index && correct===true){
          return (<span key={index} className="correctSpanText">{item} </span>)
        }
        else if(Index-1===index && correct===false){
          return (<span key={index} className="wrongSpanText">{item} </span>)
        }
        return (<span key={index} className="spanText" >{item} </span>)
          
        })
      }
      
      
      <div className="parentDiv">
      <input type="text" className="inputText" value={text.trimStart()}
      onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>handleTap(e)} ref={Ref} disabled={true}/>
      
      <div className="typedText">{text}</div>
      </div>
      <p><b style={{fontSize:"25px"}}>Correct word count:{count}</b></p>

      <div>
        <button onClick={handleFocus} className="start" >Start</button>
        <button onClick={handleReset} className="finish">Reset</button>
      </div>

      <div className="result"><b >{finish?`your score is: ${(count*60 / (mins*60+sec)).toFixed(2)} WPM`:""}</b></div>

    </div>

  );
}

export default App;
