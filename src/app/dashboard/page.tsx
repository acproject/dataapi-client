"user client";
import { useAuth } from '@/hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Dashboard() {
  const { token, logout } = useAuth();
  
  const { data: userData } = useQuery({
    queryKey: ['user', token],
    queryFn: async () => {
     const response = await axios.get('http://localhost:8080/api/user', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    },
    enabled: !!token

});

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Welcome, {userData?.data.username}</h1>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button 
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  );
}