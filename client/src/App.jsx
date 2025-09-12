
// import { useState } from 'react';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import { motion } from 'framer-motion';
// import Students from './pages/Students';
// import Teachers from './pages/Teachers';
// import Courses from './pages/Courses';
// import HCR from './pages/HCR';

// const TABS = [
//   { key:'dashboard', label:'Dashboard' },
//   { key:'students', label:'Students' },
//   { key:'teachers', label:'Faculties' },
//   { key:'courses', label:'Courses' },
//   { key:'hcr', label:'History Card' },
//   { key:'settings', label:'Settings' },
// ];

// export default function App(){
//   const [tab, setTab] = useState('dashboard');

//   return (
//     <div className="min-h-full">
//       <Navbar title="Institute Admin Panel" />
//       <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//         <nav className="card p-2 flex flex-wrap gap-2">
//           {TABS.map(t => (
//             <button key={t.key}
//               className={`px-4 py-2 rounded-xl transition ${tab===t.key ? 'bg-primary text-primary-foreground' : 'bg-white/5'}`}
//               onClick={()=>setTab(t.key)}>{t.label}</button>
//           ))}
//         </nav>

//         {tab === 'dashboard' && (
//           <div className="grid md:grid-cols-3 gap-4">
//             {[
//               { title: 'Total Students', value: '—' },
//               { title: 'Active Faculties', value: '—' },
//               { title: 'Courses', value: '—' },
//             ].map((k,i) => (
//               <motion.div key={i} className="card p-6" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{delay: i*0.05}}>
//                 <div className="text-sm opacity-70">{k.title}</div>
//                 <div className="text-3xl font-semibold mt-2">{k.value}</div>
//               </motion.div>
//             ))}
//             <Card className="md:col-span-3">
//               <div className="text-lg font-semibold mb-3">Welcome</div>
//               <p className="opacity-80">
//                 Use the tabs above to manage Students, Faculties, Courses and History Card Reports.
//                 Every page has search, date filters, CRUD modals, and a persistent logo.
//               </p>
//             </Card>
//           </div>
//         )}

//         {tab === 'students' && <Students/>}
//         {tab === 'teachers' && <Teachers/>}
//         {tab === 'courses' && <Courses/>}
//         {tab === 'hcr' && <HCR/>}

//         {tab === 'settings' && (
//           <Card>
//             <div className="space-y-4">
//               <div>
//                 <div className="text-lg font-semibold">Branding</div>
//                 <p className="text-sm opacity-80">Replace the logo at <code>src/assets/logo.svg</code>. It appears on every page in the navbar.</p>
//               </div>
//               <div>
//                 <div className="text-lg font-semibold">API</div>
//                 <p className="text-sm opacity-80">Set your backend URL via <code>.env</code> with <code>VITE_API_URL=http://localhost:5000</code>.</p>
//               </div>
//             </div>
//           </Card>
//         )}
//       </main>
//     </div>
//   )
// }






// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import { motion } from 'framer-motion';
// import Students from './pages/Students';
// import Teachers from './pages/Teachers';
// import Courses from './pages/Courses';
// import HCR from './pages/HCR';
// import api from './services/api';
// import Login from './pages/Login';
// import Signup from './pages/SignUp';
// import StudentDashboard from './pages/StudentDashboard';
// import FacultyDashboard from './pages/FacultyDashboard';

// const TABS = [
//   { key:'dashboard', label:'Dashboard' },
//   { key:'students', label:'Students' },
//   { key:'teachers', label:'Faculties' },
//   { key:'courses', label:'Courses' },
//   { key:'hcr', label:'History Card' },
//   { key:'settings', label:'Settings' },
// ];

// export default function App() {
//   const [tab, setTab] = useState('dashboard');
//   const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [sRes, tRes, cRes] = await Promise.all([
//           api.get('/students'),
//           api.get('/teachers'),
//           api.get('/courses')
//         ]);
//         setStats({
//           students: sRes.data.students?.length || 0,
//           teachers: tRes.data.teachers?.length || 0,
//           courses: cRes.data.courses?.length || 0,
//         });
//       } catch (err) {
//         console.error('Error fetching dashboard stats:', err);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Dashboard layout
//   const DashboardLayout = () => (
//     <div className="min-h-full">
//       <Navbar title="Institute Admin Panel" />
//       <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//         {/* Tabs */}
//         <nav className="card p-2 flex flex-wrap gap-2">
//           {TABS.map(t => (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`px-4 py-2 rounded-xl transition ${tab === t.key ? 'bg-primary text-primary-foreground' : 'bg-white/5'}`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </nav>

