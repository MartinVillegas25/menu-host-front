// import { useState } from 'react';
// import QRcode from 'react-qr-code';
// import './QrGenerator.css';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import { useLocation } from 'react-router-dom';

// export default function QrGenerator() {
// 	const location = useLocation();
// 	const searchParams = new URLSearchParams(location.search);
// 	const email = searchParams.get('email');
// 	const [totalCodes, setTotalCodes] = useState(0);
// 	const [firstCode, setFirstCode] = useState(0);
// 	const [generate, setGenerate] = useState(false);
// 	const numbers = [];
// 	// Funcion para setear la cantidad de codigos QR a imprimir
// 	for (
// 		let i = parseInt(firstCode, 10);
// 		i <= parseInt(firstCode, 10) + parseInt(totalCodes, 10) - 1;
// 		i++
// 	) {
// 		numbers.push(i);
// 	}
// 	console.log(numbers);
// 	// Total de codigos para imprimir
// 	const handleChangeTotalCodes = (e) => {
// 		setTotalCodes(e.target.value);
// 	};
// 	// Primer numero de codigo a imprimir
// 	const handleChangeFirstCode = (e) => {
// 		setFirstCode(e.target.value);
// 	};

// 	const handleSubmit = (e) => {
// 		e.preventDefault();
// 		setGenerate(!generate);
// 	};
// 	// Funcion para setear y descargar los codigos Qr en pdf
// 	const handleDownloadPDF = () => {
// 		const qrCodeContainer = document.getElementById('qrCodeContainer');

// 		html2canvas(qrCodeContainer).then((canvas) => {
// 			const imgData = canvas.toDataURL('image/*');
// 			const pdf = new jsPDF('landscape', 'mm', 'a4');

// 			const qrCodeWidth = 70;
// 			const qrCodeHeight = 80;
// 			const columnSpacing = 0;
// 			const rowSpacing = 0;

// 			for (let i = 0; i < numbers.length; i++) {
// 				if (i % 8 === 0 && i !== 0) {
// 					pdf.addPage(); // Agrega una nueva página cada 8 códigos (4x2)
// 				}

// 				const columnIndex = i % 4;
// 				const rowIndex = Math.floor((i % 8) / 4);

// 				const xPosition = columnIndex * (qrCodeWidth + columnSpacing);
// 				const yPosition = rowIndex * (qrCodeHeight + rowSpacing);

// 				pdf.addImage(
// 					imgData,
// 					'PNG',
// 					xPosition,
// 					yPosition,
// 					qrCodeWidth,
// 					qrCodeHeight
// 				);
// 			}

// 			pdf.save('codigos_qr.pdf');
// 		});
// 	};

// 	return (
// 		<div>
// 			<div className="qr-amount-container">
// 				<form action="" onSubmit={handleSubmit} className="qr-amount-form">
// 					<div>
// 						<input
// 							type="number"
// 							placeholder="Cantidad de codigos a imprimir"
// 							onChange={handleChangeTotalCodes}
// 							max={15}
// 						/>
// 						<input
// 							type="number"
// 							placeholder="Numero de inicio "
// 							onChange={handleChangeFirstCode}
// 							max={15}
// 						/>
// 					</div>
// 					<button className="generate-qr-btn">Generar códigos</button>
// 					{generate && (
// 						<button onClick={handleDownloadPDF} className="generate-qr-btn">
// 							Descargar PDF
// 						</button>
// 					)}
// 				</form>
// 			</div>
// 			<div>
// 				{generate && (
// 					<div className="qr-code-container">
// 						{numbers.map((mesa, index) => (
// 							<div key={mesa} className="qrCode" id="qrCodeContainer">
// 								<div>
// 									<p>Mesa: {index + 1}</p>
// 									<QRcode
// 										value={`http://127.0.0.1:5173/menulocal?email=${email}&mesa=${mesa}`}
// 										className="qr"
// 									/>
// 								</div>
// 								{index % 2 !== 0 && <div className="clear-float"></div>}
// 							</div>
// 						))}
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	);
// }

import { useState, useEffect } from 'react';
import QRcode from 'react-qr-code';
import './QrGenerator.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useLocation } from 'react-router-dom';

export default function QrGenerator() {
	const location = useLocation();
	const searchParams = new URLSearchParams(location.search);
	const email = searchParams.get('email');
	const [totalCodes, setTotalCodes] = useState(0);
	const [firstCode, setFirstCode] = useState(0);
	const [generate, setGenerate] = useState(false);
	const [qrCodes, setQrCodes] = useState([]);

	useEffect(() => {
		setQrCodes(generateQRs());
	}, [totalCodes, firstCode]);

	const generateQRs = () => {
		const codes = [];
		for (
			let i = parseInt(firstCode, 10);
			i < parseInt(firstCode, 10) + parseInt(totalCodes, 10);
			i++
		) {
			codes.push(`http://127.0.0.1:5173/menulocal?email=${email}&mesa=${i}`);
		}
		return codes;
	};

	const handleChangeFirstCode = (e) => {
		setFirstCode(e.target.value);
	};

	const handleChangeTotalCodes = (e) => {
		setTotalCodes(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setGenerate(true);
	};

	const handleDownloadPDF = () => {
		const qrCodeContainer = document.getElementById('qrCodeContainer');
		const qrCodesToPrint = qrCodeContainer.getElementsByClassName('qrCode');

		const pdf = new jsPDF('landscape', 'mm', 'a4');
		const qrCodeWidth = 70;
		const qrCodeHeight = 80;
		const columnSpacing = 0;
		const rowSpacing = 0;

		let codesPrinted = 0;

		for (let i = 0; i < qrCodesToPrint.length; i++) {
			const qrCode = qrCodesToPrint[i];

			html2canvas(qrCode).then((canvas) => {
				const imgData = canvas.toDataURL('image/png');

				if (codesPrinted % 8 === 0) {
					if (codesPrinted !== 0) {
						pdf.addPage(); // Agrega una nueva página cada 8 códigos (4x2)
					}
				}

				const columnIndex = codesPrinted % 4;
				const rowIndex = Math.floor((codesPrinted % 8) / 4);

				const xPosition = columnIndex * (qrCodeWidth + columnSpacing);
				const yPosition = rowIndex * (qrCodeHeight + rowSpacing);

				pdf.addImage(
					imgData,
					'PNG',
					xPosition,
					yPosition,
					qrCodeWidth,
					qrCodeHeight
				);

				codesPrinted++;

				if (i === qrCodesToPrint.length - 1) {
					pdf.save('codigos_qr.pdf');
				}
			});
		}
	};

	return (
		<div>
			<div className="qr-amount-container">
				<form action="" onSubmit={handleSubmit} className="qr-amount-form">
					<div>
						<input
							type="number"
							placeholder="Cantidad de codigos a imprimir"
							onChange={handleChangeTotalCodes}
							max={15}
						/>
						<input
							type="number"
							placeholder="Numero de inicio"
							onChange={handleChangeFirstCode}
							max={15}
						/>
					</div>
					<button className="generate-qr-btn">Generar códigos</button>
					{generate && (
						<button onClick={handleDownloadPDF} className="generate-qr-btn">
							Descargar PDF
						</button>
					)}
				</form>
			</div>
			<div>
				{generate && (
					<div className="qr-code-container" id="qrCodeContainer">
						{qrCodes.map((url, index) => (
							<div key={url} className="qrCode">
								<div>
									<p>Mesa: {index + 1}</p>
									<QRcode value={url} className="qr" />
								</div>
								{index % 2 !== 0 && <div className="clear-float"></div>}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
