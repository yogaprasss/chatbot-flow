import Image from 'next/image';
import useRightSideBarHooks from './hooks';
import WhatsappIcon from '@/assets/whatsapp.svg';

import { FC } from 'react';
import { nodeOptions } from '@/helpers/options';

interface RightSideBarProps {
  onChangeNodeValue: (key: 'type' | 'data', value: any) => void;
}

const RightSideBar: FC<RightSideBarProps> = ({ onChangeNodeValue }) => {
  const {
    data: { type, data, selectedNode },
    methods: { onInputType, onInputData }
  } = useRightSideBarHooks();

  return (
    <div className='w-64 h-screen shadow-md bg-white px-4 pb-4 pt-16 text-gray-700 overflow-y-scroll'>
      <h1 className='font-bold'>Property</h1>
      <br />
      {!!selectedNode && (
        <>
          <div className='flex flex-col gap-2'>
            <p className='text-blue-900'>Channel</p>
            <div className='flex gap-2 items-center'>
              <Image src={WhatsappIcon} alt='whatsapp' width={16} height={16} />
              <p className='text-sm'>WhatsApp</p>
            </div>
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <p className='text-blue-900'>Template ID</p>
            <p className='text-sm'>{selectedNode.id}</p>
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label className='text-blue-900' htmlFor='nodeType'>Node Type</label>
            <select
              className='border border-gray-500 py-1 px-2.5 rounded-md text-sm'
              name='nodeType'
              value={type}
              onChange={onInputType(onChangeNodeValue)}
              disabled={selectedNode.type === 'defaultNode'}
            >
              {nodeOptions.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label className='text-blue-900' htmlFor='title'>Title</label>
            <input
              className='border border-gray-500 py-1 px-2.5 rounded-md text-sm'
              name='title'
              value={data?.title}
              onChange={onInputData('title', onChangeNodeValue)}
              disabled={selectedNode.type === 'defaultNode'}
            />
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label className='text-blue-900' htmlFor='description'>Description</label>
            <textarea
              className='border border-gray-500 py-1 px-2.5 rounded-md text-sm'
              name='description'
              value={data?.description}
              onChange={onInputData('description', onChangeNodeValue)}
              disabled={selectedNode.type === 'defaultNode'}
            />
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label className='text-blue-900' htmlFor='content'>Content</label>
            <textarea
              className='border border-gray-500 py-1 px-2.5 rounded-md text-sm'
              name='content'
              value={data?.content}
              onChange={onInputData('content', onChangeNodeValue)}
              disabled={selectedNode.type === 'defaultNode'}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideBar;
