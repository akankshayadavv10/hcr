import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function FacultyStudents() {
  const { facultyId } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await api.get(`/teachers/${facultyId}/students`);
        setStudents(res.data.students || []);
      } catch (err) {
        console.error('Error fetching faculty students:', err);
      }
    };
    fetchStudents();
  }, [facultyId]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Students of Faculty</h2>
      <div className="flex flex-wrap gap-3">
        {students.map((s) => (
          <button
            key={s._id}
            onClick={() => navigate(`/student/${s._id}`)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
