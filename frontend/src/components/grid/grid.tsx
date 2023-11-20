import { useEffect, useRef, useState } from 'react';
import { pxToRem } from '../../utils/unit';
import Text from '../text/text';

interface GridProps {
  items: any[];
}

const calcNewIndex = (
  currentIndex: number,
  targetIndex: number,
  columns: number
) => {
  const currentRow = Math.floor(currentIndex / columns);
  const currentCol = currentIndex % columns;
  const targetRow = Math.floor(targetIndex / columns);
  const targetCol = targetIndex % columns;
  const xIndex = targetCol - currentCol;
  const yIndex = targetRow - currentRow;
  return [xIndex, yIndex];
};

const calcNewPosition = (
  xIndex: number,
  yIndex: number,
  width: number,
  height: number,
  gap: number
) => {
  const x = xIndex * (width + gap);
  const y = yIndex * (height + gap);
  return [x, y];
};

function Grid({ items }: GridProps) {
  const [oldItems, setOldItems] = useState(items);
  const [itemWidth, setItemWidth] = useState(0);
  const [itemHeight, setItemHeight] = useState(0);
  const [column, setColumn] = useState(0);
  const [gap, setGap] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      setItemWidth(
        pxToRem(gridRef.current.firstElementChild?.clientWidth || 0)
      );
      setItemHeight(
        pxToRem(gridRef.current.firstElementChild?.clientHeight || 0)
      );
      const gridComputedStyle = window.getComputedStyle(gridRef.current);
      const gridColumnCount = gridComputedStyle
        .getPropertyValue('grid-template-columns')
        .split(' ').length;
      setColumn(gridColumnCount);
      const gridColumnGap = pxToRem(
        Number(
          gridComputedStyle.getPropertyValue('column-gap').replace('px', '')
        )
      );
      setGap(gridColumnGap);
    }
  }, [gridRef]);

  useEffect(() => {
    setTimeout(() => {
      setOldItems(items);
    }, 200);
  }, [items]);

  const cards = oldItems.map((item, index) => {
    const newIndex = items.findIndex((id) => id === item);
    let x = 0;
    let y = 0;
    if (index !== newIndex && newIndex !== -1) {
      const [xIndex, yIndex] = calcNewIndex(index, newIndex, column);
      const calcedPosition = calcNewPosition(
        xIndex,
        yIndex,
        itemWidth,
        itemHeight,
        gap
      );
      [x, y] = calcedPosition;
    }

    return <Card text={item} key={`grid-card-${item}`} x={x} y={y} />;
  });

  return (
    <div className="grid grid-cols-3 gap-sm" ref={gridRef}>
      {cards}
    </div>
  );
}

function Card({ text, x, y }: { text: string; x: number; y: number }) {
  return (
    <div
      className={`flex h-[6rem] w-[6rem] items-center justify-center border-md border-text-primary bg-point-yellow ${
        (x || y) && 'smooth-transition'
      }`}
      style={{ transform: `translate(${x}rem, ${y}rem)` }}
    >
      <Text size={14}> {text}</Text>
    </div>
  );
}

export default Grid;
