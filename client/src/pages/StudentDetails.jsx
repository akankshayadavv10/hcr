
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [hcrList, setHcrList] = useState([]);
  const [form, setForm] = useState({ topic: '', description: '' });
  const [showForm, setShowForm] = useState(false);

  // Fetch student & HCRs
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${studentId}`);
        setStudent(res.data.student);
      } catch (err) {
        console.error('Error fetching student:', err);
      }
    };

    const fetchHCR = async () => {
      try {
        const res = await api.get(`/hcr/student/${studentId}`);
        setHcrList(res.data.records || []);
      } catch (err) {
        console.error('Error fetching HCR:', err);
      }
    };

    fetchStudent();
    fetchHCR();
  }, [studentId]);

  // Save HCR record
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { student: studentId, topic: form.topic, description: form.description };
      const res = await api.post('/hcr', payload);
      setHcrList((prev) => [...prev, res.data.record]);
      setForm({ topic: '', description: '' });
      setShowForm(false);
    } catch (err) {
      console.error('Error creating HCR:', err);
    }
  };

  if (!student) return <div className="p-6">Loading student...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Student Info */}
      <div className="card p-4">
        <h2 className="text-2xl font-bold">{student.name}</h2>
        <p>Course: {student.course?.name || 'N/A'}</p>
        <p>Faculty: {student.teacher?.name || 'N/A'}</p>
      </div>

      {/* Add Record */}
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Add Record
      </button>

      {showForm && (
        <form onSubmit={handleSave} className="card p-4 space-y-3">
          <div>
            <label className="block text-sm">Topic</label>
            <input
              className="input mt-1"
              value={form.topic}
              onChange={(e) => setForm({ ...form, topic: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm">Description</label>
            <textarea
              className="input mt-1"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-3 py-2 rounded-lg bg-gray-200"
            >
              Cancel
            </button>
            <button type="submit" className="btn">
              Save
            </button>
          </div>
        </form>
      )}

      {/* HCR Table */}
      <div className="card p-4">
        <h3 className="text-lg font-semibold mb-3">History Card Records</h3>
        {hcrList.length === 0 ? (
          <p>No records yet.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Topic</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {hcrList.map((h) => (
                <tr key={h._id} className="border">
                  <td className="p-2 border">{new Date(h.createdAt).toLocaleDateString()}</td>
                  <td className="p-2 border">{h.topic}</td>
                  <td className="p-2 border">{h.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
