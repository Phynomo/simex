import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { FormControl, Icon, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Navigate, useNavigate } from 'react-router-dom';

import 'jspdf-autotable';

// function ImpresionBoletinDePago() {
//     // creamos el documento PDF
//     const doc = new jsPDF();
//     const Navigate = useNavigate();



//     // Se le agrega una imagen el documento 
//     doc.addImage('https://i.ibb.co/JCWWQkJ/imagen-2023-07-18-074808012.png', 'JPEG', 10, 10, 190, 300);

//     const pdfUrl = doc.output('dataurl');
//     // mostramos el documento PDF en un iframe
//     return (
        // <Card sx={{ minWidth: 275, margin: '40px' }}>

        //     <Grid container spacing={2} style={{ marginTop: '10px' }}>
        //         <Grid item xs={1}></Grid>
        //         <Stack direction="row" spacing={1}>
        //             <Button
        //                 startIcon={<Icon>arrow_back</Icon>}
        //                 variant="contained"
        //                 color="primary"
        //                 style={{ borderRadius: '10px' }}
        //                 sx={{
        //                     backgroundColor: '#797979', color: 'white',
        //                     "&:hover": { backgroundColor: '#b69999' },
        //                 }}
        //                 onClick={(e) => {
        //                     Navigate("/BoletindePago/BoletinDePagoIndex");
        //                 }}
        //             >
        //                 Regresar
        //             </Button>
        //         </Stack>
        //         <Grid item xs={1}></Grid>
        //     </Grid>

        //     <div style={{ height: '100vh', marginTop: '10px' }}>
        //         <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
        //     </div>
        // </Card>

//     );
// }

// export default ImpresionBoletinDePago;



