import { useEffect, useState } from 'react'

function useCountdown(init: number) {
  const [countdown, setCountdown] = useState(init)
  useEffect(() => {
    setCountdown(init)
    const interval = setInterval(
      () => setCountdown((sec) => (sec ? sec - 1 : 0)),
      1000,
    )
    return () => {
      clearInterval(interval)
    }
  }, [init])
  return { countdown }
}

export default useCountdown
