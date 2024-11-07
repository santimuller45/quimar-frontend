import { jsPDF } from "jspdf";
import "jspdf-autotable";  // Importar autoTable para crear tablas

export const generateOrderPDF = (order, user) => {
    const doc = new jsPDF();

    // Configurar la fuente y tamaño
    doc.setFontSize(16);

    // Cargar logo desde la carpeta public o desde src (puedes usar cualquiera de las opciones previas)
    const logoPath = "/images/logo.png";  // Ruta del logo en la carpeta public
    const logoWidth = 40;  // Ancho del logo
    const logoHeight = 40; // Alto del logo
    const logoX = 20;      // Ubicar logo en la esquina superior izquierda
    const logoY = 10;      // Espacio desde el borde superior

    // Agregar el logo en la parte superior izquierda
    doc.addImage(logoPath, 'PNG', logoX, logoY, logoWidth, logoHeight);

    // Cambiar fuente y tamaño para "Distribuidora Quimar"
    doc.setFontSize(22);  // Aumentar el tamaño de la fuente para "Distribuidora Quimar"
    doc.setFont("helvetica", "bold");  // Poner en negrita

    // Agregar el texto "Distribuidora Quimar" al lado del logo
    const logoAndTextSpacing = 10; // Espacio entre el logo y el texto
    doc.text("Distribuidora Quimar", logoX + logoWidth + logoAndTextSpacing, logoY + 20); // Texto al lado del logo

    // Información del cliente y pedido
    doc.setFontSize(12); // Reducir tamaño de fuente para el resto de la información

    // N° Cliente y Nombre del Cliente (Izquierda)
    doc.text(`N° Cliente: ${user.userNumber}`, 20, 60);  // Número del cliente
    doc.text(`Cliente: ${user.name}`, 20, 70);  // Nombre del cliente

    // Fecha y Hora (Derecha)
    const formattedDate = `${order.orderDate.day}/${order.orderDate.month}/${order.orderDate.year}`;
    const formattedTime = `${order.orderDate.hour}:${order.orderDate.minute}:${order.orderDate.second}`;
    doc.text(`Fecha: ${formattedDate}`, 150, 60);  // Fecha del pedido (derecha)
    doc.text(`Hora: ${formattedTime}`, 150, 70);  // Hora del pedido (derecha)

    // Crear la tabla con los detalles del pedido
    const tableData = order.listaPedido.map(item => [
        item.codigo,       // Código
        item.name,         // Nombre del producto
        item.quantity,     // Cantidad
        `$${item.price}`,  // Precio
        `$${item.total}`   // Subtotal
    ]);

    // Configurar la tabla en el PDF
    doc.autoTable({
        head: [
            ['Código', 'Detalle', 'Cantidad', 'Precio Unidad', 'Subtotal']
        ],
        body: tableData,
        startY: 90,  // Empezar la tabla después de los 90mm (para evitar solapar con los títulos)
        margin: { top: 10 },
        theme: 'grid',
    });

    // Total del pedido (en negrita)
    const yPosition = doc.lastAutoTable.finalY + 10; // Posición donde empieza el total
    doc.setFontSize(18);  // Hacer el texto del total más grande
    doc.setFont("helvetica", "bold");  // Negrita para el total
    doc.text(`Total: $${order.totalAmount}`, 20, yPosition); // Total en negrita

    // Guardar el PDF con un nombre basado en el ID del pedido
    doc.save(`Pedido_${order.id}.pdf`);
};