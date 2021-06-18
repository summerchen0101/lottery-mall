import { useToast } from '@chakra-ui/toast'

function useAlert() {
  const toast = useToast()
  return {
    success: (msg: string) =>
      toast({ status: 'success', title: msg, duration: 2000 }),
    warning: (msg: string) =>
      toast({ status: 'warning', title: msg, duration: 2000 }),
  }
}

export default useAlert