//         {/* Tab contents */}
//         {tab === 'dashboard' && (
//           <div className="grid md:grid-cols-3 gap-4">
//             {[
//               { title: 'Total Students', value: stats.students },
//               { title: 'Active Faculties', value: stats.teachers },
//               { title: 'Courses', value: stats.courses },
//             ].map((k, i) => (
//               <motion.div
//                 key={i}
//                 className="card p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//               >
//                 <div className="text-sm opacity-70">{k.title}</div>
//                 <div className="text-3xl font-semibold mt-2">{k.value}</div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {tab === 'students' && <Students />}
//         {tab === 'teachers' && <Teachers />}
//         {tab === 'courses' && <Courses />}
//         {tab === 'hcr' && <HCR />}
//         {tab === 'settings' && <Card>Settings content here</Card>}
//       </main>
//     </div>
//   );

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Directly show Dashboard */}
//         <Route path="/dashboard" element={<DashboardLayout />} />
//         <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
//         <Route path="/student/:studentId" element={<StudentDashboard />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />


//         {/* Default redirect to dashboard */}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }






// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Card from './components/Card';
// import { motion } from 'framer-motion';
// import Students from './pages/Students';
// import Teachers from './pages/Teachers';
// import Courses from './pages/Courses';
// import HCR from './pages/HCR';
// import api from './services/api';
// import Login from './pages/Login';
// import Signup from './pages/SignUp';
// import StudentDashboard from './pages/StudentDashboard';
// import FacultyDashboard from './pages/FacultyDashboard';
// import Cookies from 'js-cookie';

// const TABS = [
//   { key: 'dashboard', label: 'Dashboard' },
//   { key: 'students', label: 'Students' },
//   { key: 'teachers', label: 'Faculties' },
//   { key: 'courses', label: 'Courses' },
//   { key: 'hcr', label: 'History Card' },
//   { key: 'settings', label: 'Settings' },
// ];

// // ✅ ProtectedRoute component
// function ProtectedRoute({ children, allowedRoles }) {
//   const token = Cookies.get('token');
//   const role = Cookies.get('role'); // store user role in cookies after login

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

// export default function App() {
//   const [tab, setTab] = useState('dashboard');
//   const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const [sRes, tRes, cRes] = await Promise.all([
//           api.get('/students'),
//           api.get('/teachers'),
//           api.get('/courses'),
//         ]);
//         setStats({
//           students: sRes.data.students?.length || 0,
//           teachers: tRes.data.teachers?.length || 0,
//           courses: cRes.data.courses?.length || 0,
//         });
//       } catch (err) {
//         console.error('Error fetching dashboard stats:', err);
//       }
//     };

//     fetchStats();
//   }, []);

//   // Dashboard layout
//   const DashboardLayout = () => (
//     <div className="min-h-full">
//       <Navbar title="Institute Admin Panel" />
//       <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
//         {/* Tabs */}
//         <nav className="card p-2 flex flex-wrap gap-2">
//           {TABS.map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`px-4 py-2 rounded-xl transition ${
//                 tab === t.key
//                   ? 'bg-primary text-primary-foreground'
//                   : 'bg-white/5'
//               }`}
//             >
//               {t.label}
//             </button>
//           ))}
//         </nav>

//         {/* Tab contents */}
//         {tab === 'dashboard' && (
//           <div className="grid md:grid-cols-3 gap-4">
//             {[
//               { title: 'Total Students', value: stats.students },
//               { title: 'Active Faculties', value: stats.teachers },
//               { title: 'Courses', value: stats.courses },
//             ].map((k, i) => (
//               <motion.div
//                 key={i}
//                 className="card p-6"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.05 }}
//               >
//                 <div className="text-sm opacity-70">{k.title}</div>
//                 <div className="text-3xl font-semibold mt-2">{k.value}</div>
//               </motion.div>
//             ))}
//           </div>
//         )}

