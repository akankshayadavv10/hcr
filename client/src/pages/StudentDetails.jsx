import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import AddRecordForm from '../pages/Courses';

export default function StudentDetails() {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [hcrList, setHcrList] = useState([]);
  const [showForm, setShowForm] = useState(false);

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
        const res = await api.get(`/students/${studentId}/hcr`);
        setHcrList(res.data.hcr || []);
      } catch (err) {
        console.error('Error fetching HCR:', err);
      }
    };

    fetchStudent();
    fetchHCR();
  }, [studentId]);

  const handleRecordAdded = (newRecord) => {
    setHcrList((prev) => [...prev, newRecord]);
    setShowForm(false);
  };

  if (!student) return <div className="p-6">Loading student...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Student Info */}
      <div className="card p-4">
        <h2 className="text-2xl font-bold">{student.name}</h2>
        <p>Course: {student.course?.name || 'N/A'}</p>
        <p>Faculty: {student.faculty?.name || 'N/A'}</p>
      </div>

      {/* Add Record */}
      <button
        onClick={() => setShowForm(true)}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
      >
        Add Record
      </button>

      {showForm && (
        <AddRecordForm
          studentId={studentId}
          onClose={() => setShowForm(false)}
          onRecordAdded={handleRecordAdded}
        />
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
                <th className="p-2 border">Details</th>
              </tr>
            </thead>
            <tbody>
              {hcrList.map((h, i) => (
                <tr key={i} className="border">
                  <td className="p-2 border">{new Date(h.date).toLocaleDateString()}</td>
                  <td className="p-2 border">{h.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
