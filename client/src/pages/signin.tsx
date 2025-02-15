import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log({ email, password });
    // On successful sign-in, redirect to home page
    navigate('/');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-4">
      <div className="relative bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-white/20 transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-black mb-6">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 text-black border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-100 text-black border border-gray-400 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-md shadow-md font-bold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 text-white"
          >
            Sign In 🚀
          </button>
        </form>

        <p className="text-center text-sm text-black mt-4">
          <ul></ul>Sign up Here?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            sign up
          </Link>
         
        </p>
      </div>
    </div>
  );
};

export default Signin;