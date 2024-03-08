import { useCallback, useState } from 'react';

import type { ChangeEvent, KeyboardEvent } from 'react';
import type { Node, Edge } from 'reactflow';
import type { NodeDataProps } from '@/helpers/types';

interface ChatProps {
  id: string;
  content: string;
  type: 'input' | 'output';
}

const useSimulatorHooks = () => {
  const [nodesValue, setNodesValue] = useState<Node<NodeDataProps, string | undefined>[]>([]);
  const [edgesValue, setEdgesValue] = useState<Edge<any>[]>([]);
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [inputChat, setInputChat] = useState('');

  const initValues = useCallback((
    nodes: Node<NodeDataProps, string | undefined>[],
    edges: Edge<any>[]
  ) => {
    setNodesValue(nodes);
    setEdgesValue(edges);
    const startNode = nodes.find((item) => item.type === 'defaultNode');
    if (startNode) {
      const firstChat = { id: startNode.id ,content: startNode.data.content, type: 'output' } as ChatProps;
      setChats([firstChat]);
    }
  }, []);

  const onInputChat = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputChat(e.target.value);
  }, []);

  const onSubmitChat = useCallback(() => {
    const lastChat = chats[chats.length - 1];
    const lastChatNodes = nodesValue.find((node) => node.id === lastChat.id);
    const inputChatNodesIds = nodesValue
      .filter((node) => node.data.content.toLowerCase() === inputChat.toLowerCase())
      .map((node) => node.id);
    const inputChatNodeId = edgesValue.find((edge) => (
      edge.source === lastChatNodes?.id && inputChatNodesIds.includes(edge.target)
    ))?.target;
    const nextOutputNodeId = edgesValue.find((edge) => edge.source === inputChatNodeId)?.target;
    const nextOutputNode = nodesValue.find((node) => node.id === nextOutputNodeId);

    console.log({ lastChat, lastChatNodes, inputChatNodesIds, inputChatNodeId, nextOutputNodeId, nextOutputNode });

    const chat: ChatProps = {
      id: '',
      content: inputChat,
      type: 'input'
    };

    const outputChat: ChatProps = {
      id: nextOutputNodeId ?? lastChat.id,
      content: nextOutputNode?.data.content ?? lastChat.content,
      type: 'output'
    };

    setChats((value) => [...value, chat, outputChat]);
    setInputChat('');
  }, [inputChat, chats, nodesValue, edgesValue]);

  const onPressEnter = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') onSubmitChat();
  }, [onSubmitChat]);
  
  return {
    data: {
      chats,
      inputChat
    },
    methods: {
      initValues,
      onInputChat,
      onSubmitChat,
      onPressEnter
    }
  };
};

export default useSimulatorHooks;
