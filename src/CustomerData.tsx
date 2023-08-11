import React,{useState,useEffect} from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';


interface packData{
	ingredient:string;
	inventory_code:string;
	quantity:string;
	unit:string;
}


interface productData {
	id:string;
	customer_id:string,
	pack_data:packData[]
}


const CustomerData = () => {
	
	const [data, setData] :any[] = useState([]);
	const [loading,setLoading] = useState(true);
	const [error,setError] = useState(false);
	
	useEffect(()=>{
		const apiCall = async() => {
			const data = await fetch('https://6466e9a7ba7110b663ab51f2.mockapi.io/api/v1/pack1')
			.then(res=>res.json())
			.catch(e=>{
				setError(true);
				
			});
			
			if( data?.length>0)  setLoading(false);
			
			if(data?.length>0)setData([...data]);
		}

		apiCall();


	},[]);
		
		return (
			<div>
			{loading && <Typography variant='h2'>Loading...</Typography>}
			<br/>
			{error && <Typography variant='h2'>Sorry Network issue..</Typography>}
			{data?.length>0 && 
			 <TableContainer component={Paper} className='xnara__container'>
			
			
       			<Table sx={{ maxWidth: '800px' }} className='xnara__table' aria-label="simple table">
	         	<TableHead>
		         
		           <TableRow >
		             <TableCell rowSpan={2} >Customer ID</TableCell>
		              <TableCell colSpan={4} align='center'>Pack Data</TableCell>
		             
				           
	           
			           </TableRow>
			           
			           <TableRow >

			           <TableCell align="right">Ingredient</TableCell>
			             <TableCell align="right">Inventory Code</TableCell>
			             <TableCell align="right">Quantity</TableCell>
			             <TableCell align="right">Unit</TableCell>
			           </TableRow>
			           
			           
			         </TableHead>
			         <TableBody>
			           {data?.map((val:productData) => (
			           	<>
			             <TableRow
			               key={val.id}
			               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
			             >
			               <TableCell rowSpan={Object.keys(val.pack_data).length +1} align='left'>
			                 {val.customer_id}
			               </TableCell>
			              </TableRow>
		               {val.pack_data.map((pack_data: packData)=>(
		               	<TableRow>
		               <TableCell align="right">{pack_data.ingredient}</TableCell>
		               <TableCell align="right">{pack_data.inventory_code}</TableCell>
		               <TableCell align="right">{pack_data.quantity}</TableCell>
		               <TableCell align="right">{pack_data.unit}</TableCell>
		               
		             </TableRow>

		               	))}


               			</>
             				
			           )
			           )}

			         </TableBody>
			       </Table>
			     </TableContainer>
			 }
					 
			     </div>
						
					)
					
				
			}

export default CustomerData;


