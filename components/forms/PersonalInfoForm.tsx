import { PersonalInfo } from '@/types/resume';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

export default function PersonalInfoForm({ data, onChange }: PersonalInfoFormProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-4 pt-4">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="John Doe"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={data.location}
          onChange={(e) => handleChange('location', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="San Francisco, CA"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="text"
            id="linkedin"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="linkedin.com/in/johndoe"
          />
        </div>

        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">
            Website
          </label>
          <input
            type="text"
            id="website"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="johndoe.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-1">
          Professional Summary
        </label>
        <textarea
          id="summary"
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
          placeholder="Brief overview of your professional background and key achievements..."
        />
      </div>
    </div>
  );
}
