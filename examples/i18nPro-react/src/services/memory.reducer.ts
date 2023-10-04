export interface MemoryUsage {
  memory: number;
  totalMemory: number
}
interface UpdateMemory {type: 'memory', payload: number}
interface UpdateTotalMemory {type: 'total_memory', payload: number}
type MemoryUsageAction = UpdateMemory | UpdateTotalMemory


export const memoryReducer = (state: MemoryUsage, action: MemoryUsageAction): MemoryUsage => {
  switch(action.type){
    case 'memory':
      return { ...state, memory: action.payload}
    case 'total_memory':
      return { ...state, totalMemory: action.payload}
    default:
      return state
  }
}