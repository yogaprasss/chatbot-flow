import { useCallback, useContext, useState } from 'react';
import { NodeSelectionContext } from '@/pages/_app';

const useCustomNodeHooks = () => {
  const { selectedNode, setIsAddNode, setSelectedNode } = useContext(NodeSelectionContext);
  const [isShowHandleLabel, setIsShowHandleLabel] = useState(false);

  const onClickHandle = useCallback((
    id: string,
    type: string,
    xPos: number,
    yPos: number,
    data: any
  ) => () =>  {
    setIsAddNode(true);
    setSelectedNode({ id, type, xPos, yPos, data });
  }, [setIsAddNode, setSelectedNode]);

  const onMouseEnter = useCallback(() => setIsShowHandleLabel(true), []);
  const onMouseLeave = useCallback(() => setIsShowHandleLabel(false), []);

  const isActive = useCallback((id: string) => id === selectedNode?.id, [selectedNode?.id]);

  return {
    data: { isShowHandleLabel },
    methods: { onClickHandle, onMouseEnter, onMouseLeave, isActive },
  }
};

export default useCustomNodeHooks;