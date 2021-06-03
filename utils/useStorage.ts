import { useEffect, useState } from 'react'
import store from 'store2'

const useStorage = function <T>(
  name: string,
  initValue: T,
  type: 'local' | 'session' = 'session',
) {
  const [value, setValue] = useState<T>(store[type].get(name) ?? initValue)

  useEffect(() => {
    store[type].set(name, value)
  }, [value])
  return [value, setValue] as const
}

export default useStorage
