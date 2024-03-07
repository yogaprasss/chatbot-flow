import { useCallback, useContext, useEffect, useState } from 'react';
import { NodeSelectionContext } from '@/pages/_app';

import type { ChangeEvent } from 'react';
import type { NodeDataProps } from '@/helpers/types';

const useRightSideBarHooks = () => {
  const { selectedNode } = useContext(NodeSelectionContext);

  const [type, setType] = useState(selectedNode?.type ?? '');
  const [data, setData] = useState<NodeDataProps | null>(selectedNode?.data ?? null);

  const onInputType = useCallback((
    callback: (key: 'type' | 'data', value: any) => void) => (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setType(value);
    callback('type', value);
  }, []);

  const onInputData = useCallback((
    keyData: string,
    callback: (key: 'type' | 'data', value: any) => void
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setData((dataValue) => {
      if (dataValue) {
        const newDataValue = { ...dataValue, [keyData]: value };
        callback('data', newDataValue);
        return {
          ...dataValue,
          [keyData]: value
        }
      }
      return dataValue;
    });
  }, []);

  useEffect(() => {
    if (selectedNode?.id) {
      setType(selectedNode.type);
      setData(selectedNode.data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode?.id]);
  
  return {
    data: { type, data, selectedNode },
    methods: { onInputType, onInputData }
  }
};

export default useRightSideBarHooks;
