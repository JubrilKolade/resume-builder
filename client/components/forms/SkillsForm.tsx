import { Skill } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      const skill: Skill = {
        id: generateId(),
        name: newSkill.trim(),
      };
      onChange([...data, skill]);
      setNewSkill('');
    }
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add Skills
        </label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Type a skill and press Enter or click Add"
          />
          <button
            onClick={addSkill}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-gray-500">
            No skills added yet. Add your technical and soft skills above.
          </p>
        </div>
      ) : (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Skills ({data.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {data.map((skill) => (
              <div
                key={skill.id}
                className="inline-flex items-center space-x-2 px-3 py-1.5 bg-primary-50 border border-primary-200 text-primary-700 rounded-full"
              >
                <span className="text-sm font-medium">{skill.name}</span>
                <button
                  onClick={() => removeSkill(skill.id)}
                  className="text-primary-600 hover:text-primary-800 transition-colors"
                  aria-label={`Remove ${skill.name}`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          💡 <strong>Tip:</strong> Add both technical skills (e.g., JavaScript, React) and soft
          skills (e.g., Leadership, Communication)
        </p>
      </div>
    </div>
  );
}
