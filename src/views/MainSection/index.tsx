import ReactFlow from 'reactflow';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';
import useMainSectionHooks from './hooks';

import { nodeTypes } from './hooks';

import 'reactflow/dist/style.css';

const MainSection = () => {
  const {
    data: {
      nodes,
      edges,
      viewport
    },
    methods: {
      onNodesChange,
      onEdgesChange,
      onConnect,
      onNodeClick,
      onChangeNodeValues,
      onClickOutside
    }
  } = useMainSectionHooks();
  
  return (
    <div className='w-screen h-screen relative flex'>
      <LeftSideBar nodes={nodes} />
      <div className='w-[calc(100vw-(2*256px))] h-screen'>
        <ReactFlow
          defaultViewport={viewport}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          onPaneClick={onClickOutside}
          className='bg-[#fcfcfc]'
        />
      </div>
      <RightSideBar onChangeNodeValue={onChangeNodeValues} />
    </div>
  );
};

export default MainSection;
