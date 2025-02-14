
import type { NodeType } from '@/store/model';
import { useTranslation } from 'react-i18next';

const nodeTypes: { type: NodeType; label: string }[] = [
    { type: 'start', label: 'flow.node.start' },
    { type: 'process', label: 'flow.node.process' },
    { type: 'decision', label: 'flow.node.decision' },
    { type: 'end', label: 'flow.node.end' },
];

const FlowSidebar = ({ onNodeClick }: { onNodeClick: (type: NodeType, label: string) => void }) => {
    const { t } = useTranslation();

    return (
        <div className='w-64 bg-gray-100 p-4 border-r'>
            <h2 className='text-lg font-bold mb-4'>{t('flow.control_library')}</h2>
            {nodeTypes.map(({ type, label }) => (
                <ClickableNode key={type} type={type} label={label} onClick={onNodeClick} />
            ))}
        </div>
    );
};

const ClickableNode = ({ type, label, onClick }: { type: NodeType; label: string; onClick: (type: NodeType, label: string) => void }) => {
    const { t } = useTranslation();

    const handleClick = () => {
        onClick(type, t(label));
    };

    return (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<div
            className='bg-white p-2 mb-2 rounded shadow cursor-pointer'
            onClick={handleClick}
        >
            {t(label)}
        </div>
    );
};

export default FlowSidebar;