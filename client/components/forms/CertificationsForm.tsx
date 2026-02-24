import { Certification } from '@/types/resume';
import { generateId } from '@/utils/helpers';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    const newCertification: Certification = {
      id: generateId(),
      name: '',
      issuer: '',
      date: '',
    };
    onChange([...data, newCertification]);
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      data.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">No certifications added yet</p>
        <button
          onClick={addCertification}
          className="inline-flex items-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-4">
      {data.map((cert) => (
        <div key={cert.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`cert-name-${cert.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Certification Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`cert-name-${cert.id}`}
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="AWS Certified Solutions Architect"
              />
            </div>

            <div>
              <label htmlFor={`cert-issuer-${cert.id}`} className="block text-sm font-medium text-gray-700 mb-1">
                Issuing Organization <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id={`cert-issuer-${cert.id}`}
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Amazon Web Services"
              />
            </div>
          </div>

          <div>
            <label htmlFor={`cert-date-${cert.id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Date Obtained
            </label>
            <input
              type="month"
              id={`cert-date-${cert.id}`}
              value={cert.date}
              onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => removeCertification(cert.id)}
              className="inline-flex items-center px-3 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Remove
            </button>
          </div>
        </div>
      ))}

      <button
        onClick={addCertification}
        className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg border-2 border-dashed border-blue-300 text-blue-600 hover:bg-blue-50 transition"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Another Certification
      </button>
    </div>
  );
}
