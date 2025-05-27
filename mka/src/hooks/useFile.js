import { useState } from 'react';

export function useFile() {
  const [file, setFile] = useState(null);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar archivo CSV y leer su contenido como texto
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setLoading(true);
    setError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setContent(event.target.result);
      setLoading(false);
    };
    reader.onerror = () => {
      setError('Error reading file');
      setLoading(false);
    };
    reader.readAsText(selectedFile);
  };

  // Limpiar estado
  const reset = () => {
    setFile(null);
    setContent('');
    setError(null);
    setLoading(false);
  };

  return {
    file,
    content,
    loading,
    error,
    handleFileChange,
    reset,
  };
}
