import * as XLSX from "xlsx";

const exportToExcel = (data, fileName) => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Convert the array to a worksheet
  const worksheet = XLSX.utils.json_to_sheet(data);

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

// Example data array
const dataArray = [
  { name: "John", age: 30, city: "New York" },
  { name: "Jane", age: 25, city: "London" },
  { name: "Mike", age: 28, city: "Paris" },
];

// Trigger the download
const handleExport = () => {
  exportToExcel(dataArray, "UsersData");
};

export { handleExport };
