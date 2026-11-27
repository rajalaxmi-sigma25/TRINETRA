import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  KeyRound,
  Plus,
  Search,
  Check,
  X,
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
  AlertCircle
} from 'lucide-react';
import { User, UserRole } from '../types';

export const AdminUsersPage: React.FC = () => {
  const { users, addUser, toggleUserActive, permissions, updateRolePermission } = useData();
  const { currentRole } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();

  const [activeTab, setActiveTab] = useState<'users' | 'permissions'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New user form state
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('police');
  const [newBadge, setNewBadge] = useState('POL-DEMO-99');
  const [newDept, setNewDept] = useState('State Police • Cyber Crime Cell');

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab === 'permissions') setActiveTab('permissions');
    else if (tab === 'users') setActiveTab('users');
  }, [searchParams]);

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.badgeNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    addUser({
      name: `${newName} (Demo)`,
      email: newEmail,
      role: newRole,
      badgeNumber: newBadge,
      department: newDept,
      active: true,
    });

    setShowAddModal(false);
    setNewName('');
    setNewEmail('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Identity & Role Permission Management
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/60 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-900/60">
              ADMINISTRATIVE CONSOLE
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supervise user lifecycles, configure access permissions, and enforce separation of duties.
          </p>
        </div>

        {activeTab === 'users' && (
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Provision Demo User</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 dark:border-darkborder pb-3">
        <button
          onClick={() => {
            setActiveTab('users');
            setSearchParams({ tab: 'users' });
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'users'
              ? 'bg-navy-900 dark:bg-chakra-600 text-white shadow-sm'
              : 'bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-slate-600 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>User Accounts ({users.length})</span>
        </button>
        <button
          onClick={() => {
            setActiveTab('permissions');
            setSearchParams({ tab: 'permissions' });
          }}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'permissions'
              ? 'bg-navy-900 dark:bg-chakra-600 text-white shadow-sm'
              : 'bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder text-slate-600 dark:text-slate-400 hover:bg-slate-50'
          }`}
        >
          <KeyRound className="w-4 h-4" />
          <span>Role Permission Matrix</span>
        </button>
      </div>

      {/* USER ACCOUNTS TAB */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search user name, email, badge..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-3 px-4">User ID</th>
                    <th className="py-3 px-4">Full Name</th>
                    <th className="py-3 px-4">Demo Email</th>
                    <th className="py-3 px-4">Assigned Role</th>
                    <th className="py-3 px-4">Badge Number</th>
                    <th className="py-3 px-4">Department Division</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                        {u.id}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-100">
                        {u.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-300">
                        {u.email}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="capitalize px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                        {u.badgeNumber}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">
                        {u.department}
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            u.active
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300'
                              : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300'
                          }`}
                        >
                          {u.active ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => toggleUserActive(u.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            u.active
                              ? 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 hover:bg-rose-100'
                              : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 hover:bg-emerald-100'
                          }`}
                        >
                          {u.active ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ROLE PERMISSION MATRIX TAB */}
      {activeTab === 'permissions' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-800 dark:text-amber-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>
              <strong>Academic RBAC Matrix:</strong> Modifying permissions here directly affects role capabilities in live application state.
            </span>
          </div>

          <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
                  <tr>
                    <th className="py-4 px-6">Authorized Stakeholder Role</th>
                    <th className="py-4 px-4 text-center">VIEW Records</th>
                    <th className="py-4 px-4 text-center">CREATE Entries</th>
                    <th className="py-4 px-4 text-center">UPDATE Permitted Data</th>
                    <th className="py-4 px-4 text-center">DELETE Authority</th>
                    <th className="py-4 px-6">Role Scope Mandate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {permissions.map((perm) => (
                    <tr key={perm.role} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-bold text-sm text-navy-900 dark:text-white block">
                          {perm.roleName}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 uppercase">
                          role: {perm.role}
                        </span>
                      </td>

                      {/* View Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canView}
                          onChange={(e) => updateRolePermission(perm.role, 'canView', e.target.checked)}
                          className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
                        />
                      </td>

                      {/* Create Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canCreate}
                          onChange={(e) => updateRolePermission(perm.role, 'canCreate', e.target.checked)}
                          className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
                        />
                      </td>

                      {/* Update Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canUpdate}
                          onChange={(e) => updateRolePermission(perm.role, 'canUpdate', e.target.checked)}
                          className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
                        />
                      </td>

                      {/* Delete Checkbox */}
                      <td className="py-4 px-4 text-center">
                        <input
                          type="checkbox"
                          checked={perm.canDelete}
                          onChange={(e) => updateRolePermission(perm.role, 'canDelete', e.target.checked)}
                          className="w-4 h-4 accent-chakra-600 rounded cursor-pointer"
                        />
                      </td>

                      <td className="py-4 px-6 text-slate-600 dark:text-slate-400 text-xs leading-relaxed max-w-sm">
                        {perm.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Provision New Demo User Account
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Officer Sunita Rao"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="name.officer@trinetra.demo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Role Jurisdiction</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="police">Police Officer</option>
                    <option value="cbi">CBI Officer</option>
                    <option value="jailer">Jailer</option>
                    <option value="court">Court User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Badge Number</label>
                  <input
                    type="text"
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department Division</label>
                <input
                  type="text"
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold hover:bg-navy-800"
                >
                  Provision User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
