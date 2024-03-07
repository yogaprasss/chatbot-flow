import { FC, useContext } from 'react';
import { NodeSelectionContext } from '@/pages/_app';

import type { Node } from 'reactflow';
import type { NodeDataProps } from '@/helpers/types';

interface LeftSideBarProps {
  nodes: Node<NodeDataProps>[];
}

const indicatorBg = (type: string) => {
  if (type === 'defaultNode') return 'bg-blue-200';
  if (type === 'inputNode') return 'bg-green-200';
  if (type === 'outputNode') return 'bg-red-200';
  return 'bg-white';
}

const activeNodeClassName = 'bg-[#fafaff] rounded-md cursor-default';

const LeftSideBar: FC<LeftSideBarProps> = ({ nodes }) => {
  const { selectedNode, setSelectedNode } = useContext(NodeSelectionContext);

  return (
    <div className='w-64 h-screen shadow-md bg-white p-4 text-gray-700'>
      <h1 className='font-bold'>Assets</h1>
      <br />
      <div className='flex flex-col gap-4'>
        {nodes.map((node) => {
          const isActive = node.id === selectedNode?.id;
          const newNode = {
            id: node.id,
            xPos: node.position.x,
            yPos: node.position.y,
            type: node.type!,
            data: node.data
          };

          return (
            <div
              className={`flex items-center px-1.5 py-1 cursor-pointer ${isActive ? activeNodeClassName : ''}`}
              key={node.id}
              onClick={() => setSelectedNode(newNode)}
            >
              <div className={`${indicatorBg(node.type!)} w-2 rounded h-6 mr-2`} />
              <p className='text-sm'>{node.data.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LeftSideBar;
