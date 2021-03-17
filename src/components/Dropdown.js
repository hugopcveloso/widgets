import React, {useState,useEffect, useRef} from 'react'

const Dropdown = ({label, options, selected, onSelectedChange}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef();
  // to close the dropdown when  clicking outside div
 
 
  useEffect(() => {

    const onBodyClick = (event)=>{
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false)
    }
    
    document.body.addEventListener('click', onBodyClick);
    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
     
  }, [])
  
  const renderedOptions = options.map((option)=>{
    if (option.value === selected.value) {
      return null;
    }
    return( 
      <div 
        key={option.value} 
        onClick={()=>{
          onSelectedChange(option)
        }} 
        className="item"
      >
        {option.label}
      </div>
    )
  })
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label htmlFor="" className="label">
          {label}
        </label>
        <div 
          className={`ui  selection dropdown ${open ? 'visible active':''}`}
          onClick={()=> {
            setOpen(!open)
          }}
        >
          <i className="dropdown icon"></i>
          <div className="text">
            {selected.label}
          </div>
          <div className={`menu ${open ? 'visible transition':''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
     
 
    </div>
    
  )
}

export default Dropdown
