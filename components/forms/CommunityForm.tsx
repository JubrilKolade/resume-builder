import { Community } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

interface CommunityFormProps {
  data: Community[];
  onChange: (data: Community[]) => void;
}

export default function CommunityForm({ data, onChange }: CommunityFormProps) {
  const addCommunity = () => {
    const newCommunity: Community = {
      id: generateId(),
      organization: '',
      role: '',
      location: '',
      description: '',
      startDate: '',
      endDate: '',
      current: false,
    };
    onChange([...data, newCommunity]);
  };

  const removeCommunity = (id: string) => {
    onChange(data.filter((item) => item.id !== id));
  };

  const updateCommunity = (id: string, field: keyof Community, value: string | boolean) => {
    onChange(
      data.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No community involvement added yet</p>
        <button
          onClick={addCommunity}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Community Experience
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
              <label htmlFor={`community-org-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`community-org-${item.id}`}
                value={item.organization}
                onChange={(e) => updateCommunity(item.id, 'organization', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Local Tech Meetup"
              />
            </div>

            <div>
              <label htmlFor={`community-role-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Role/Position <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`community-role-${item.id}`}
                value={item.role}
                onChange={(e) => updateCommunity(item.id, 'role', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Event Organizer"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`community-loc-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              id={`community-loc-${item.id}`}
              value={item.location || ''}
              onChange={(e) => updateCommunity(item.id, 'location', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="San Francisco, CA"
            />
          </div>

          <div>
            <label htmlFor={`community-desc-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id={`community-desc-${item.id}`}
              value={item.description || ''}
              onChange={(e) => updateCommunity(item.id, 'description', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe your involvement and contributions"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor={`community-start-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <input
                type="month"
                id={`community-start-${item.id}`}
                value={item.startDate}
                onChange={(e) => updateCommunity(item.id, 'startDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor={`community-end-${item.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                id={`community-end-${item.id}`}
                value={item.endDate}
                onChange={(e) => updateCommunity(item.id, 'endDate', e.target.value)}
                disabled={item.current}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-500"
              />
            </div>

            <div className="flex items-end">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={item.current}
                  onChange={(e) => updateCommunity(item.id, 'current', e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600"
                />
                <span className="ml-2 text-sm font-medium text-gray-700">Currently involved</span>
              </label>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeCommunity(item.id)}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCommunity}
        className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Community Experience
      </button>
    </div>
  );
}
