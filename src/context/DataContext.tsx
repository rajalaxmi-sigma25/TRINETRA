import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  CaseRecord,
  FIRRecord,
  CriminalRecord,
  PrisonerRecord,
  CourtCaseRecord,
  HearingRecord,
  DocumentRecord,
  NotificationItem,
  AuditLogItem,
  RolePermissions,
  SmartAlertItem,
  CaseStatus,
  HearingStatus
} from '../types';
import {
  INITIAL_CASES,
  INITIAL_FIRS,
  INITIAL_CRIMINALS,
  INITIAL_PRISONERS,
  INITIAL_COURT_CASES,
  INITIAL_HEARINGS,
  INITIAL_DOCUMENTS,
  INITIAL_NOTIFICATIONS,
  INITIAL_AUDIT_LOGS,
  INITIAL_PERMISSIONS,
  SMART_ALERTS,
  INITIAL_USERS
} from '../data/mockData';
import { User } from '../types';

interface DataContextType {
  cases: CaseRecord[];
  firs: FIRRecord[];
  criminals: CriminalRecord[];
  prisoners: PrisonerRecord[];
  courtCases: CourtCaseRecord[];
  hearings: HearingRecord[];
  documents: DocumentRecord[];
  notifications: NotificationItem[];
  auditLogs: AuditLogItem[];
  permissions: RolePermissions[];
  alerts: SmartAlertItem[];
  users: User[];
  
