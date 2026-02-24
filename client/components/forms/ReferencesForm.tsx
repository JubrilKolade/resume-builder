import { Reference } from '@/types/resume';
import { Plus, Trash2 } from 'lucide-react';
import { generateId } from '@/utils/helpers';

interface ReferencesFormProps {
  data: Reference[];
  onChange: (data: Reference[]) => void;
}

export default function ReferencesForm({ data, onChange }: ReferencesFormProps) {
  const handleAddReference = () => {
    const newReference: Reference = {
      id: generateId(),
      name: '',
      title: '',
      company: '',
      phone: '',
      email: '',
    };
    onChange([...data, newReference]);
  };

  const handleUpdateReference = (id: string, field: keyof Reference, value: string) => {
    onChange(
      data.map((ref) =>
        ref.id === id ? { ...ref, [field]: value } : ref
      )
    );
  };

  const handleRemoveReference = (id: string) => {
    onChange(data.filter((ref) => ref.id !== id));
  };

  return (
    <div className="space-y-6 pt-4">
      {data.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">No references added yet</p>
          <button
            onClick={handleAddReference}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Reference
          </button>
        </div>
      ) : (
        <>
          {data.map((reference, index) => (
            <div key={reference.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">Reference {index + 1}</h3>
                <button
                  onClick={() => handleRemoveReference(reference.id)}
                  className="text-red-600 hover:text-red-700 transition-colors"
                  aria-label="Remove reference"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reference.name}
                    onChange={(e) => handleUpdateReference(reference.id, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={reference.title}
                    onChange={(e) => handleUpdateReference(reference.id, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Manager"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={reference.company}
                  onChange={(e) => handleUpdateReference(reference.id, 'company', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tech Company Inc."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={reference.phone}
                    onChange={(e) => handleUpdateReference(reference.id, 'phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 987-6543"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={reference.email}
                    onChange={(e) => handleUpdateReference(reference.id, 'email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={handleAddReference}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Another Reference
          </button>
        </>
      )}
    </div>
  );
}
