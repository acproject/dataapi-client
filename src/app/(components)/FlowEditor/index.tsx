'use client'
import { useState, useCallback, useRef } from 'react';
import ReactFlow, {
    Controls,
    Background,
    addEdge,
    type Connection,
    useEdgesState,
    useNodesState,
    type ReactFlowInstance,
    type Node
} from 'reactflow';
import 'reactflow/dist/style.css';
import FlowSidebar from './flowSidebar';
import FlowPropertyPanel from './flowPropertyPanel';
import type { FlowEdge, FlowNode, NodeType } from '@/store/model';
import { nodeTypeComponents } from './NodeTypeComponents';
import { useTranslation } from 'react-i18next';
import '@/i18n';

const FlowEditor = () => {
    const { t } = useTranslation();
    const [nodes, setNodes, onNodesChange] = useNodesState<FlowNode[]>([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState<FlowEdge[]>([]);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const reactFlowWrapper = useRef<HTMLDivElement>(null);
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const handleNodeClick = useCallback((type: NodeType, label: string) => {
        if (!reactFlowInstance || !reactFlowWrapper.current) return;

        const bounds = reactFlowWrapper.current.getBoundingClientRect();
        const position = reactFlowInstance.project({
            x: bounds.width / 2,
            y: bounds.height / 2,
        });

        const newNode: FlowNode = {
            id: `${type}-${Date.now()}`,
            type,
            position,
            data: { 
                label,
                ...(type === 'decision' && { condition: '' }),
                ...(type === 'process' && { operation: '' })
            },
        };

        setNodes((nds) => nds.concat(newNode as Node));
    }, [reactFlowInstance, setNodes]);

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges]
    );

    const updateNodeData = (nodeId: string, newData: Record<string, unknown>) => {
        setNodes((nodes) =>
            nodes.map((node) => {
                if (node.id === nodeId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            ...newData,
                        },
                    };
                }
                return node;
            })
        );
    };

    return (
        <div className='flex h-[calc(100vh-7rem)]'>
            <FlowSidebar onNodeClick={handleNodeClick} />
            <div className='flex-1' ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onNodeClick={(_e, node: Node) => setSelectedNode(node)}
                    nodeTypes={nodeTypeComponents}
                    onInit={(instance) => setReactFlowInstance(instance)}
                    fitView
                    nodeDragThreshold={0}
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
            <FlowPropertyPanel node={selectedNode} onUpdate={updateNodeData} />
            {/* <div className='absolute top-140 right-14 z-10'>
                <button className='bg-blue-500 text-white px-4 py-2 rounded'>
                    {t('flow.button.save')}
                </button>
            </div> */}
        </div>
    );
};

export default FlowEditor;