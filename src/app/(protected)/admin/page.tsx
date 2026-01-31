'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  Activity,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  TrendingUp
} from 'lucide-react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'

// Mock Data for Overview
const systemStats = {
  totalUsers: 1420,
  verifiedUsers: 850,
  totalTransactions: 3200,
  revenue: "Rp 45.200.000"
}

// Chart Data
const userGrowthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 900 },
  { name: 'Apr', users: 1100 },
  { name: 'May', users: 1420 },
]

const revenueData = [
  { name: 'Jan', amount: 12000000 },
  { name: 'Feb', amount: 18500000 },
  { name: 'Mar', amount: 25000000 },
  { name: 'Apr', amount: 32000000 },
  { name: 'May', amount: 45200000 },
]

export default function AdminDashboard() {
  const [activePanel, setActivePanel] = useState('overview')
  const [apiHealth, setApiHealth] = useState([
    { name: "Auth Service", status: "online", latency: 45 },
    { name: "Database", status: "online", latency: 120 },
    { name: "Payment Gateway", status: "online", latency: 210 },
    { name: "Storage", status: "warning", latency: 850 },
  ])

  // Simulate Realtime API Health
  useEffect(() => {
    const interval = setInterval(() => {
      setApiHealth(prev => prev.map(api => ({
        ...api,
        latency: Math.max(20, api.latency + (Math.random() > 0.5 ? 10 : -10) + Math.floor(Math.random() * 20 - 10)),
        status: api.latency > 800 ? 'warning' : 'online'
      })))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in pb-10">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white capitalize">Overview</h2>
          <p className="text-slate-400 text-sm">Welcome back, Admin. Here is what is happening today.</p>
        </div>
        <div className="flex gap-4">
          <Button className="bg-amber-500 text-slate-900 hover:bg-amber-600">
            <BarChart3 className="w-4 h-4 mr-2" /> Download Report
          </Button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Users</p>
                <h3 className="text-2xl font-bold text-white">{systemStats.totalUsers}</h3>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Verified Accounts</p>
                <h3 className="text-2xl font-bold text-emerald-400">{systemStats.verifiedUsers}</h3>
              </div>
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total Transaksi</p>
                <h3 className="text-2xl font-bold text-amber-400">{systemStats.totalTransactions}</h3>
              </div>
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 text-sm mb-1">Revenue (MTD)</p>
                <h3 className="text-2xl font-bold text-white">{systemStats.revenue}</h3>
              </div>
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Growth: User Registered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="users" stroke="#f59e0b" strokeWidth={3} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                    formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* System Health */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-400" />
              Smart System Control
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {apiHealth.map((api, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-700">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${api.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                  <div>
                    <p className="text-slate-200 font-medium">{api.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-slate-500">Latency: {api.latency}ms</p>
                      <div className="h-1 w-16 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${api.latency < 200 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${Math.min(100, (api.latency / 1000) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white" onClick={() => {
                  const newHealth = [...apiHealth]
                  newHealth[idx] = { ...newHealth[idx], latency: Math.floor(Math.random() * 100) + 20, status: 'online' }
                  setApiHealth(newHealth)
                }}>
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Information Center */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Information Center
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="text-red-400 font-bold text-sm mb-1">Critical Alert</h4>
              <p className="text-slate-400 text-xs">High latency detected in Storage Service (Region ID-1). Automatic scaling initiated.</p>
            </div>
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="text-blue-400 font-bold text-sm mb-1">New User Spike</h4>
              <p className="text-slate-400 text-xs">Access rate increased by 45% in the last hour.</p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <h4 className="text-emerald-400 font-bold text-sm mb-1">System Healthy</h4>
              <p className="text-slate-400 text-xs">All core services are running optimally.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  return renderOverview()
}