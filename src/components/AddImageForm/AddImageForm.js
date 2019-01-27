import React from 'react';
import './AddImageForm.css'
const AddImageForm =  ({location,inputChange,onSubmit}) =>{
	return (
		<div >
			<p className="center">
				Try our face recognition and Add your image
			</p>
			<div className="center">
				<div className=" grow pa4 br4 shadow-5 center" >
					<input type="text" className="pa2 w-60 center"  onChange={inputChange}/>
					<button className="pa2 w-30 bg-light-purple changebg" onClick={onSubmit} >
					{'Detect'}
					</button>
				</div>
			</div>
		</div>


	)

}

export default AddImageForm;