import useRightSideBarHooks from './hooks';

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
    <div className='w-72 h-screen shadow-md bg-white p-4 text-gray-700'>
      <h1 className='font-bold'>Property</h1>
      <br />
      {!!selectedNode && (
        <>
          <div className='flex flex-col gap-2'>
            <label htmlFor='nodeType'>Node Type</label>
            <select
              className='border border-gray-500 py-1 px-2.5 rounded-md'
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
            <label htmlFor='title'>Title</label>
            <input
              className='border border-gray-500 py-1 px-2.5 rounded-md'
              name='title'
              value={data?.title}
              onChange={onInputData('title', onChangeNodeValue)}
            />
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label htmlFor='description'>Description</label>
            <textarea
              className='border border-gray-500 py-1 px-2.5 rounded-md'
              name='description'
              value={data?.description}
              onChange={onInputData('description', onChangeNodeValue)}
            />
          </div>
          <br />
          <div className='flex flex-col gap-2'>
            <label htmlFor='content'>Content</label>
            <textarea
              className='border border-gray-500 py-1 px-2.5 rounded-md'
              name='content'
              value={data?.content}
              onChange={onInputData('content', onChangeNodeValue)}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RightSideBar;
