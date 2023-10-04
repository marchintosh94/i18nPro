import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import css from './speedometer.module.css'

interface SpeedometerProps {
  size: 'sm' | 'md' | 'lg' | 'xl';
  range: [number, number];
  value: number;
}

const Speedometer = ({size, children, range, value}: PropsWithChildren<SpeedometerProps>) => {
  const [rotation, setRotation] = useState(-90)
  const _size = useMemo(() => {
    switch(size){
      case 'sm':
        return { value: 50, class: 'h-[50px] w-[50px]'}
      case 'md':
        return { value: 100, class: 'h-[80px] sm:h-[100px] w-[80px] sm:w-[100px]'}
      case 'lg':
        return { value: 200, class: 'h-[150px] sm:h-[200px] w-[150px] sm:w-[200px]'}
      case 'xl':
        return { value: 300, class: 'h-[200px] sm:h-[300px] w-[200px] sm:w-[300px]'}
    }
  }, [size])
  const dotSize = useMemo(() => {
    return (_size?.value || 0) * 0.06
  }, [_size])

  useEffect(() =>{
    const newRotation = (value * 100) / range[1]
    const a = (180 * newRotation) / 100 
    setRotation(a - 90)
  }, [value])

  return (
    <div className={`p-5 overflow-hidden ${_size?.class}`}>
      <div className="relative h-full w-full">
        <div className={css['range-line']}></div>
        <div className={css['dot-container']} style={{transform: `rotate(${rotation}deg)`}}>
          <div className={`${css.dot}`} style={{width: `${dotSize}px`, height: `${dotSize}px`}}></div>
        </div>
        <div className={css['value-box']}>
          {children}
        </div>
        <p className={css['range-start']}>
            {range[0]}
        </p>
        <p className={css['range-end']}>
            {range[1]}
        </p>
      </div>
    </div>
  )
}

export default Speedometer