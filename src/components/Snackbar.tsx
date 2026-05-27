import { useSnackbar } from "notistack";

export default function useSnack() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (text: string) => {
    enqueueSnackbar(text);
    setTimeout(() => {
      closeSnackbar();
    }, 4000);
  };
}
