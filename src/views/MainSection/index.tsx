import ReactFlow from 'reactflow';
import LeftSideBar from '../LeftSideBar';
import RightSideBar from '../RightSideBar';
import TopBar from '../TopBar';
import Popup from '@/components/Popup';
import useMainSectionHooks from './hooks';

import { nodeTypes } from './hooks';

import 'reactflow/dist/style.css';
import Simulator from '../Simulator';

const MainSection = () => {
  const {
    data: {
      nodes,
      edges,
      viewport,
      isShowSimulator
    },
    methods: {
      onNodesChange,
      onEdgesChange,
      onConnect,
      onNodeClick,
      onChangeNodeValues,
      onClickOutside,
      toggleSimulator
    }
  } = useMainSectionHooks();
  
  return (
    <>
      <div className='w-screen h-screen relative flex'>
        <Popup isShow={isShowSimulator} onClose={toggleSimulator}>
          <Simulator nodes={nodes} edges={edges} />
        </Popup>
        <TopBar onClickPlay={toggleSimulator} />
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
    </>
  );
};

export default MainSection;
