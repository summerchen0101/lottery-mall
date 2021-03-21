import React, { useEffect, useRef, useState } from 'react'

function useCountdown(initNum: number) {
  const [count, setCount] = useState(initNum)
  const countDown = () => setCount((c) => c - 1)
  const interval = useRef(null)

  useEffect(() => {
    interval.current = setInterval(countDown, 1000)
    return () => {
      clearInterval(interval.current)
    }
  }, [])

  useEffect(() => {
    if (count <= 0) {
      clearInterval(interval.current)
    }
  }, [count])

  const initCount = () => {
    clearInterval(interval.current)
    setCount(initNum)
    interval.current = setInterval(countDown, 1000)
  }

  return { count, initCount }
}

export default useCountdown
