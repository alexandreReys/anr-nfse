import Swal from 'sweetalert2';

export const showSnackbarError = (text: string): void => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'bg-gray-800 text-red-600 px-4 py-2 rounded',
    },
  });

  Toast.fire({
    icon: 'error',
    title: text,
  });
};

export const ShowProcessingCallback = (callback: () => void): void => {
  Swal.fire({
    icon: "success",
    title: "Processando ...",
    position: "top-end",
    background: "white",
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
  }).then(() => {
    callback();
  });
};
