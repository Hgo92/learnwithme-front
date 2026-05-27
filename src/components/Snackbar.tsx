import { useSnackbar } from "notistack";

export default function useSnack() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  return (text: string, time?: number) => {
    enqueueSnackbar(text);
    setTimeout(
      () => {
        closeSnackbar();
      },
      time ? time : 4000,
    );
  };
}
