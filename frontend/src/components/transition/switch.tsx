import { useEffect, useRef, useState } from 'react'
import {
  leftFadeinAnimation,
  leftFadeoutAnimation,
  rightFadeinAnimation,
  rightFadeoutAnimation,
  topFadeinAnimation,
  topFadeoutAnimation,
  bottomFadeinAnimation,
  bottomFadeoutAnimation,
} from './animation'

interface TransitionProps {
  children: React.ReactNode
  width: number
  height: number
  classList?: string
  direction?: 'right' | 'left' | 'bottom' | 'top'
  dynamic?: any
}

const Switch = ({
  children,
  width,
  height,
  classList = '',
  direction = 'right',
  dynamic,
}: TransitionProps) => {
  const [currIndex, setCurrIndex] = useState<number>(0)
  const [children1, setChildren1] = useState<React.ReactNode>(null)
  const [children2, setChildren2] = useState<React.ReactNode>(null)
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currIndex === 0) {
      setCurrIndex(1)
      setChildren1(children)
      if (ref1.current && ref2.current) {
        if (direction === 'right') {
          // @ts-ignore
          ref1.current.animate(...rightFadeinAnimation)
          // @ts-ignore
          ref2.current.animate(...rightFadeoutAnimation)
        } else if (direction === 'left') {
          // @ts-ignore
          ref1.current.animate(...leftFadeinAnimation)
          // @ts-ignore
          ref2.current.animate(...leftFadeoutAnimation)
        } else if (direction === 'bottom') {
          // @ts-ignore
          ref1.current.animate(...bottomFadeinAnimation)
          // @ts-ignore
          ref2.current.animate(...bottomFadeoutAnimation)
        } else if (direction === 'top') {
          // @ts-ignore
          ref1.current.animate(...topFadeinAnimation)
          // @ts-ignore
          ref2.current.animate(...topFadeoutAnimation)
        }
        ref2.current.addEventListener('animationend', () => {
          setChildren2(null)
        })
      }
    } else {
      setCurrIndex(0)
      setChildren2(children)
      if (ref1.current && ref2.current) {
        if (direction === 'right') {
          // @ts-ignore
          ref1.current.animate(...rightFadeoutAnimation)
          // @ts-ignore
          ref2.current.animate(...rightFadeinAnimation)
        } else if (direction === 'left') {
          // @ts-ignore
          ref1.current.animate(...leftFadeoutAnimation)
          // @ts-ignore
          ref2.current.animate(...leftFadeinAnimation)
        } else if (direction === 'bottom') {
          // @ts-ignore
          ref1.current.animate(...bottomFadeoutAnimation)
          // @ts-ignore
          ref2.current.animate(...bottomFadeinAnimation)
        } else if (direction === 'top') {
          // @ts-ignore
          ref1.current.animate(...topFadeoutAnimation)
          // @ts-ignore
          ref2.current.animate(...topFadeinAnimation)
        }
        ref1.current.addEventListener('animationend', () => {
          setChildren1(null)
        })
      }
    }
  }, [dynamic || children])

  return (
    <div className={`relative ${classList}`} style={{ width, height }}>
      <div ref={ref1} className={`absolute`} style={{ width, height }}>
        {children1}
      </div>
      <div ref={ref2} className={`absolute`} style={{ width, height }}>
        {children2}
      </div>
    </div>
  )
}

export default Switch
