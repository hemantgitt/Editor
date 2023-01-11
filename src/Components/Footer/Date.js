import React,{useState} from 'react'
import './Date.css';

export const Date = ({done,sidebar2,sidebar3,sidebar4,sidebar1,sidebar5}) => {

    const [style, setStyle] = useState({});
	
	setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 200);
	


  return (
    <div className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ?"progress-clicked":"progress"}>
			<div className={sidebar2 || sidebar1 || sidebar3 || sidebar4 || sidebar5 ?"progress-done-clicked":"progress-done"} style={style}>
				
			</div>
		</div>
  )
}
