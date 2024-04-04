import axios from 'axios';
import { useEffect, useState } from 'react';

import { ITechStackType } from '@/types/global';
import { getCookies } from '@/utils/getCookies';

const useSkillStackSearch = (text: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ITechStackType[]>([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.BASE_URL}/techStack`, {
          headers: { Authorization: getCookies('jwt') },
        });

        if (response.data.success) {
          setData(response.data.data);
        }
        setIsLoading(false);
      } catch (e) {
        setIsError(true);
      }
    };
    fetchData();
  }, []);

  return { isLoading, isError, data };
};

export default useSkillStackSearch;
