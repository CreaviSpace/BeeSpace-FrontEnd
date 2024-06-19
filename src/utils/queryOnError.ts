import { toast } from 'react-toastify';

import { errorMessages } from '@/constants/messages';

export const queryOnError = (cookie: string, error: Error) => {
  if (!cookie) {
    toast.error(errorMessages.AUTH_TOKEN_EXPIRED);
  } else {
    toast.error(errorMessages.UNEXPECT_ERROR);
  }
  console.error(error);
};
