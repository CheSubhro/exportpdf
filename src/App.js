import {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'
import axios from 'axios';



function App() {

	const [data, setData] = useState([]);
	const doc = new jsPDF()

	const handleExportPDF = () =>{
		
		autoTable(doc, { html: '#user-table', bodyStyles: { fillColor: 'red' }, columnStyles: { 0: { fillColor: [172, 157, 230], halign: 'center' } } })
    	doc.save('user.pdf')
    	// console.log("Table Data Exported");
	}

	useEffect(() => {

		axios.get(`https://fakestoreapi.com/users`)
		  .then(response => {
			// console.log(response.data);
			setData(response.data)
		  })
		  .catch(error => {
			console.error('Error fetching data:', error);
		  });
	}, []);

	return (
		<>
			<Button
				variant="contained"
				color="primary"
				startIcon={<PictureAsPdfIcon />}
				onClick={handleExportPDF}
				style={{ marginTop: '20px' }}
			>
			Export as PDF
			</Button>

			<TableContainer component={Paper} style={{ marginTop: '20px' }} >
				<Table id="user-table" style={{ minWidth: '650px', borderCollapse: 'collapse' }}>
					<TableHead>
					<TableRow style={{ backgroundColor: '#00FFFF', color: 'white' }}>
						<TableCell>ID</TableCell>
						<TableCell>Username</TableCell>
						<TableCell>Phone</TableCell>
						<TableCell>City</TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{data.map((item) => (
						<TableRow key={item.id} style={{ borderBottom: '1px solid #ddd' }}>
							<TableCell>{item.id}</TableCell>
							<TableCell>{item.name.firstname} {item.name.lastname}</TableCell>
							<TableCell>{item.phone}</TableCell>
							<TableCell>{item.address.city}</TableCell>
					  </TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>					
		</>
	);
}

export default App;
