import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useReport } from '../hooks/useReport';
import { useState, useMemo } from 'react';
import dayjs from 'dayjs';
import '../styles/report.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, PointElement, LineElement);

function Report() {
  // Calcular fechas por defecto: últimos 7 días excluyendo hoy
  const today = dayjs();
  const defaultEnd = today.subtract(1, 'day').format('YYYY-MM-DD');
  const defaultStart = today.subtract(7, 'day').format('YYYY-MM-DD');
  const [startDate, setStartDate] = useState(defaultStart);
  const [endDate, setEndDate] = useState(defaultEnd);

  const { data, loading, error } = useReport({ startDate, endDate });

  // Indicadores totales por campaña (solo datos filtrados y deduplicados por campaña-fecha)
  const indicadoresCampaña = useMemo(() => {
    const resumen = {};
    const seen = new Set();
    data.forEach(registro => {
      const nombreCampaña = registro.campaignName || 'Desconocida';
      const fecha = registro.date?.split('T')[0] || '';
      const clave = `${nombreCampaña}__${fecha}`;
      if (seen.has(clave)) return; // Ya contado para ese día
      seen.add(clave);
      if (!resumen[nombreCampaña]) {
        resumen[nombreCampaña] = { clicks: 0, spend: 0, conversions: 0, cr: 0, rows: 0 };
      }
      resumen[nombreCampaña].clicks += Number(registro.clicks) || 0;
      resumen[nombreCampaña].spend += Number(registro.spend) || 0;
      resumen[nombreCampaña].conversions += Number(registro.conversions) || 0;
      if (typeof registro.cr !== 'undefined') {
        resumen[nombreCampaña].cr += Number(registro.cr) || 0;
        resumen[nombreCampaña].rows += 1;
      }
    });
    // Promediar CR
    Object.values(resumen).forEach(r => {
      if (r.rows > 0) r.cr = r.cr / r.rows;
    });
    return resumen;
  }, [data]);

  // 1. Agrupar clicks por campaña para gráfico de barras (deduplicado por campaña-fecha)
  const clicksPorCampaña = {};
  const seenClicks = new Set();
  data.forEach(registro => {
    const nombreCampaña = registro.campaignName || 'Desconocida';
    const fecha = registro.date?.split('T')[0] || '';
    const clave = `${nombreCampaña}__${fecha}`;
    if (seenClicks.has(clave)) return;
    seenClicks.add(clave);
    clicksPorCampaña[nombreCampaña] = (clicksPorCampaña[nombreCampaña] || 0) + (Number(registro.clicks) || 0);
  });
  const etiquetasCampaña = Object.keys(clicksPorCampaña);
  const valoresClicks = etiquetasCampaña.map(c => clicksPorCampaña[c]);
  const datosBarra = {
    labels: etiquetasCampaña,
    datasets: [{
      label: 'Clicks por campaña',
      data: valoresClicks,
      backgroundColor: 'rgba(58,167,109,0.7)',
    }],
  };

  // 2. Gráfico de línea del spend por ad set y fecha (deduplicado por adSet-fecha)
  const spendPorAdSet = {};
  const seenSpend = new Set();
  data.forEach(registro => {
    const fecha = registro.date?.split('T')[0];
    const adSet = registro.adSetName || 'Desconocido';
    if (!fecha) return;
    const clave = `${adSet}__${fecha}`;
    if (seenSpend.has(clave)) return; // Ya sumado
    seenSpend.add(clave);
    if (!spendPorAdSet[adSet]) spendPorAdSet[adSet] = {};
    spendPorAdSet[adSet][fecha] = Number(registro.spend) || 0;
  });
  
  // Fechas únicas ordenadas (debe ir antes de datasetsSpend)
  const todasFechas = Array.from(new Set(data.map(r => r.date?.split('T')[0]).filter(Boolean))).sort();
  
  // Construir datasets para cada ad set
  const datasetsSpend = Object.entries(spendPorAdSet).map(([adSet, fechasObj]) => {
    const dataPorFecha = todasFechas.map(fecha => {
      return fechasObj[fecha] || 0;
    });
    return {
      label: adSet,
      data: dataPorFecha,
      borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      backgroundColor: 'rgba(255,193,7,0.1)',
      fill: false,
      tension: 0.3,
    };
  });
  
  const datosLineaSpend = {
    labels: todasFechas,
    datasets: datasetsSpend,
  };

  // 3. Gráfico de tendencia de tasa de conversión (%) por campaña y fecha usando el campo cr de la API
  // Agrupa por campaña y fecha (deduplicado por campaña-fecha, PROMEDIO de cr)
  const conversionPorCampaña = {};
  const seenCR = new Set();
  data.forEach(registro => {
    const fecha = registro.date?.split('T')[0];
    const campaña = registro.campaignName || 'Desconocida';
    if (!fecha) return;
    const clave = `${campaña}__${fecha}`;
    if (seenCR.has(clave)) return;
    seenCR.add(clave);
    if (!conversionPorCampaña[campaña]) conversionPorCampaña[campaña] = {};
    if (!conversionPorCampaña[campaña][fecha]) conversionPorCampaña[campaña][fecha] = { sumaConversion: 0, cantidad: 0 };
    if (typeof registro.cr !== 'undefined') {
      conversionPorCampaña[campaña][fecha].sumaConversion += Number(registro.cr) || 0;
      conversionPorCampaña[campaña][fecha].cantidad += 1;
    }
  });
  
  // Fechas únicas ordenadas
  const todasFechasConversion = Array.from(new Set(data.map(r => r.date?.split('T')[0]).filter(Boolean))).sort();
  
  // Construir datasets para cada campaña (usar promedio de cr)
  const datasetsConversion = Object.entries(conversionPorCampaña).map(([campaña, fechasObj]) => {
    const dataPorFecha = todasFechasConversion.map(fecha => {
      const entry = fechasObj[fecha];
      return entry && entry.cantidad > 0 ? entry.sumaConversion / entry.cantidad : null;
    });
    return {
      label: campaña,
      data: dataPorFecha,
      borderColor: '#' + Math.floor(Math.random()*16777215).toString(16),
      backgroundColor: 'rgba(131,91,252,0.1)',
      fill: false,
      tension: 0.3,
    };
  });
  
  const datosLineaConversion = {
    labels: todasFechasConversion,
    datasets: datasetsConversion,
  };

  function exportToCSV() {
    if (!data || data.length === 0) return;
    const keys = Object.keys(data[0]);
    const csvRows = [keys.join(',')];
    data.forEach(row => {
      const values = keys.map(k => {
        const val = row[k];
        if (typeof val === 'string' && (val.includes(',') || val.includes('"') || val.includes('\n')))
          return '"' + val.replace(/"/g, '""') + '"';
        return val ?? '';
      });
      csvRows.push(values.join(','));
    });
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `report_${startDate}_to_${endDate}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ background: '#f5f5fa', minHeight: '100vh', padding: '0 0 2rem 0' }}>
      {/* Encabezado y filtros */}
      <div className="report-header">
        <div style={{ flex: 1 }}>
          <h2 className="report-header-title">Report Dashboard</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <label className="report-date-range-label">Date range</label>
            <div className="report-date-inputs">
              <input
                type="date"
                value={startDate}
                max={endDate}
                onChange={e => setStartDate(e.target.value)}
              />
              <span style={{ color: '#888', fontWeight: 500 }}>to</span>
              <input
                type="date"
                value={endDate}
                min={startDate}
                max={defaultEnd}
                onChange={e => setEndDate(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="report-header-buttons">
          <button
            className="report-header-btn filter"
            onClick={() => { /* Aquí puedes disparar el filtrado si lo necesitas */ }}
          >
            Filter
          </button>
          <button
            className="report-header-btn export"
            onClick={exportToCSV}
          >
            Export
          </button>
        </div>
      </div>
      {/* Indicadores y gráficos */}
      <div className="report-main">
        {/* Indicadores totales por campaña */}
        <div className="report-indicadores">
          {Object.entries(indicadoresCampaña).map(([campaña, vals]) => (
            <div key={campaña} className="report-indicador-card">
              <h4>{campaña}</h4>
              <div><b>Clicks:</b> {vals.clicks}</div>
              <div><b>Spend:</b> ${vals.spend.toFixed(2)}</div>
              <div><b>Conversions:</b> {vals.conversions}</div>
              <div><b>CR:</b> {vals.cr ? (vals.cr * 100).toFixed(2) + '%' : '-'}</div>
            </div>
          ))}
        </div>
        <div className="report-graficos-scroll">
          {!loading && !error && data.length > 0 && (
            <>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ color: '#3aa76d' }}>Clicks per Campaign</h3>
                <Bar 
                  data={datosBarra} 
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { display: false } 
                    } 
                  }} 
                />
              </div>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ color: '#ffc107' }}>Spend por Ad Set (línea)</h3>
                <Line 
                  data={datosLineaSpend} 
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { position: 'top' } 
                    }, 
                    scales: { 
                      x: { 
                        title: { display: true, text: 'Fecha' } 
                      }, 
                      y: { 
                        title: { display: true, text: 'Spend' } 
                      } 
                    } 
                  }} 
                />
              </div>
              <div style={{ marginBottom: 40 }}>
                <h3 style={{ color: '#835bfc' }}>Conversion Rate (%)</h3>
                <Line 
                  data={datosLineaConversion} 
                  options={{ 
                    responsive: true, 
                    plugins: { 
                      legend: { position: 'top' } 
                    }, 
                    scales: { 
                      x: { 
                        title: { display: true, text: 'Fecha' } 
                      }, 
                      y: { 
                        title: { display: true, text: 'Conversión (%)' } 
                      } 
                    } 
                  }} 
                />
              </div>
            </>
          )}
          {!loading && !error && data.length === 0 && (
            <p style={{ textAlign: 'center', color: '#888' }}>
              No data available for the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Report;