'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Package, Users, DollarSign, BarChart3, PieChart, LineChart } from 'lucide-react'
import dynamic from 'next/dynamic'

const Bar = dynamic(() => import('react-chartjs-2').then(m => m.Bar), { ssr: false })
const Pie = dynamic(() => import('react-chartjs-2').then(m => m.Pie), { ssr: false })
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
)

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 24,
    categories: 6,
    pages: 12,
    users: 3
  })

  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Products Added',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  }

  const pieChartData = {
    labels: ['Electronics', 'Clothing', 'Home Goods', 'Books', 'Other'],
    datasets: [
      {
        label: 'Product Categories',
        data: [30, 25, 20, 15, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(34, 197, 94, 0.5)',
          'rgba(251, 191, 36, 0.5)',
          'rgba(239, 68, 68, 0.5)',
          'rgba(168, 85, 247, 0.5)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(251, 191, 36, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  const statCards = [
    { name: 'Products', value: stats.products, icon: Package, color: 'bg-blue-500' },
    { name: 'Categories', value: stats.categories, icon: BarChart3, color: 'bg-green-500' },
    { name: 'Pages', value: stats.pages, icon: PieChart, color: 'bg-yellow-500' },
    { name: 'Users', value: stats.users, icon: Users, color: 'bg-purple-500' },
  ]

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Dashboard</h1>
        <p className="text-gray-600 mt-2 text-lg">Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-gray-100 hover:border-blue-200 group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-7 w-7 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Products Added Over Time</h2>
            <LineChart className="h-6 w-6 text-blue-600" />
          </div>
          <Bar data={barChartData} />
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Product Categories Distribution</h2>
            <PieChart className="h-6 w-6 text-green-600" />
          </div>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Products</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl w-16 h-16 flex items-center justify-center">
                  <Package className="h-8 w-8 text-blue-600" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-base font-semibold text-gray-900">Product {i}</h3>
                  <p className="text-sm text-gray-500 mt-1">Category • In Stock</p>
                </div>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <span className="flex items-center justify-between">
                <span>Add New Product</span>
                <Package className="h-5 w-5" />
              </span>
            </button>
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-xl hover:from-green-100 hover:to-green-200 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <span className="flex items-center justify-between">
                <span>Create New Page</span>
                <PieChart className="h-5 w-5" />
              </span>
            </button>
            <button className="w-full text-left px-6 py-4 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all duration-300 font-semibold shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              <span className="flex items-center justify-between">
                <span>Add User</span>
                <Users className="h-5 w-5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}