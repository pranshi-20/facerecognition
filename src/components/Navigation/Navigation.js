import React from 'react';

const Navigation=({isSignedIn, onRouteChange})=>{

		if(isSignedIn){

			return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p onClick={()=>onRouteChange('signin')} className='f4 underline dim pointer pa3 link black'>Sign Out</p>
			</nav>
			);
		}else{
			return(
				<nav style={{display:'flex', justifyContent:'flex-end'}}>
					<p onClick={()=>onRouteChange('signin')} className='f4 underline dim pointer pa3 link black'>Sign In</p>
				    <p onClick={()=>onRouteChange('register')} className='f4 underline dim pointer pa3 link black'>Register</p>
				</nav>
			);
		}
}

export default Navigation;