
import { useEffect, useState } from 'react';
import './App.css';
import logo from "./github.png";

function App() {

  const [users,setUsers] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  useEffect(()=>{
    fetch("https://api.github.com/users?per_page=100").then(response=>response.json()).then(data=>setUsers(data));
    
  },[])

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
    window.open(`https://github.com/${text}`)
  }

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length>0){
      matches = users.filter(usr=>{
        const regex = new RegExp(`${text}`,"gi");
        return usr.login.match(regex);
      })
    }
    console.log("matches", matches);
    setSuggestions(matches);
    setText(text);
  }

  return (
    <div className='wrapper'>
      <img className='logo' src={logo}></img>
      <input type="text"
        onChange = {e => onChangeHandler(e.target.value)}
        value={text}
        onBlur={()=>{
          setTimeout(()=>{
            setSuggestions([])
          },100)
        }}
      />
      {suggestions && suggestions.map((suggestion,i)=>
        <div className='card'> 
        <div className='card-container'>
        <a onClick={()=>onSuggestHandler(suggestion.login)} key={i}>
        <h4 className='container'>{suggestion.login}</h4>
        <img className='avatar' src={suggestion.avatar_url}/>
        </a>
        </div>
        </div>
      )}
    </div>
  );
}

export default App;
