import jsPDF from 'jspdf';
import axios from 'axios';
import { course } from '../../Axios/Urls/EndPoints';

const createAndUploadPDF = async () => {
  // Create a new instance of jsPDF
  const doc = new jsPDF();

  // Add some content to the PDF
  doc.text('Hello world!', 10, 10);

  // Convert the PDF to a blob
  const pdfBlob = doc.output('blob');

  // Create a form data to send the PDF to the backend
  const formData = new FormData();
  formData.append('pdf', pdfBlob, 'example.pdf');

  try {
    // Upload the PDF to the backend
    const response = await axios.post( `${course}upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response from the backend
    console.log('PDF uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading PDF:', error);
  }
};

// Call the function to create and upload the PDF
createAndUploadPDF();