//         {tab === 'students' && <Students />}
//         {tab === 'teachers' && <Teachers />}
//         {tab === 'courses' && <Courses />}
//         {tab === 'hcr' && <HCR />}
//         {tab === 'settings' && <Card>Settings content here</Card>}
//       </main>
//     </div>
//   );

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* ✅ Admin protected routes */}
//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute allowedRoles={['admin']}>
//               <DashboardLayout />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Faculty protected routes */}
//         <Route
//           path="/dashboard/faculty"
//           element={
//             <ProtectedRoute allowedRoles={['faculty']}>
//               <FacultyDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* ✅ Student dashboard */}
//         <Route
//           path="/student/:studentId"
//           element={
//             <ProtectedRoute allowedRoles={['student']}>
//               <StudentDashboard />
//             </ProtectedRoute>
//           }
//         />

//         {/* Public routes */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         {/* Default redirect */}
//         <Route path="*" element={<Navigate to="/dashboard" />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }




import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Card from './components/Card';
import { motion } from 'framer-motion';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import Courses from './pages/Courses';
import HCR from './pages/HCR';
import api from './services/api';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import TeacherStudents from './pages/FacultyStudents'   // ✅ new page
import StudentDetail from './pages/StudentDetails';       // ✅ new page
import Cookies from 'js-cookie';
import FacultyStudents from './pages/FacultyStudents';
import StudentDetails from './pages/StudentDetails';
import FacultyList from './pages/FacultyList';

const TABS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'students', label: 'Students' },
  { key: 'teachers', label: 'Faculties' },
  { key: 'courses', label: 'Courses' },
  { key: 'hcr', label: 'History Card' },
  { key: 'settings', label: 'Settings' },
];

// ✅ ProtectedRoute component
function ProtectedRoute({ children, allowedRoles }) {
  const token = Cookies.get('token');
  const role = Cookies.get('role'); // store user role in cookies after login

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  const [tab, setTab] = useState('dashboard');
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [sRes, tRes, cRes] = await Promise.all([
          api.get('/students'),
          api.get('/teachers'),
          api.get('/courses'),
        ]);
        setStats({
          students: sRes.data.students?.length || 0,
          teachers: tRes.data.teachers?.length || 0,
          courses: cRes.data.courses?.length || 0,
        });
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
      }
    };

    fetchStats();
  }, []);

  // Dashboard layout
  const DashboardLayout = () => (
    <div className="min-h-full">
      <Navbar title="Institute Admin Panel" />
      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Tabs */}
        <nav className="card p-2 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-4 py-2 rounded-xl transition ${
                tab === t.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/5'
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {/* Tab contents */}
        {tab === 'dashboard' && (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { title: 'Total Students', value: stats.students },
              { title: 'Active Faculties', value: stats.teachers },
              { title: 'Courses', value: stats.courses },
            ].map((k, i) => (
              <motion.div
                key={i}
                className="card p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="text-sm opacity-70">{k.title}</div>
                <div className="text-3xl font-semibold mt-2">{k.value}</div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === 'students' && <Students />}
        {tab === 'teachers' && <Teachers />}
        {tab === 'courses' && <Courses />}
        {tab === 'hcr' && <HCR />}
        {tab === 'settings' && <Card>Settings content here</Card>}
      </main>
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Admin protected routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        />

        {/* ✅ Faculty protected routes */}
        <Route
          path="/dashboard/faculty"
          element={
            <ProtectedRoute allowedRoles={['faculty']}>
              <FacultyDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Student protected dashboard */}
        <Route
          path="/student/:studentId"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        {/* ✅ Public routes for Teacher → Students → Student Detail → HCR */}
        <Route path="/teachers" element={<FacultyList />} />
        <Route path="/teachers/:facultyId" element={<FacultyStudents />} />
        <Route path="/students/:studentId/detail" element={<StudentDetails />} />

        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default redirect */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </BrowserRouter>
  );
}