function PDFDocument() {
    // creamos el documento PDF
    const doc = new jsPDF();
    const Navigate = useNavigate();

    const header = function (data) {
      doc.setFont('arial');
      doc.setFontSize(15);
      const pageWidth = doc.internal.pageSize.width;
      doc.setTextColor(10);
    
    //Agregar Qr
    doc.addImage('https://i.ibb.co/bB5cgzk/Comprobante.jpg', 'JPG',  pageWidth-199,10, 30, 30);
    
    //Agregar imagen
    doc.addImage('https://i.ibb.co/wB2jBvV/SIMEXPRO-V3-JPG.jpg', 'JPG',  pageWidth-41,10, 30, 30);
      
    
      // Agregar texto
      doc.text("Administración Aduanera de Honduras", data.settings.margin.left + 50, 24);
      doc.text("Boletín de Pago", data.settings.margin.left + 76, 30);
      doc.text("004 - Aduana de Puerto Cortés", data.settings.margin.left + 60, 36);
    };

    const footer = function (data) {
      const pageCount = doc.internal.getNumberOfPages();
      const currentPage = data.pageNumber;
      const pageWidth = doc.internal.pageSize.width;
      const date = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const text = `Documento generado por SIMEXPRO el ${date}`;
      const textWidth = doc.getTextWidth(text);
      const textX = (pageWidth*1.3) - textWidth;
      doc.setFontSize(8);
      doc.text(`Página ${currentPage}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
      doc.text(text, textX, doc.internal.pageSize.height - 10);
    };
      
  //  doc.autoTableAddPage({
  //    addPageContent: header,
  //  });

  // añadimos contenido al PDF utilizando jspdf-autotable
  doc.autoTable({
    columnStyles: { europe: { halign: 'left', textColor: '#1a1a1a' },
                    america: { halign: 'left', textColor: '#1a1a1a' },
                    asia: { halign: 'left', textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'Liquidación : 1565484561465', asia: 'Declaración No.   0261545664546' },
        { europe: 'Tipo de Liquidación : AUTOLIQUIDACIÓN                           ', america: 'Mexico', asia: 'Importador/Exportador: Galindo Benito Carlos - 0501200102568' },
        { europe: 'Fecha de Emisión : 26/05/2019    Estado: REGISTRADA', america: '', asia: 'PreImpreso:  CHEP220062808M' },
        { europe: 'Observaciones:                                                                                                                 ', america: 'Mexico', asia: 'Declarante: 01031978006357 -Cortez Costabrava de Juanita Elizabeth Carmen' },
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '100', font: 'verdana', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 55,
            theme: 'grid',
        // head: [['Id: ', 'Liquidación: ','Tipo de Liquidación: ']],
        // body: data.map((row) => [
        //   row.id,
        //   row.liquidacion,
        //   row.tipoliquidacion,
        //   new Date().toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric'}),
        // ]),
        
    
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'left', textColor: '#1a1a1a' }, 
                    asia: { halign: 'left', textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'Boletín No. : 1565484561465', asia: 'Declaración No.   0261545664546' },
      ],
      columns: [
        { header: '', dataKey: 'europe' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', font: 'calirbi', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 110,
            theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'left', cellWidth: 24, textColor: '#1a1a1a' },
                    asia: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    america: { halign: 'left', cellWidth: 40, textColor: '#1a1a1a' },
                    nose1: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    oceania: { halign: 'left', cellWidth: 45, textColor: '#1a1a1a' },
                    antartida: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    africa: { halign: 'left', cellWidth: 33, textColor: '#1a1a1a' },
                    nose2: { halign: 'center', cellWidth: 9.8, textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'Periodo ', asia: '2', america: '12-2022', nose1:'5', oceania: 'Código Impuesto', antartida:'18', africa: '800', nose2: '3'},
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
        { header: '', dataKey: 'america' },
        { header: '', dataKey: 'nose1' },
        { header: '', dataKey: 'oceania' },
        { header: '', dataKey: 'antartida' },
        { header: '', dataKey: 'africa' },
        { header: '', dataKey: 'nose2' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', font: 'calirbi', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 120,
            theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'left', cellWidth: 24, textColor: '#1a1a1a' },
                    asia: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    america: { halign: 'left', cellWidth: 40, textColor: '#1a1a1a' },
                    nose1: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    oceania: { halign: 'left', cellWidth: 45, textColor: '#1a1a1a' },
                    antartida: { halign: 'center', cellWidth: 10, textColor: '#1a1a1a' },
                    africa: { halign: 'left', cellWidth: 33, textColor: '#1a1a1a' },
                    nose2: { halign: 'center', cellWidth: 9.8, textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'R.T.N ', asia: '4', america: '05012001025682022', nose1:'3', oceania: 'Código Concepto de pago', antartida:'19', africa: '1', nose2: '2'},
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
        { header: '', dataKey: 'america' },
        { header: '', dataKey: 'nose1' },
        { header: '', dataKey: 'oceania' },
        { header: '', dataKey: 'antartida' },
        { header: '', dataKey: 'africa' },
        { header: '', dataKey: 'nose2' },
      ],
      styles: {overflow: 'linebreak', columnWidth: 'wrap', font: 'arial', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak', colSpan: 2, rowSpan: 2, styles: { halign: 'center' }, 0: {columnWidth: '40'}},
            startY: 129,
            theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center', font: 'arial', textColor: '#1a1a1a'}}, // European countries centered
      body: [
        { europe: 'Detalles de Liquidación', asia: '' },
      ],
      columns: [
        { header: '', dataKey: 'europe' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 138,
            theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'center', cellWidth: 64, font: 'verdana', textColor: '#1a1a1a' },
                    asia: { halign: 'center', cellWidth: 35, font: 'verdana', textColor: '#1a1a1a'},
                    america: { halign: 'center', cellWidth: 28, font: 'verdana', textColor: '#1a1a1a' },
                    nose1: { halign: 'center', cellWidth: 41, font: 'verdana', textColor: '#1a1a1a' },
                    oceania: { halign: 'center', cellWidth: 13.8, font: 'verdana', textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'Concepto', asia: 'Tipo Oligación', america: 'Cuenta PA01', nose1:'Total Pagar/Garantizar', oceania: ' - '},
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
        { header: '', dataKey: 'america' },
        { header: '', dataKey: 'nose1' },
        { header: '', dataKey: 'oceania' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 148,
            theme: 'grid',
  })
  doc.autoTable({
    columnStyles: { europe: { halign: 'left', cellWidth: 64, font: 'verdana', textColor: '#1a1a1a' },
                    asia: { halign: 'center', cellWidth: 35, font: 'verdana', textColor: '#1a1a1a' },
                    america: { halign: 'center', cellWidth: 28, font: 'verdana', textColor: '#1a1a1a' },
                    nose1: { halign: 'right', cellWidth: 41, font: 'verdana', textColor: '#1a1a1a' },
                    oceania: { halign: 'center', cellWidth: 13.8, font: 'verdana',textColor: '#1a1a1a' }}, // European countries centered
      body: [
        { europe: 'ISV IMPUESTO SOBRE VENTAS', asia: 'P-A PAGAR', america: '11306', nose1:'30,556.09', oceania: ' - '},
        { europe: 'SEL IMPUESTO SELECTIVO AL PRODUCTO', asia: 'P-A PAGAR', america: '11310', nose1:'26,570.52', oceania: ' - '},
        { europe: 'ECO ECOTASA', asia: 'P-A PAGAR', america: '11416', nose1:'5,000.00', oceania: ' - '},
        { europe: 'DAI DERECHOS ARANCELARIOS A LA IMPORTACION', asia: 'P-A PAGAR', america: '11502 PA01', nose1:'0.00', oceania: ' - '},
        { europe: 'STD SERVICIO DE TRANSPORTE DE DATOS', asia: 'P-A PAGAR', america: '15218', nose1:'123.01', oceania: ' - '},
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
        { header: '', dataKey: 'america' },
        { header: '', dataKey: 'nose1' },
        { header: '', dataKey: 'oceania' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 158,
            theme: 'grid',
  })

  doc.autoTable({
    columnStyles: { europe: { halign: 'right', cellWidth: 127, font: 'verdana', textColor: '#1a1a1a' },
                    asia: { halign: 'right', cellWidth: 41, font: 'verdana', fontStyle: 'bold'},
                    america: { halign: 'center', cellWidth: 13.8, font: 'verdana', fontStyle: 'bold'}}, // European countries centered
      body: [
        { europe: 'Total a Pagar', asia: '62,249.62', america: ' - '},
        { europe: 'Total a Garantizar', asia: '0.00', america: ' - '},
      ],
      columns: [
        { header: '', dataKey: 'europe' },
        { header: '', dataKey: 'asia' },
        { header: '', dataKey: 'america' },
      ],
      styles: {overflow: 'linebreak', columnWidth: '20', fontSize: 10, cellPadding: 3, overflowColumns: 'linebreak'},
            startY: 220.5,
            theme: 'grid',

            didDrawPage: function (data) {
              header(data);
              // agregamos la paginación
              footer(data);
            },
            margin: { top: 45, bottom:30 } 
  })
  

  // obtenemos una URL del PDF para mostrarlo en un iframe
  const pdfUrl = doc.output('dataurl');

  // mostramos el documento PDF en un iframe
  return (

    <Card sx={{ minWidth: 275, margin: '40px' }}>

            <Grid container spacing={2} style={{ marginTop: '10px' }}>
                <Grid item xs={1}></Grid>
                <Stack direction="row" spacing={1}>
                    <Button
                        startIcon={<Icon>arrow_back</Icon>}
                        variant="contained"
                        color="primary"
                        style={{ borderRadius: '10px' }}
                        sx={{
                            backgroundColor: '#797979', color: 'white',
                            "&:hover": { backgroundColor: '#b69999' },
                        }}
                        onClick={(e) => {
                            Navigate("/BoletindePago/BoletinDePagoIndex");
                        }}
                    >
                        Regresar
                    </Button>
                </Stack>
                <Grid item xs={1}></Grid>
            </Grid>

            <div style={{ height: '100vh', marginTop: '10px' }}>
                <iframe src={pdfUrl} style={{ width: '100%', height: '100%' }} />
            </div>
        </Card>
  );
}

export default PDFDocument;