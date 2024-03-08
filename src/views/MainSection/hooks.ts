import DefaultNode from '@/components/DefaultNode';
import OutputNode from '@/components/OutputNode';
import InputNode from '@/components/InputNode';

import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { NodeSelectionContext } from '@/pages/_app';

import type { MouseEvent } from 'react';
import type { Edge, Connection, Node } from 'reactflow';

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

export const nodeTypes = {
  defaultNode: DefaultNode,
  inputNode: InputNode,
  outputNode: OutputNode
};

interface NodesAndEdgesFileProps {
  nodes: Node[];
  edges: Edge[];
}

const useMainSectionHooks = () => {
  const {
    selectedNode,
    isAddNode,
    isDuplicateNode,
    setSelectedNode,
    setIsAddNode,
    setIsDuplicateNode
  } = useContext(NodeSelectionContext);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [isShowSimulator, setIsShowSimulator] = useState(false);

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
      const yPos = (selectedNode?.yPos ?? 0) + 120;

      const newNode = {
        id: uuidv4(),
        position: { x: xPos, y: yPos },
        type: selectedNode?.type === 'inputNode' ? 'outputNode' : 'inputNode',
        data: { title: 'New Node', description: '', content: '' }
      };

      const newEdge = {
        source: selectedNode?.id,
        sourceHandle: null,
        target: newNode.id,
        targetHandle: null,
        type: 'smoothstep'
      } as Edge | Connection;

      setNodes((nds) => ([...nds, { ...newNode }]));
      setEdges((eds) => addEdge(newEdge, eds));
      setSelectedNode({ id: newNode.id, xPos, yPos, type: newNode.type, data: newNode.data });
      setIsAddNode(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddNode]);

  useEffect(() => {
    if (isDuplicateNode) {
      const xPos = (selectedNode?.xPos ?? 0) + 250;
      const yPos = selectedNode?.yPos ?? 0;

      const newNode = {
        id: uuidv4(),
        position: { x: xPos, y: yPos },
        type: selectedNode?.type!,
        data: {
          ...selectedNode?.data!,
          title: `New ${selectedNode?.data.title}`
        }
      };

      setNodes((nds) => ([...nds, { ...newNode }]));
      setSelectedNode({ id: newNode.id, xPos, yPos, type: newNode.type, data: newNode.data });
      setIsDuplicateNode(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicateNode]);

  const onClickOutside = useCallback(() => {
    setSelectedNode(null);
  }, [setSelectedNode]);

  const toggleSimulator = useCallback(() => setIsShowSimulator((value) => !value), []);

  const onNodesDelete = useCallback((nodesValue: Node[]) => {
    const isSelectedNodeDeleted = nodesValue.map((item) => item.id).includes(selectedNode?.id!);
    if (isSelectedNodeDeleted) setSelectedNode(null);
  }, [selectedNode, setSelectedNode]);

  const onClickExport = useCallback(() => {
    const data = JSON.stringify({ nodes, edges });
    const elmt = document.createElement('a');
    const file = new Blob([data], { type: 'application/json' });
    elmt.href = URL.createObjectURL(file);
    elmt.download = 'nodes_and_edges.json';
    document.body.appendChild(elmt);
    elmt.click();
  }, [nodes, edges]);

  const onClickImport = useCallback((jsonString: string) => {
    const data = JSON.parse(jsonString) as NodesAndEdgesFileProps;
    setNodes(data.nodes);
    setEdges(data.edges);
  }, [setNodes, setEdges]);

  return {
    data: {
      nodes,
      edges,
      isShowSimulator
    },
    methods: {
      onNodesChange,
      onEdgesChange,
      onConnect,
      onNodeClick,
      onChangeNodeValues,
      onClickOutside,
      toggleSimulator,
      onNodesDelete,
      onClickExport,
      onClickImport
    }
  };
};

export default useMainSectionHooks;
