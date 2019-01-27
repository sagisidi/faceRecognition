import React from 'react';
import './FaceRecognition.css'

const FaceRecognition =  ({imageUrl,box}) =>{

	return (
		<div className="center ma">
			<div className="absolute mt2">
			{imageUrl !== ''?
				<img id="inputImage" alt="bla" src={imageUrl} width="500px" height="auto"/>
				:
				<div></div>
			}
			<div id="square" 
			style={{top:box.topRow,right:box.rightCol,left:box.leftCol,bottom:box.bottomRow}}>
			</div>			
			</div>

		</div>

	)

}

export default FaceRecognition;