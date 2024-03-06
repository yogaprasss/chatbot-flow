import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import ReactFlow from 'reactflow';

import { useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';

import type { Edge, Connection, Node } from 'reactflow';
import type { MouseEvent } from 'react';

import 'reactflow/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 0, y: 0 }, data: { label: 'label1' } },
  { id: '2', position: { x: 0, y: 100 }, data: { label: 'label2' } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2', type: 'smoothstep' }];

const MainSection = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((value: Edge | Connection) => {
    const newEdge = { ...value, type: 'smoothstep' };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const onAddNodes = useCallback(() => {
    setNodes((nds) => ([...nds, { id: '3', position: { x: 100, y: 200 }, data: { label: 'label3' } }]));
  }, [setNodes]);

  const onNodeClick = useCallback((e: MouseEvent, node: Node) => {
    console.log({ node });
  }, []);

  return (
    <div className='w-screen h-screen relative flex'>
      <LeftSideBar />
      <div className='w-[calc(100vw-(2*288px))] h-screen'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onNodeClick={onNodeClick}
        />
      </div>
      <RightSideBar onAddNodes={onAddNodes} />
    </div>
  );
};

export default MainSection;
