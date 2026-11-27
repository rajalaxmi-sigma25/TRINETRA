export type UserRole = 'police' | 'cbi' | 'jailer' | 'court' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  badgeNumber: string;
  department: string;
  avatar?: string;
  active: boolean;
}

export type CaseStatus = 'Registered' | 'Investigation' | 'Review' | 'Court Process' | 'Closed';
export type CasePriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type Agency = 'Police' | 'CBI';

export interface CaseEvent {
  id: string;
  date: string;
  time: string;
  userRole: string;
  action: string;
  description: string;
  statusTag?: string;
}

export interface CaseRecord {
  id: string;
  firNumber: string;
  title: string;
  category: string;
  status: CaseStatus;
  priority: CasePriority;
  assignedOfficer: string;
  assignedAgency: Agency;
  registeredDate: string;
  lastUpdated: string;
  accusedDemoNames: string[];
  complainant: string;
  linkedCriminalIds: string[];
  linkedPrisonerIds: string[];
  courtCaseId?: string;
  summary: string;
  timelineEvents: CaseEvent[];
}

export interface FIRRecord {
  id: string;
  firNumber: string;
  relatedCaseId?: string;
  date: string;
  time: string;
  category: string;
  complainant: string;
  accusedDemoName: string;
  incidentLocation: string;
  assignedOfficer: string;
  status: 'Registered' | 'Under Investigation' | 'Chargesheet Filed' | 'Closed';
  summary: string;
  sectionCode: string; // e.g. BNS-303, BNS-318
  lastUpdated: string;
}

export interface CriminalRecord {
  id: string;
  demoName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  category: string;
  status: 'Under Investigation' | 'In Custody' | 'On Bail' | 'Acquitted' | 'Convicted';
  relatedCaseIds: string[];
  lastUpdated: string;
  notes: string;
  biometricRegistered: boolean;
  demoFingerprintHash: string;
}

export interface PrisonerRecord {
  id: string;
  demoName: string;
  relatedCaseId: string;
  admissionDate: string;
  expectedReleaseDate: string;
  status: 'Active' | 'Released' | 'Transferred' | 'Pending';
  assignedFacility: string;
  cellBlock: string;
  securityLevel: 'Minimum' | 'Medium' | 'Maximum';
  behaviorScore: 'Good' | 'Satisfactory' | 'Review Required';
  paroleEligible: boolean;
  lastUpdated: string;
}

export type HearingStatus = 'Scheduled' | 'Completed' | 'Postponed' | 'Cancelled';

export interface HearingRecord {
  id: string;
  courtCaseId: string;
  relatedCaseId: string;
  hearingDate: string;
  hearingTime: string;
  hearingType: 'First Appearance' | 'Bail Hearing' | 'Framing of Charges' | 'Evidence Submission' | 'Final Arguments';
  demoCourtroom: string;
  status: HearingStatus;
  presidingOfficial: string;
  notes: string;
}

export interface CourtCaseRecord {
  id: string;
  relatedCaseId: string;
  firNumber: string;
  demoCourtName: string;
  judgeTitle: string;
  referralDate: string;
  courtStage: 'Charges Framed' | 'Evidence Hearing' | 'Final Arguments' | 'Judgment Pending' | 'Disposed';
  status: 'In Progress' | 'Hearing Scheduled' | 'Order Reserved' | 'Disposed';
  lastUpdated: string;
  hearingIds: string[];
  documentIds: string[];
}

export interface DocumentRecord {
  id: string;
  relatedCaseId: string;
  courtCaseId?: string;
  title: string;
  documentType: 'Case Referral Document' | 'Hearing Notice' | 'Proceeding Note' | 'Case Report' | 'Other Demo Document';
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  verificationStatus: 'Verified' | 'Pending' | 'Flagged';
  fileUrl?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'update' | 'hearing' | 'release' | 'case';
  linkRecordId?: string;
  linkModule?: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: 'Created' | 'Updated' | 'Viewed' | 'Status Changed' | 'Deleted' | 'Exported';
  relatedRecord: string;
  module: 'FIR' | 'Case' | 'Criminal' | 'Prisoner' | 'Court' | 'Hearing' | 'Document' | 'User' | 'System';
  details?: string;
  ipAddress: string;
}

export interface SmartAlertItem {
  id: string;
  title: string;
  message: string;
  severity: 'high' | 'medium' | 'info';
  relatedRecord: string;
  module: string;
  date: string;
}

export interface RolePermissions {
  role: UserRole;
  roleName: string;
  canView: boolean;
  canCreate: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  accessibleModules: string[];
  description: string;
}
