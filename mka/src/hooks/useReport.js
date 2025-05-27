import { useState, useEffect } from 'react';
import { getReportApi } from '../api/api';

export function useReport({ startDate, endDate, campaignId, platformId, region }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getReportApi({ startDate, endDate, campaignId, platformId, region });
        setData(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
    // eslint-disable-next-line
  }, [startDate, endDate, campaignId, platformId, region]);

  return { data, loading, error };
}
