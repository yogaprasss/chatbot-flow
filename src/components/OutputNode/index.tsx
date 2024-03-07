import Image from 'next/image';
import useCustomNodeHooks from '../hooks';
import CopyIcon from '@/assets/copy-output.svg';

import { FC } from 'react';
import { Handle, Position } from 'reactflow';

import type { NodeProps } from 'reactflow';
import type { NodeDataProps } from '@/helpers/types';

const handleStyle = {
  width: '10px',
  height: '10px',
  cursor: 'pointer',
}

const OutputNode: FC<NodeProps<NodeDataProps>> = ({ id, type, xPos, yPos, data }) => {
  const {
    data: { isShowHandleLabel },
    methods: { onClickHandle, onMouseEnter, onMouseLeave }
  } = useCustomNodeHooks();

  return (
    <div className='bg-red-100 rounded-lg w-56 min-h-20'>
      <div className='text-[8px] bg-red-200 w-full px-2.5 py-1 rounded-t-lg text-red-500 border-b border-red-300'>
        Output
      </div>
      <Handle type='target' position={Position.Top} style={handleStyle} />
      <div className='p-2.5'>
        <div className='bg-white min-h-8 rounded-sm'>
          <div className='flex py-1 px-2 gap-2.5'>
            <h1 className='font-serif text-lg font-bold leading-4'>T</h1>
            <p className='text-xs text-left'>
              {data?.content}
            </p>
          </div>
        </div>
        <div className='mt-2 flex justify-between'>
          <p className='text-red-500 text-[8px]'>
            {id}
          </p>
          <button>
            <Image src={CopyIcon} alt='' width={10} height={10} />
          </button>
        </div>
      </div>
      <div>
        <Handle
          type='source'
          position={Position.Bottom}
          style={handleStyle}
          onClick={onClickHandle(id, type, xPos, yPos, data)}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        />
        {isShowHandleLabel && (
          <p className='absolute top-[calc(100%-16px)] left-1/2 -translate-x-1/2 text-[8px]'>
            Add Nodes
          </p>
        )}
      </div>
    </div>
  );
};

export default OutputNode;
