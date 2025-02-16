import React, { useState } from 'react';
import axios from 'axios';

function Report() {
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:5000/report', { description, user_id: 1 }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="report p-4 flex justify-center items-start min-h-screen">
      <div className="w-full max-w-sm p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Report</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;