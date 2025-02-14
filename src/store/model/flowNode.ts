import type { NodeType } from "./nodeType";

export interface FlowNode {
    id: string;
    type: NodeType;
    postion: {
        x: number;
        y: number;
    };
    data: {
        label: string;
        [key: string]: unknown;
    };

}