  // Actions
  addFir: (fir: Omit<FIRRecord, 'id' | 'lastUpdated'>) => string;
  addCase: (caseItem: Omit<CaseRecord, 'id' | 'lastUpdated' | 'registeredDate' | 'timelineEvents'>) => string;
  updateCaseStatus: (caseId: string, status: CaseStatus, userName: string, roleName: string) => void;
  addCriminal: (criminal: Omit<CriminalRecord, 'id' | 'lastUpdated'>) => string;
  addPrisoner: (prisoner: Omit<PrisonerRecord, 'id' | 'lastUpdated'>) => string;
  updatePrisonerStatus: (prisonerId: string, status: PrisonerRecord['status']) => void;
  addHearing: (hearing: Omit<HearingRecord, 'id'>) => string;
  updateHearingStatus: (hearingId: string, status: HearingStatus) => void;
  uploadDocument: (doc: Omit<DocumentRecord, 'id' | 'uploadDate' | 'verificationStatus'>) => string;
  verifyDocument: (docId: string, status: 'Verified' | 'Flagged') => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  logAudit: (user: string, role: string, action: AuditLogItem['action'], record: string, module: AuditLogItem['module'], details?: string) => void;
  addUser: (user: Omit<User, 'id'>) => void;
  toggleUserActive: (userId: string) => void;
  updateRolePermission: (role: string, field: 'canView' | 'canCreate' | 'canUpdate' | 'canDelete', val: boolean) => void;
  resetAllDemoData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cases, setCases] = useState<CaseRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_cases');
    return saved ? JSON.parse(saved) : INITIAL_CASES;
  });

  const [firs, setFirs] = useState<FIRRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_firs');
    return saved ? JSON.parse(saved) : INITIAL_FIRS;
  });

  const [criminals, setCriminals] = useState<CriminalRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_criminals');
    return saved ? JSON.parse(saved) : INITIAL_CRIMINALS;
  });

  const [prisoners, setPrisoners] = useState<PrisonerRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_prisoners');
    return saved ? JSON.parse(saved) : INITIAL_PRISONERS;
  });

  const [courtCases, setCourtCases] = useState<CourtCaseRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_court_cases');
    return saved ? JSON.parse(saved) : INITIAL_COURT_CASES;
  });

  const [hearings, setHearings] = useState<HearingRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_hearings');
    return saved ? JSON.parse(saved) : INITIAL_HEARINGS;
  });

  const [documents, setDocuments] = useState<DocumentRecord[]>(() => {
    const saved = localStorage.getItem('trinetra_documents');
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('trinetra_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    const saved = localStorage.getItem('trinetra_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [permissions, setPermissions] = useState<RolePermissions[]>(() => {
    const saved = localStorage.getItem('trinetra_permissions');
    return saved ? JSON.parse(saved) : INITIAL_PERMISSIONS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('trinetra_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [alerts] = useState<SmartAlertItem[]>(SMART_ALERTS);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('trinetra_cases', JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem('trinetra_firs', JSON.stringify(firs));
  }, [firs]);

  useEffect(() => {
    localStorage.setItem('trinetra_criminals', JSON.stringify(criminals));
  }, [criminals]);

  useEffect(() => {
    localStorage.setItem('trinetra_prisoners', JSON.stringify(prisoners));
  }, [prisoners]);

  useEffect(() => {
    localStorage.setItem('trinetra_court_cases', JSON.stringify(courtCases));
  }, [courtCases]);

  useEffect(() => {
    localStorage.setItem('trinetra_hearings', JSON.stringify(hearings));
  }, [hearings]);

  useEffect(() => {
    localStorage.setItem('trinetra_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('trinetra_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('trinetra_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('trinetra_permissions', JSON.stringify(permissions));
  }, [permissions]);

  useEffect(() => {
    localStorage.setItem('trinetra_users', JSON.stringify(users));
  }, [users]);

  const logAudit = (
    user: string,
    role: string,
    action: AuditLogItem['action'],
    record: string,
    module: AuditLogItem['module'],
    details?: string
  ) => {
    const newLog: AuditLogItem = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user,
      role,
      action,
      relatedRecord: record,
      module,
      details: details || `Performed ${action} operation on ${record}`,
      ipAddress: '10.15.8.42 (Local Portal)'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const addFir = (data: Omit<FIRRecord, 'id' | 'lastUpdated'>): string => {
    const newId = `FIR-${Math.floor(205 + firs.length)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newFir: FIRRecord = {
      ...data,
      id: newId,
      firNumber: newId,
      lastUpdated: now,
    };
    setFirs((prev) => [newFir, ...prev]);
    logAudit('Authorized User', 'Police Officer', 'Created', newId, 'FIR', `Registered new demo FIR ${newId}`);
    return newId;
  };

  const addCase = (data: Omit<CaseRecord, 'id' | 'lastUpdated' | 'registeredDate' | 'timelineEvents'>): string => {
    const newId = `CASE-${Math.floor(105 + cases.length)}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 10);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newCase: CaseRecord = {
      ...data,
      id: newId,
      registeredDate: now,
      lastUpdated: `${now} ${timeNow}`,
      timelineEvents: [
        {
          id: `EVT-${Date.now()}`,
          date: now,
          time: timeNow,
          userRole: 'Investigating Officer',
          action: 'Case Registered',
          description: `Formal digital case initialized linked to ${data.firNumber}.`,
          statusTag: 'Registered',
        }
      ]
    };
    setCases((prev) => [newCase, ...prev]);
    logAudit('Authorized User', 'Police Officer', 'Created', newId, 'Case', `Initialized new demo case ${newId}`);
    return newId;
  };

  const updateCaseStatus = (caseId: string, status: CaseStatus, userName: string, roleName: string) => {
    const now = new Date().toISOString().replace('T', ' ').substring(0, 10);
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setCases((prev) =>
      prev.map((c) => {
        if (c.id === caseId) {
          const newEvent = {
            id: `EVT-${Date.now()}`,
            date: now,
            time: timeNow,
            userRole: roleName,
            action: `Status transitioned to ${status}`,
            description: `Case progression updated by ${userName}.`,
            statusTag: status,
          };
          return {
            ...c,
            status,
            lastUpdated: `${now} ${timeNow}`,
            timelineEvents: [...c.timelineEvents, newEvent],
          };
        }
        return c;
      })
    );
    logAudit(userName, roleName, 'Status Changed', caseId, 'Case', `Transitioned status to ${status}`);
  };

  const addCriminal = (data: Omit<CriminalRecord, 'id' | 'lastUpdated'>): string => {
    const newId = `CR-${String(criminals.length + 18).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newCrim: CriminalRecord = {
      ...data,
      id: newId,
      lastUpdated: now,
    };
    setCriminals((prev) => [newCrim, ...prev]);
    logAudit('Authorized Officer', 'Police Officer', 'Created', newId, 'Criminal', `Cataloged demo profile ${newId}`);
    return newId;
  };

  const addPrisoner = (data: Omit<PrisonerRecord, 'id' | 'lastUpdated'>): string => {
    const newId = `PR-${String(prisoners.length + 10).padStart(3, '0')}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 16);
    const newPris: PrisonerRecord = {
      ...data,
      id: newId,
      lastUpdated: now,
    };
    setPrisoners((prev) => [newPris, ...prev]);
    logAudit('Superintendent (Demo)', 'Jailer', 'Created', newId, 'Prisoner', `Admitted demo prisoner ${newId}`);
    return newId;
  };

  const updatePrisonerStatus = (prisonerId: string, status: PrisonerRecord['status']) => {
    setPrisoners((prev) =>
      prev.map((p) => (p.id === prisonerId ? { ...p, status, lastUpdated: new Date().toISOString().replace('T', ' ').substring(0, 16) } : p))
    );
    logAudit('Superintendent (Demo)', 'Jailer', 'Status Changed', prisonerId, 'Prisoner', `Updated inmate status to ${status}`);
  };

  const addHearing = (data: Omit<HearingRecord, 'id'>): string => {
    const newId = `HEAR-${String(hearings.length + 4).padStart(3, '0')}`;
    const newHearing: HearingRecord = {
      ...data,
      id: newId,
    };
    setHearings((prev) => [newHearing, ...prev]);
    logAudit('Registrar (Demo)', 'Court User', 'Created', newId, 'Hearing', `Scheduled hearing docket ${newId}`);
    return newId;
  };

  const updateHearingStatus = (hearingId: string, status: HearingStatus) => {
    setHearings((prev) =>
      prev.map((h) => (h.id === hearingId ? { ...h, status } : h))
    );
    logAudit('Registrar (Demo)', 'Court User', 'Status Changed', hearingId, 'Hearing', `Updated hearing status to ${status}`);
  };

  const uploadDocument = (data: Omit<DocumentRecord, 'id' | 'uploadDate' | 'verificationStatus'>): string => {
    const newId = `DOC-${505 + documents.length}`;
    const now = new Date().toISOString().replace('T', ' ').substring(0, 10);
    const newDoc: DocumentRecord = {
      ...data,
      id: newId,
      uploadDate: now,
      verificationStatus: 'Pending',
    };
    setDocuments((prev) => [newDoc, ...prev]);
    logAudit('Authorized User', 'Court User', 'Created', newId, 'Document', `Uploaded court demo document ${newId}`);
    return newId;
  };

  const verifyDocument = (docId: string, status: 'Verified' | 'Flagged') => {
    setDocuments((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, verificationStatus: status } : d))
    );
    logAudit('Registrar (Demo)', 'Court User', 'Updated', docId, 'Document', `Marked verification status as ${status}`);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addUser = (userData: Omit<User, 'id'>) => {
    const newId = `USR-${String(users.length + 6).padStart(3, '0')}`;
    const newUser: User = { ...userData, id: newId };
    setUsers((prev) => [...prev, newUser]);
    logAudit('Administrator (Demo)', 'Admin', 'Created', newId, 'User', `Created user account for ${userData.name}`);
  };

  const toggleUserActive = (userId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextActive = !u.active;
          logAudit('Administrator (Demo)', 'Admin', 'Status Changed', userId, 'User', `Set user status to ${nextActive ? 'Active' : 'Inactive'}`);
          return { ...u, active: nextActive };
        }
        return u;
      })
    );
  };

  const updateRolePermission = (role: string, field: 'canView' | 'canCreate' | 'canUpdate' | 'canDelete', val: boolean) => {
    setPermissions((prev) =>
      prev.map((p) => (p.role === role ? { ...p, [field]: val } : p))
    );
    logAudit('Administrator (Demo)', 'Admin', 'Updated', role, 'System', `Modified permission ${field} to ${val}`);
  };

  const resetAllDemoData = () => {
    setCases(INITIAL_CASES);
    setFirs(INITIAL_FIRS);
    setCriminals(INITIAL_CRIMINALS);
    setPrisoners(INITIAL_PRISONERS);
    setCourtCases(INITIAL_COURT_CASES);
    setHearings(INITIAL_HEARINGS);
    setDocuments(INITIAL_DOCUMENTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setPermissions(INITIAL_PERMISSIONS);
    setUsers(INITIAL_USERS);
    localStorage.clear();
  };

  return (
    <DataContext.Provider
      value={{
        cases,
        firs,
        criminals,
        prisoners,
        courtCases,
        hearings,
        documents,
        notifications,
        auditLogs,
        permissions,
        alerts,
        users,
        addFir,
        addCase,
        updateCaseStatus,
        addCriminal,
        addPrisoner,
        updatePrisonerStatus,
        addHearing,
        updateHearingStatus,
        uploadDocument,
        verifyDocument,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        logAudit,
        addUser,
        toggleUserActive,
        updateRolePermission,
        resetAllDemoData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
