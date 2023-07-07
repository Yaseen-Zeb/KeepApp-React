import React from 'react'
import logo from './css/keep_logo.png'
import './css/app.css'
import './css/font-awsome/all.css'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
    let [dataToStore, setDataToStore] = useState({title:"",text:""});
    let [storedData, SetstoredData] = useState([]);
    let variable_for_card = "card";

useEffect(()=>{
    if (JSON.parse(localStorage.getItem("keep")) != null ) {
                SetstoredData(JSON.parse(localStorage.getItem("keep")));
        }   
},[])


    function handleChange(e) {
        let {name,value} = e.target;
        setDataToStore({...dataToStore,[name]:value})
        console.log(dataToStore);
    }


    function add() {
        if (dataToStore.title === "" || dataToStore.text === "") {
            alert("Title or Text fields should not be empty!");
        }else{
            localStorage.setItem("keep",JSON.stringify([...storedData,dataToStore]));
            setDataToStore({title:"",text:""});
            SetstoredData(JSON.parse(localStorage.getItem("keep")));
        }
    }

    function remove(from) {
        let updated_arr = [];
        storedData.forEach((e,i) => {
            if (i !== from) {
               updated_arr.push(e)
            } 
        });
        localStorage.setItem("keep",JSON.stringify(updated_arr));
        SetstoredData(JSON.parse(localStorage.getItem("keep")));
    }

    function edit(from) {
        let updated_arr = [];
        for (let i = 0; i < storedData.length; i++) {
            if (i === from) {
              updated_arr = storedData
              updated_arr[i] = dataToStore;
            } 
        }
        localStorage.setItem("keep",JSON.stringify(updated_arr));
        SetstoredData(JSON.parse(localStorage.getItem("keep")));

        document.querySelector(`#card${from} input`).style.display = "none";
        document.querySelector(`#card${from} textarea`).style.display = "none";
        document.querySelector(`#card${from} h3`).style.display = "block";
        document.querySelector(`#card${from} p`).style.display = "block";
        document.querySelector(`#card${from} .fa-save`).style.display = "none";
        document.querySelector(`#card${from} .fa-edit`).style.display = "block";
        document.querySelector(`#card${from}`).style.position = "unset";
        document.querySelector(`.fixed`).style.display = "none";
        setDataToStore({title:"",text:""});

    }

    // function handeSaveAlert(from) {
    //     alert("ggg")
    //     if (document.querySelector(`.card${from} textarea`).style.display == "block") {
    //         alert("ddd")
    //     }
    // }

  return (
    <>
    <div className='fixed'></div>
<section className="M-first">
        <nav>
            <div className="first">
                <img  src={logo} alt="logo" />
            </div>
            <div className="second">
                <button onClick={ ()=> {
                    document.querySelector(".main-card").style.display="block"; 
                    document.querySelector(".new-card").style.display="none";
                    }} className="btn new-card">Open Pade +</button>
            </div>
        </nav>
        <div className="main-card">
            <h2>Create Note</h2>
            <input value={dataToStore.title} onChange={handleChange} type="text" name="title" placeholder="Title" className="input question" />
            <textarea value={dataToStore.text} onChange={handleChange} type="text" name="text" placeholder="Write text..." className="input answer"  rows="10" maxLength="319"></textarea>
            <button onClick={add} className="btn save" id="save">+Save</button>
            <button className="btn close" onClick={ ()=> {
                document.querySelector(".new-card").style.display="block"; 
                document.querySelector(".main-card").style.display="none"; 
                }}>Close</button>
        </div>
    </section>

    <section className="M-second">
     {
        storedData.map((card,i)=>
            <div key={i} id={variable_for_card+i} className="cards">
            <h3 className="title">{card.title}</h3>
            <input onChange={handleChange} type="text" name="title" placeholder="Title" className="input question" />
            <p className="text">{card.text}</p>
            <textarea onChange={handleChange} type="text" name="text" placeholder="Write text..." className="input answer"  rows="10" maxLength="319"></textarea>
            <div style={{display:"flex",justifyContent:"end"}}>
            <span className="icon edit_icon fas fa-edit" 
            onClick={()=>{
                let h3 = document.querySelector(`#card${i} h3`);
                let p = document.querySelector(`#card${i} p`);
                let input = document.querySelector(`#card${i} input`);
                let textarea = document.querySelector(`#card${i} textarea`);
                input.style.display = "block";
                textarea.style.display = "block";
                h3.style.display = "none";
                p.style.display = "none";
                input.value = h3.textContent;
                textarea.value = p.textContent;
                document.querySelector(`#card${i} .fa-save`).style.display = "block";
                document.querySelector(`#card${i} .fa-edit`).style.display = "none";
                document.querySelector(`#card${i}`).style.position = "relative";
                document.querySelector(`.fixed`).style.display = "block";
                textarea.focus();
                setDataToStore({title:h3.textContent,text:p.textContent})
            }}
            ></span>
            <span style={{display:"none"}} className="icon edit_icon fas fa-save" onClick={()=>edit(i)} ></span>
            <span className="icon remove_icon fa fa-trash" onClick={()=>remove(i)} aria-hidden="true"></span>
            </div>
            </div>
        )
     }
    </section>
    </>
  )
}

export default App