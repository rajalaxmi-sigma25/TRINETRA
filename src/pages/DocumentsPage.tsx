import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import {
  FolderOpen,
  Search,
  Filter,
  Plus,
  FileText,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  X,
  Upload,
  Clock
} from 'lucide-react';
import { DocumentRecord } from '../types';
import { useNavigate } from 'react-router-dom';

export const DocumentsPage: React.FC = () => {
  const { documents, uploadDocument, verifyDocument, cases } = useData();
  const { canPerformAction, currentUser } = useAuth();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New doc form
  const [newTitle, setNewTitle] = useState('');
  const [newCaseId, setNewCaseId] = useState('CASE-101');
  const [newDocType, setNewDocType] = useState<DocumentRecord['documentType']>('Case Report');
  const [newFileSize, setNewFileSize] = useState('1.8 MB');

  const filteredDocs = documents.filter((d) => {
    const matchesSearch =
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.relatedCaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'All' || d.documentType === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    uploadDocument({
      title: newTitle,
      relatedCaseId: newCaseId,
      documentType: newDocType,
      uploadedBy: currentUser?.name || 'Authorized Officer (Demo)',
      fileSize: newFileSize,
    });

    setShowUploadModal(false);
    setNewTitle('');
  };

  const handleVerify = (status: 'Verified' | 'Flagged') => {
    if (!selectedDoc) return;
    verifyDocument(selectedDoc.id, status);
    setSelectedDoc({ ...selectedDoc, verificationStatus: status });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-navy-900 dark:text-white">
              Court Documents & Evidentiary Index
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900/60">
              LEGAL EXHIBITS
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maintain digitized forensic audit reports, hearing notices, proceeding notes, and referral documents.
          </p>
        </div>

        {canPerformAction('create') && (
          <button
            onClick={() => setShowUploadModal(true)}
            className="px-4 py-2.5 rounded-xl bg-navy-900 dark:bg-chakra-600 text-white font-semibold text-xs shadow-md transition-colors flex items-center gap-2 self-start"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Demo Document</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="p-4 bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search document ID, title, case, uploader..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-navy-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-chakra-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-500 font-medium">Type:</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-xs text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Types</option>
            <option value="Case Referral Document">Case Referral Document</option>
            <option value="Hearing Notice">Hearing Notice</option>
            <option value="Proceeding Note">Proceeding Note</option>
            <option value="Case Report">Case Report</option>
            <option value="Other Demo Document">Other Demo Document</option>
          </select>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-subtle overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-darkcard2 border-b border-slate-200 dark:border-darkborder text-slate-500 dark:text-slate-400 uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Document ID</th>
                <th className="py-3 px-4">Document Title</th>
                <th className="py-3 px-4">Related Case</th>
                <th className="py-3 px-4">Document Type</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4">Upload Date</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredDocs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No matching court documents found.
                  </td>
                </tr>
              ) : (
                filteredDocs.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-navy-900 dark:text-white">
                      {doc.id}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-chakra-500 shrink-0" />
                        <span className="line-clamp-1">{doc.title}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/app/cases?selected=${doc.relatedCaseId}`);
                        }}
                        className="font-mono text-xs text-chakra-600 dark:text-chakra-400 hover:underline"
                      >
                        {doc.relatedCaseId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                      {doc.documentType}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">
                      {doc.uploadedBy}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                      {doc.uploadDate}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${
                          doc.verificationStatus === 'Verified'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : doc.verificationStatus === 'Pending'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300'
                            : 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/60 dark:text-rose-300'
                        }`}
                      >
                        {doc.verificationStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoc(doc);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-chakra-600 dark:text-chakra-400 hover:bg-chakra-50 font-medium text-xs inline-flex items-center gap-1"
                      >
                        <span>View</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Detail Modal */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-xl bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 dark:text-white text-base">
                    {selectedDoc.id}: {selectedDoc.title}
                  </h3>
                  <p className="text-xs text-slate-500">Case Record: {selectedDoc.relatedCaseId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDoc(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Verification Status</span>
                  <p className="font-bold text-sm text-navy-900 dark:text-white mt-0.5">
                    {selectedDoc.verificationStatus}
                  </p>
                </div>
                {canPerformAction('update') && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleVerify('Verified')}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                    >
                      Verify Exhibit
                    </button>
                    <button
                      onClick={() => handleVerify('Flagged')}
                      className="px-3 py-1 rounded-lg bg-rose-600 text-white font-medium hover:bg-rose-700"
                    >
                      Flag Discrepancy
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Document Type</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedDoc.documentType}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">File Size</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedDoc.fileSize}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Uploaded By</span>
                  <p className="font-semibold text-navy-900 dark:text-white mt-1">{selectedDoc.uploadedBy}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Upload Date</span>
                  <p className="font-semibold font-mono text-navy-900 dark:text-white mt-1">{selectedDoc.uploadDate}</p>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center py-6">
                <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <p className="font-semibold text-navy-900 dark:text-white">Simulated Electronic PDF Document Preview</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  SHA256: 9e4f...b381 • Certified Electronic Evidence Format (BNSS Sec 105 Compliant)
                </p>
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-darkborder flex justify-end">
              <button
                onClick={() => setSelectedDoc(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-darkcard border border-slate-200 dark:border-darkborder rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-darkborder flex items-center justify-between">
              <h3 className="font-bold text-navy-900 dark:text-white text-base">
                Upload Demo Case Exhibit / Document
              </h3>
              <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="p-5 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Document Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Digital Ledger Seizure Memorandum"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Related Case</label>
                <select
                  value={newCaseId}
                  onChange={(e) => setNewCaseId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white font-mono"
                >
                  {cases.map((c) => (
                    <option key={c.id} value={c.id}>{c.id} - {c.title}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Document Type</label>
                  <select
                    value={newDocType}
                    onChange={(e) => setNewDocType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  >
                    <option value="Case Referral Document">Case Referral Document</option>
                    <option value="Hearing Notice">Hearing Notice</option>
                    <option value="Proceeding Note">Proceeding Note</option>
                    <option value="Case Report">Case Report</option>
                    <option value="Other Demo Document">Other Demo Document</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Simulated File Size</label>
                  <input
                    type="text"
                    value={newFileSize}
                    onChange={(e) => setNewFileSize(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-darkborder bg-slate-50 dark:bg-darkbg text-navy-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-chakra-600 text-white font-semibold hover:bg-chakra-700"
                >
                  Index Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
