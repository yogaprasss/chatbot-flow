import { FC } from 'react';

interface RightSideBarProps {
  onAddNodes: () => void;
}

const RightSideBar: FC<RightSideBarProps> = ({ onAddNodes }) => {
  return (
    <div className='w-72 h-screen shadow-md bg-white'>
      <button type='button' onClick={onAddNodes}>Add Nodes</button>
    </div>
  );
};

export default RightSideBar;
