import React from 'react'

export default function useLocalStorage(key, initialValue) {
    const PREFIX = 'chat-frontend-'
    const prefixedKey = PREFIX + key
    const [value, setValue] = React.useState(() => { 
        const jsonValue = localStorage.getItem(prefixedKey)
         if (jsonValue !== null) return JSON.parse(jsonValue)
        if (typeof initialValue === 'function') {
           return initialValue()
        } else {
            return initialValue
       }
    })

    React.useEffect(() => {
        localStorage.setItem(prefixedKey, JSON.stringify(value))
    }, [prefixedKey, value])
  return [value, setValue]
}
