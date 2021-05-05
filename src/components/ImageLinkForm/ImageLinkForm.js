import React from 'react';

const ImageLinkForm=({onInputChange, onSubmit})=>
{
	return (
		<div>
			<p className='f3'>
				{'This Will detect Faces in your pictures. Give it a try!'}
			</p>
			<div className='center'>
				<div className='center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
					<button className='w-30 pointer hover grow f4 link ph3 pv2 dim white bg-light-purple' onClick={onSubmit}>Detect</button>
				</div>
			</div>
		</div>


		)

}

export default ImageLinkForm;