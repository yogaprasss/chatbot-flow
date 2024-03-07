import ReactFlow from 'reactflow';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import DefaultNode from '@/components/DefaultNode';
import OutputNode from '@/components/OutputNode';
import InputNode from '@/components/InputNode';

import { useCallback, useContext, useEffect, useMemo } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';
import { NodeSelectionContext } from '@/pages/_app';

import type { Edge, Connection, Node } from 'reactflow';
import type { MouseEvent } from 'react';

import 'reactflow/dist/style.css';

const initialNodes = [
  {
    id: uuidv4(),
    position: { x: 0, y: 0 },
    data: {
      title: 'Start',
      description: 'This is the begining',
      content: 'Halo, apa ada yang bisa saya bantu?'
    },
    type: 'defaultNode'
  },
];

const initialEdges: Edge[] = [];

const nodeTypes = {
  defaultNode: DefaultNode,
  inputNode: InputNode,
  outputNode: OutputNode
};

const MainSection = () => {
  const {
    selectedNode,
    isAddNode,
    setSelectedNode,
    setIsAddNode
  } = useContext(NodeSelectionContext);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((value: Edge | Connection) => {
    const newEdge = { ...value, type: 'smoothstep' };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const selectedIndex = useMemo(() => {
    const index = nodes.findIndex((item) => item.id === selectedNode?.id);
    return index;
  }, [selectedNode, nodes]);

  const onChangeNodeValues = useCallback((key: 'type' | 'data', value: any) => {
    setNodes((nds) => {
      const items = nds.slice();
      items[selectedIndex][key] = value;
      return items;
    });
  }, [selectedIndex, setNodes]);

  const onNodeClick = useCallback((e: MouseEvent, node: Node) => {
    if (!isAddNode) {
      setSelectedNode({
        id: node.id,
        xPos: node.position.x,
        yPos: node.position.y,
        type: node.type!,
        data: node.data
      });
    }
  }, [setSelectedNode, isAddNode]);

  useEffect(() => {
    if (isAddNode) {
      const xPos = selectedNode?.xPos ?? 0;
      const yPos = (selectedNode?.yPos ?? 0) + 150;

      const newNode = {
        id: uuidv4(),
        position: { x: xPos, y: yPos },
        type: 'inputNode',
        data: { title: '', description: '', content: '' }
      };

      setNodes((nds) => ([...nds, { ...newNode }]));
      setSelectedNode({ id: newNode.id, xPos, yPos, type: newNode.type, data: newNode.data });
      setIsAddNode(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddNode]);

  return (
    <div className='w-screen h-screen relative flex'>
      <LeftSideBar nodes={nodes} />
      <div className='w-[calc(100vw-(2*288px))] h-screen'>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
        />
      </div>
      <RightSideBar onChangeNodeValue={onChangeNodeValues} />
    </div>
  );
};

export default MainSection;
