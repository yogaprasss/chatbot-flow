import xss from 'xss';
import useSimulatorHooks from './hooks';

import { useEffect } from 'react';

import type { FC } from 'react';
import type { Node, Edge } from 'reactflow';
import type { NodeDataProps } from '@/helpers/types';

interface SimulatorProps {
  nodes: Node<NodeDataProps, string | undefined>[];
  edges: Edge<any>[]
}

const Simulator: FC<SimulatorProps> = ({ nodes, edges }) => {
  const {
    data: {
      chats,
      inputChat
    },
    methods: {
      initValues,
      onInputChat,
      onPressEnter,
      onSubmitChat
    }
  } = useSimulatorHooks();

  useEffect(() => {
    initValues(nodes, edges);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='z-30'>
      <div className='w-[315px] h-[560px] bg-blue-100 overflow-y-scroll'>
        <div className='w-full h-[500px] flex flex-col justify-end px-3 gap-4 !overflow-y-scroll'>
          {chats.map((chat, index) => {
            const position = chat.type === 'output' ? 'justify-start' : 'justify-end';
            const color = chat.type === 'output' ? 'bg-blue-300' : 'bg-green-300';

            return (
              <div key={`chat-${index+1}`} className={`w-full flex ${position}`}>
                <div className={`rounded-xl min-h-10 max-w-[200px] p-2 ${color}`}>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: xss(chat.content.replaceAll('\n', '<br />'))
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className='w-full h-[60px] px-3 py-2 flex items-center gap-4'>
          <input
            className='w-full border border-gray-700 rounded-[22px] bg-white px-2.5 py-1'
            placeholder='Type here'
            value={inputChat}
            onChange={onInputChat}
            onKeyDown={onPressEnter}
          />
          <button type='button' onClick={onSubmitChat}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
