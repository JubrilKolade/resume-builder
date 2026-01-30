import { Leadership } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

interface LeadershipFormProps {
  data: Leadership[];
  onChange: (data: Leadership[]) => void;
}

export default function LeadershipForm({ data, onChange }: LeadershipFormProps) {
  const addLeadership = () => {
    const newLeadership: Leadership = {
      id: generateId(),
      title: '',
      organization: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange([...data, newLeadership]);
  };

  const removeLeadership = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const updateLeadership = (id: string, field: keyof Leadership, value: string | boolean) => {
    onChange(
      data.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No leadership experience added yet</p>
        <button
          onClick={addLeadership}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Leadership Role
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {data.map((item) => (
        <div key={item.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`leadership-title-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Leadership Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`leadership-title-${item.id}`}
                value={item.title}
                onChange={(e) => updateLeadership(item.id, 'title', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Team Lead"
              />
            </div>

            <div>
              <label htmlFor={`leadership-org-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`leadership-org-${item.id}`}
                value={item.organization}
                onChange={(e) => updateLeadership(item.id, 'organization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Company Name"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`leadership-desc-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={`leadership-desc-${item.id}`}
              value={item.description || ''}
              onChange={(e) => updateLeadership(item.id, 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your leadership responsibilities and achievements"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor={`leadership-start-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                id={`leadership-start-${item.id}`}
                value={item.startDate}
                onChange={(e) => updateLeadership(item.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor={`leadership-end-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                id={`leadership-end-${item.id}`}
                value={item.endDate}
                onChange={(e) => updateLeadership(item.id, 'endDate', e.target.value)}
                disabled={item.current}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(e) => updateLeadership(item.id, 'current', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Currently in this role</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeLeadership(item.id)}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addLeadership}
        className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Leadership Role
      </button>
    </div>
  );
}
