import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function FacultyList() {
  const [teachers, setTeachers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await api.get('/teachers');
        setTeachers(res.data.teachers || []);
      } catch (err) {
        console.error('Error fetching teachers:', err);
      }
    };
    fetchTeachers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Faculty Listing</h2>
      <div className="flex flex-wrap gap-3">
        {teachers.map((t) => (
          <button
            key={t._id}
            onClick={() => navigate(`/faculty/${t._id}`)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}
