import { WorkExperience } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState, useRef } from 'react';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  /** During drag, hold the reordered list; commit to parent only on drop */
  const [dragPreview, setDragPreview] = useState<WorkExperience[] | null>(null);
  const dragPreviewIndexRef = useRef<number>(0);

  const listForEdit = dragPreview ?? data;

  const addExperience = () => {
    const newExperience: WorkExperience = {
      id: generateId(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: [''],
    };
    const next = [...listForEdit, newExperience];
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const removeExperience = (id: string) => {
    const next = listForEdit.filter((exp) => exp.id !== id);
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: WorkExperience[keyof WorkExperience]) => {
    const next = listForEdit.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const updateDescription = (id: string, index: number, value: string) => {
    const next = listForEdit.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            description: exp.description.map((desc, i) =>
              i === index ? value : desc
            ),
          }
        : exp
    );
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const addDescriptionPoint = (id: string) => {
    const next = listForEdit.map((exp) =>
      exp.id === id
        ? { ...exp, description: [...exp.description, ''] }
        : exp
    );
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const removeDescriptionPoint = (id: string, index: number) => {
    const next = listForEdit.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            description: exp.description.filter((_, i) => i !== index),
          }
        : exp
    );
    if (dragPreview !== null) setDragPreview(next);
    else onChange(next);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
    setDragPreview([...data]);
    dragPreviewIndexRef.current = index;
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    const list = dragPreview ?? data;
    const from = dragPreviewIndexRef.current;
    if (from === index) return;

    const reordered = [...list];
    const [item] = reordered.splice(from, 1);
    reordered.splice(index, 0, item);
    setDragPreview(reordered);
    dragPreviewIndexRef.current = index;
  };

  const handleDragEnd = () => {
    if (dragPreview !== null) {
      onChange(dragPreview);
      setDragPreview(null);
    }
    setDraggedIndex(null);
  };

  const displayList = dragPreview ?? data;

  if (displayList.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500 mb-4">No work experience added yet</p>
        <button
          onClick={addExperience}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Work Experience</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {displayList.map((exp, index) => (
        <div
          key={exp.id}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDragEnd={handleDragEnd}
          className="p-4 border border-gray-200 rounded-lg space-y-4 bg-gray-50 cursor-move"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <GripVertical className="w-5 h-5 text-gray-400" />
              <span className="text-sm font-medium text-gray-700">
                Experience {index + 1}
              </span>
            </div>
            <button
              onClick={() => removeExperience(exp.id)}
              className="text-red-600 hover:text-red-700 transition-colors"
              aria-label="Remove experience"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company
              </label>
              <input
                type="text"
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Company Name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Position
              </label>
              <input
                type="text"
                value={exp.position}
                onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Job Title"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              type="text"
              value={exp.location}
              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="City, State"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="month"
                value={exp.startDate}
                onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="month"
                value={exp.endDate}
                onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                disabled={exp.current}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id={`current-${exp.id}`}
              checked={exp.current}
              onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
              className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
            />
            <label htmlFor={`current-${exp.id}`} className="ml-2 text-sm text-gray-700">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsibilities & Achievements
            </label>
            <div className="space-y-2">
              {exp.description.map((desc, descIndex) => (
                <div key={descIndex} className="flex items-start space-x-2">
                  <textarea
                    value={desc}
                    onChange={(e) => updateDescription(exp.id, descIndex, e.target.value)}
                    rows={2}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                  {exp.description.length > 1 && (
                    <button
                      onClick={() => removeDescriptionPoint(exp.id, descIndex)}
                      className="mt-2 text-red-600 hover:text-red-700"
                      aria-label="Remove point"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={() => addDescriptionPoint(exp.id)}
              className="mt-2 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              + Add bullet point
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-primary-400 hover:text-primary-600 transition-colors font-medium"
      >
        + Add Another Experience
      </button>
    </div>
  );
}
