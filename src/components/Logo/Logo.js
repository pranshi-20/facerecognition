import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css'
import icon from './icon.png'
const Logo=()=>{
	return (
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 105 }} style={{ height: 50, width: 50 }} >
 				<div className="Tilt-inner"><img src={icon} alt='logo' /></div>
			</Tilt>

		</div>
	);
}

export default Logo;