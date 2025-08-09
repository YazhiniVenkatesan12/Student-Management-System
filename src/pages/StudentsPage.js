import React, { useEffect, useState } from 'react';
import { getStudents, addStudent, updateStudent, deleteStudent } from '../services/studentService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const emptyForm = {
  name: '', className: '', section: '', rollNumber: '', email: '', dob: '', phone: '', guardianName: '', guardianPhone: '', address: '', hostelType: '', yearOfAdmission: ''
};

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { fetchStudents(); }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getStudents();
      setStudents(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!form.name || !form.rollNumber) {
      toast.error('Provide name and roll number');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      if (editingId) {
        await updateStudent(editingId, form);
        toast.success('Updated');
      } else {
        await addStudent(form);
        toast.success('Added');
      }
      setForm(emptyForm);
      setFormVisible(false);
      setEditingId(null);
      fetchStudents();
    } catch (err) {
      console.error(err);
      toast.error('Save failed');
    }
  };

  const handleEdit = (s) => {
    setForm({
      name: s.name || '', className: s.className || '', section: s.section || '', rollNumber: s.rollNumber || '', email: s.email || '',
      dob: s.dob || '', phone: s.phone || '', guardianName: s.guardianName || '', guardianPhone: s.guardianPhone || '', address: s.address || '',
      hostelType: s.hostelType || '', yearOfAdmission: s.yearOfAdmission || ''
    });
    setEditingId(s.id);
    setFormVisible(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await deleteStudent(id);
      toast.success('Deleted');
      fetchStudents();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  const filtered = students.filter(s => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (s.name||'').toLowerCase().includes(q) || (s.rollNumber||'').toString().includes(q) || (s.email||'').toLowerCase().includes(q);
  });

  return (
    <div className='container mx-auto'>
      <ToastContainer position='top-right' autoClose={2500} />
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-semibold'>Students</h1>
        <div className='flex gap-2'>
          <input className='p-2 border rounded' placeholder='Search name/roll/email' value={search} onChange={e=>setSearch(e.target.value)} />
          <button className='bg-blue-600 text-white px-3 py-2 rounded' onClick={() => { setFormVisible(v=>!v); setForm(emptyForm); setEditingId(null); }}>{formVisible ? 'Close' : 'Add student'}</button>
        </div>
      </div>

      {formVisible && (
        <form className='bg-white p-4 rounded shadow mb-4' onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            <input name='name' value={form.name} onChange={handleChange} placeholder='Name' className='p-2 border rounded' />
            <input name='rollNumber' value={form.rollNumber} onChange={handleChange} placeholder='Roll Number' className='p-2 border rounded' />
            <input name='className' value={form.className} onChange={handleChange} placeholder='Class' className='p-2 border rounded' />
            <input name='section' value={form.section} onChange={handleChange} placeholder='Section' className='p-2 border rounded' />
            <input name='email' value={form.email} onChange={handleChange} placeholder='Email' className='p-2 border rounded' type='email' />
            <input name='phone' value={form.phone} onChange={handleChange} placeholder='Phone' className='p-2 border rounded' />
            <input name='dob' value={form.dob} onChange={handleChange} placeholder='DOB' className='p-2 border rounded' type='date' />
            <input name='guardianName' value={form.guardianName} onChange={handleChange} placeholder='Guardian Name' className='p-2 border rounded' />
            <input name='yearOfAdmission' value={form.yearOfAdmission} onChange={handleChange} placeholder='Year of Admission' className='p-2 border rounded' />
            <input name='address' value={form.address} onChange={handleChange} placeholder='Address' className='p-2 border rounded col-span-1 md:col-span-3' />
          </div>
          <div className='mt-3 flex justify-end gap-2'>
            <button type='button' className='px-3 py-2 border rounded' onClick={() => { setFormVisible(false); setForm(emptyForm); setEditingId(null); }}>Cancel</button>
            <button type='submit' className='px-3 py-2 bg-green-600 text-white rounded'>{editingId ? 'Update' : 'Create'}</button>
          </div>
        </form>
      )}

      <div className='bg-white rounded shadow overflow-auto'>
        {loading ? <div className='p-4'>Loading...</div> : (
          filtered.length === 0 ? <div className='p-4'>No students found.</div> : (
            <table className='min-w-full table-auto'>
              <thead className='bg-gray-100'>
                <tr>
                  <th className='px-4 py-2 text-left'>Name</th>
                  <th className='px-4 py-2 text-left'>Roll</th>
                  <th className='px-4 py-2 text-left'>Class</th>
                  <th className='px-4 py-2 text-left'>Email</th>
                  <th className='px-4 py-2 text-left'>Phone</th>
                  <th className='px-4 py-2 text-left'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className='border-t'>
                    <td className='px-4 py-2'>{s.name}</td>
                    <td className='px-4 py-2'>{s.rollNumber}</td>
                    <td className='px-4 py-2'>{s.className}</td>
                    <td className='px-4 py-2'>{s.email}</td>
                    <td className='px-4 py-2'>{s.phone}</td>
                    <td className='px-4 py-2 flex gap-2'>
                      <button className='px-2 py-1 border rounded' onClick={() => handleEdit(s)}>Edit</button>
                      <button className='px-2 py-1 border rounded text-red-600' onClick={() => handleDelete(s.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
}
