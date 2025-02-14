export interface FlowEdge {
    id: string;
    source: string;
    target: string;
    sourceHandle: string;
    targetHandle: string;
    data?: {
        label: string;
        options?: {
            [key: string]: string;
        };
    };
}