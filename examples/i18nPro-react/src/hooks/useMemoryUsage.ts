import { useEffect, useReducer } from "react"
import { MemoryUsage, memoryReducer } from "../services/memory.reducer"

const initialState: MemoryUsage = {
  memory: 0,
  totalMemory: 0
}

export const useMemoryUsage = (decimal: number = 3) => {
  const [state, dispatch] = useReducer(memoryReducer, initialState)
  const calculateMegaBytes = (bytes: number, decimal: number = 3) => {
    const memoryMegaByte =  bytes / (1024 * 1024)  
    const memoryMBFixed =  memoryMegaByte.toFixed(decimal)
    return Number(memoryMBFixed)
  } 

  useEffect(() => {
    const timer = setInterval(() => {
      const memoryBytes = (window.performance as any).memory?.usedJSHeapSize || 0
      const memoryMegaByte = calculateMegaBytes(memoryBytes, decimal)
      dispatch({type: 'memory', payload: memoryMegaByte})
    }, 800)

    const totByte = (window.performance as any).memory?.jsHeapSizeLimit || 0

    dispatch({type: 'total_memory', payload: calculateMegaBytes(totByte, decimal)})

    return () => {
      clearInterval(timer)
    }
  }, [])



  return {
    ...state
  }

}