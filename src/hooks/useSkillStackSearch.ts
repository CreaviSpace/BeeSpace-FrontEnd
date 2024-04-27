import axios from 'axios';
import { useEffect, useState } from 'react';

import { ITechStackType } from '@/types/global';
import { getCookies } from '@/utils/getCookies';
import { postCookies } from '@/utils/postCookies';

const useSkillStackSearch = (text: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ITechStackType[]>([]);
  const [isError, setIsError] = useState(false);
  const token = getCookies('jwt');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!token) {
          return;
        }

        const response = await axios.get(`${process.env.BASE_URL}/techStack`, {
          headers: { Authorization: token },
        });

        if (response.status === 200 && response.data.success) {
          setData(response.data.data);
        } else if (response.status === 202 && !response.data.success) {
          postCookies({
            jwt: response.data.jwt,
            memberId: response.data.memberId,
          });
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
