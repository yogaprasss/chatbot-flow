import '@/styles/globals.css';

import { createContext, useState } from 'react';

import type { AppProps } from 'next/app';
import type { NodeProps } from '@/helpers/types';

type ContextValueProps = {
  selectedNode: NodeProps | null,
  isAddNode: boolean,
  isDuplicateNode: boolean,
  setSelectedNode: (node: NodeProps | null) => void,
  setIsAddNode: (value: boolean) => void,
  setIsDuplicateNode: (value: boolean) => void
}

const defaultContextValue: ContextValueProps = {
  selectedNode: null,
  isAddNode: false,
  isDuplicateNode: false,
  setSelectedNode: () => {},
  setIsAddNode: () => {},
  setIsDuplicateNode: () => {}
}

export const NodeSelectionContext = createContext(defaultContextValue);

export default function App({ Component, pageProps }: AppProps) {
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null);
  const [isAddNode, setIsAddNode] = useState(false);
  const [isDuplicateNode, setIsDuplicateNode] = useState(false);

  return (
    <NodeSelectionContext.Provider
      value={{
        selectedNode,
        isAddNode,
        isDuplicateNode,
        setSelectedNode,
        setIsAddNode,
        setIsDuplicateNode
      }}
    >
      <Component {...pageProps} />
    </NodeSelectionContext.Provider>
  );
}
