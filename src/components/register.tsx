import { Building, Eye, EyeOff, Lock, Mail, Truck, User } from 'lucide-react';
import React, { useState } from 'react';

interface SignupProps {
  onNavigateToLogin: () => void;
}

export default function SignUp({ onNavigateToLogin }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-screen w-screen overflow-auto md:overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full md:max-w-[70vw] grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT: Minimal Branding */}
        <div className="hidden lg:flex flex-col justify-center">
          <div className="space-y-12">
            {/* Logo + Name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                <Truck className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Carly</h1>
            </div>

            {/* Tagline */}
            <div className="max-w-md">
              <h2 className="text-4xl font-bold text-gray-800 leading-tight">
                Fleet management,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"> simplified.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                One platform. Full control. Zero complexity.
              </p>
            </div>

            {/* Soft decorative element */}
            <div className="relative">
              <div className="absolute inset-0 blur-3xl opacity-30">
                <div className="w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
                <div className="absolute top-20 left-40 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: Clean Form */}
        <div className="w-full md:max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-xl shadow-sm md:shadow-lg rounded-3xl p-4 md:p-10 border border-white/20">

            {/* Mobile Logo */}
            <div className="flex lg:hidden justify-center mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center">
                <Truck className="w-9 h-9 text-white" />
              </div>
            </div>

            <h2 className="md:flex hidden text-3xl font-bold text-gray-900 text-center lg:text-left">
              Welcome to Truckly
            </h2>
            <p className="mt-2 text-gray-600 text-center lg:text-left">
              Create your account in seconds
            </p>

            <form className="mt-8 space-y-6">
              <div className="space-y-5">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/70 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-800 placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/70 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-4 bg-gray-50/70 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full pl-12 pr-14 py-4 bg-gray-50/70 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder-gray-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-2xl hover:shadow-xl transition transform hover:-translate-y-1"
              >
                Create Account
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <button
                onClick={onNavigateToLogin}
                className="font-semibold text-blue-600 hover:text-blue-700 transition"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}