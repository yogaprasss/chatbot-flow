import { FC } from 'react';

import type { Node } from 'reactflow';
import type { NodeDataProps } from '@/helpers/types';

interface LeftSideBarProps {
  nodes: Node<NodeDataProps>[]
}

const LeftSideBar: FC<LeftSideBarProps> = ({ nodes }) => {
  return (
    <div className='w-72 h-screen shadow-md bg-white p-4'>
      {nodes.map((node) => {
        return (
          <div className='flex' key={node.id}>
            {node.data.title}
          </div>
        );
      })}
    </div>
  );
};

export default LeftSideBar;
