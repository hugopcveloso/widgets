import React, {useState, useEffect} from 'react'
import axios from 'axios';

const styledCards = {
  backgroundColor:'white',
  minHeight:'50px',
  height: 'auto',
  maxHeight:'100px',
  padding:'20px',
  textOverflow: "ellipsis",
  overflow: "hidden",
}

const styledButton = {
  
  paddingTop: '20px',
  paddingBottom: '20px'
}

const Search = () => {
  const [term, setTerm] = useState('programming');
  const [results, setResults] = useState([])
  const [debouncedTerm, setDebouncedTerm] = useState(term)

  useEffect(()=> {
    const timeOutId = setTimeout(()=> {
      setDebouncedTerm(term)
    }, 1000);
    return () => {
      clearTimeout(timeOutId)
    }
  }, [term] )

  useEffect(()=> {
    const search = async () => {
      const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{ 
        params: {
          action: 'query',
          list:'search',
          origin: '*',
          format:'json',
          srsearch: debouncedTerm,
        },
      });
    setResults(data.query.search)
    };
    if (debouncedTerm) {  
      search()
    }
  }, [debouncedTerm])
  
  

  const renderedResults = results.map((result)=>{
    const regex = /(<script(\s|\S)*?<\/script>)|(<style(\s|\S)*?<\/style>)|(<!--(\s|\S)*?-->)|(<\/?(\s|\S)*?>)/gi;  //NEW
    const cleanSnippet = result.snippet.replace(regex, "");
    
    return (
    <div key={result.pageid} className="item">
      <div style={styledButton} className="right floated content">
        <a href={`https://en.wikipedia.org?cuird=${result.pageid}`} className="ui button">
          Go
        </a>
      </div>
      <div style={styledCards} className="content">
        <div className="header">
          {result.title}
        </div>
        {cleanSnippet}
      </div>
    </div>
    )
  })

  return ( 
    <div>
      <div className="ui form">
        <div className="field">
          <label htmlFor="">Enter Search Term</label>
          <input 
            type="text"
            value={term}
            onChange={e=> setTerm(e.target.value)}
            className="input"
          />
        </div>
      </div>
      <div className="ui celled list">
        {renderedResults}
      </div>
    </div>
  )
}

export default Search
