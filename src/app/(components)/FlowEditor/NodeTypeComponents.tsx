import { useTranslation } from 'react-i18next';
import { type NodeProps, Handle, Position } from 'reactflow';

const renderNode = (type: string, key: keyof typeof Position) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const Component = ({ data }: NodeProps) => {
        const { t } = useTranslation();
        return (
            <div>
                <Handle type="target" position={Position[key]} />
                <div>{t(`flow.node.${type}`)}</div>
                <Handle type="source" position={Position.Bottom} />
            </div>
        );
    };

    Component.displayName = `${type}Node`;
    return Component;
};


const StartNode = renderNode(('start'), 'Top');
const EndNode = renderNode('end', 'Top');
const DecisionNode = renderNode('decision', 'Top');
const ProcessNode = renderNode('process', 'Top');

export const nodeTypeComponents = {
    start: StartNode,
    process: ProcessNode,
    decision: DecisionNode,
    end: EndNode,
};