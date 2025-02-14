import type { FlowEdge, FlowNode } from "@/store/model";

export class FlowExecutor {
    private nodes: Map<string, FlowNode|null>;
    private edges: Map<string, FlowEdge|null>;

    constructor(nodes: FlowNode[], edges: FlowEdge[]) {
        this.nodes = new Map(nodes.map(node => [node.id, node]));
        this.edges = new Map(edges.map(edge => [edge.id, edge]));
    }

    async execute() {
        const startNode = Array.from(this.nodes.values())
        .find(node => node?.type === 'start');

        if (!startNode) {
            throw new Error('No start node found');
        }

        return this.processNode(startNode)
    }

    private async processNode(node: FlowNode) {
        switch (node.type) {
            case 'start':
                console.log('Flow started');
                return this.getNextNode(node.id);
            case 'process':
                await this.executePorcess(node);
                return this.getNextNode(node.id);
            case 'decision':
                const nextNodeId = await this.executeDecision(node);
                return this.getNextNode(nextNodeId);
            case 'end':
                console.log('Flow ended');
                return ;
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    private async executePorcess(node: FlowNode) {
        console.log(`Processing node: ${node.data.label}`);
    }

    private async evaluateDescision(node: FlowNode) {
       const edges = Array.from(this.edges.values())
       .filter(edge => edge?.source === node.id);
       return edges[0]?.target;
    }

    private getNextNode(sourceNodeId: string) {
        const edge = Array.from(this.edges.values())
        .filter(edge => edge?.source === sourceNodeId);
        return edge ? this.nodes.get(edge.target) : null;
    }
}