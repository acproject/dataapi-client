import type { FlowNode } from '@/store/model';
import { useTranslation} from 'react-i18next';

interface FlowPropertyPanelProps {
    node: FlowNode | null;
    onUpdate: (nodeId:string, newData: Record<string, unknown>) => void;
}

const FlowPropertyPanel = ({node, onUpdate}: FlowPropertyPanelProps) => {
    const { t } = useTranslation();
    if (!node) {
        return null;
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(node.id, {
            [e.target.name]: e.target.value
        });
    }
  return (
    <div className='w-72 bg-white border-l p-4'>
        <h3 className='text-lg font-bold mb-4'>{t('flow.propertyPanel.title')}</h3>
        <div className='space-y-4'>
            <div>
                {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
                <label className='block text-sm font-medium'>{t('flow.propertyPanel.label')}</label>
                <input
                    type="text"
                    name="label"
                    value={node.data.label || ''}
                    onChange={handleChange}
                    className='mt-1 block w-full border rounded p-2'
                />
            </div>
            {/* 根据节点类型添加更多字段 */}
        </div>
    </div>
  )
}

export default FlowPropertyPanel