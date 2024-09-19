import * as XLSX from "xlsx";

const exportToExcel = (form, data, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Extract field names from the form array
  const fields = form.map(field => field.text);

  // Prepare the data for export
  const exportData = [fields]; // Add headers as the first row

  Object.values(data).forEach(item => {
    const row = fields.map((field, index) => item[index] || '');
    exportData.push(row);
  });

  // Convert the array to a worksheet
  const worksheet = XLSX.utils.aoa_to_sheet(exportData);

  // Append the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Generate a buffer to export the workbook
  const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

  // Create a Blob from the buffer
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  // Create a download link
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${fileName}.xlsx`;

  // Append the link to the document and trigger the download
  document.body.appendChild(link);
  link.click();

  // Remove the link after download
  document.body.removeChild(link);
};

// Example usage:
const form = [
  { text: 'Your Email ?', isOptional: false, options: [] },
  { text: 'your name ?', isOptional: false, options: [] },
  { text: 'gender', isOptional: false, options: [] },
  { text: 'age', isOptional: true, options: [] }
];

const data = {
  0: {
    0: "ahmed@gmail.com",
    1: "ahmed",
    2: "male",
    3: "22",
    id: "ABWVNItzc12s0z8jK3oH",
    joinedAt: { seconds: 1726754738, nanoseconds: 490000000 }
  },
  1: {
    0: "sherif@gmail.com",
    1: "sherif",
    2: "male",
    3: "20",
    id: "zbVTfd1whm5Q7CypSJJT",
    joinedAt: { seconds: 1726754451, nanoseconds: 979000000 }
  }
};

// Call the function
// exportToExcel(form, data, "user_data");

export { exportToExcel };