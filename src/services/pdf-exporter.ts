
import html2pdf from 'html2pdf.js';

export interface ExportOptions {
  title?: string;
  filename?: string;
}

export const exportToPdf = async (
  contentElement: HTMLElement,
  options: ExportOptions = {}
): Promise<void> => {
  const { title, filename = 'yellow-notes-export.pdf' } = options;

  // Clone the element to avoid modifying the original
  const element = contentElement.cloneNode(true) as HTMLElement;

  // Add title if provided
  if (title) {
    const titleElement = document.createElement('h1');
    titleElement.style.textAlign = 'center';
    titleElement.style.marginBottom = '20px';
    titleElement.textContent = title;
    element.insertBefore(titleElement, element.firstChild);
  }

  // Configure PDF options
  const opt = {
    margin: [15, 15],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  try {
    // Generate and download PDF
    await html2pdf().set(opt).from(element).save();
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
};
