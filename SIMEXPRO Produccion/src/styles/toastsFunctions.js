import { toast } from 'react-toastify';

export const ToastSuccess = (message) => {
  toast.success(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

export const ToastWarning = (message) => {
  toast.warning(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//Error
export const ToastError = (message) => {
  toast.error(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}

export const ToastInfo = (message) => {
  toast.info(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}
//default
export const ToastDefault = (message) => {
  toast(message, {
    theme: 'dark',
    style: {
      backgroundColor: '#111827'
    },
    autoClose: 1500,
    closeOnClick: true
  });
}