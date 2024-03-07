export interface NodeDataProps {
  title: string;
  description: string;
  content: string;
}

export interface NodeProps {
  id: string;
  xPos: number;
  yPos: number;
  type: string;
  data: NodeDataProps;
}
