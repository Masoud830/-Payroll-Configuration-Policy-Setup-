import type { PayrollConfigResourceSlug } from './resources';

export type NormalizedSystemRole =
  | 'DEPARTMENT_EMPLOYEE'
  | 'DEPARTMENT_HEAD'
  | 'HR_MANAGER'
  | 'HR_EMPLOYEE'
  | 'HR_ADMIN'
  | 'SYSTEM_ADMIN'
  | 'PAYROLL_SPECIALIST'
  | 'PAYROLL_MANAGER'
  | 'LEGAL_POLICY_ADMIN'
  | 'FINANCE_STAFF';

export type PayrollRolePermissions = {
  canAccessModule: boolean;
  canSeeResource: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canApproveReject: boolean;
};

export function normalizeRole(rawRole: string | null): NormalizedSystemRole | null {
  if (!rawRole) return null;
  // Normalize: uppercase, replace spaces/hyphens with underscores, remove special chars
  const normalized = rawRole
    .toUpperCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_')
    .replace(/&/g, '')
    .trim();

  switch (normalized) {
    case 'DEPARTMENT_EMPLOYEE':
    case 'DEPARTMENT_HEAD':
    case 'HR_MANAGER':
    case 'HR_EMPLOYEE':
    case 'HR_ADMIN':
    case 'SYSTEM_ADMIN':
    case 'PAYROLL_SPECIALIST':
    case 'PAYROLL_MANAGER':
    case 'LEGAL_POLICY_ADMIN':
    case 'FINANCE_STAFF':
      return normalized;
    default:
      // Try to map common variations
      if (normalized.includes('HR') && normalized.includes('MANAGER')) return 'HR_MANAGER';
      if (normalized.includes('HR') && normalized.includes('ADMIN')) return 'HR_ADMIN';
      if (normalized.includes('HR') && normalized.includes('EMPLOYEE')) return 'HR_EMPLOYEE';
      if (normalized.includes('SYSTEM') && normalized.includes('ADMIN')) return 'SYSTEM_ADMIN';
      if (normalized.includes('DEPARTMENT') && normalized.includes('HEAD')) return 'DEPARTMENT_HEAD';
      if (normalized.includes('DEPARTMENT') && normalized.includes('EMPLOYEE')) return 'DEPARTMENT_EMPLOYEE';
      if (normalized.includes('PAYROLL') && normalized.includes('MANAGER')) return 'PAYROLL_MANAGER';
      if (normalized.includes('PAYROLL') && normalized.includes('SPECIALIST')) return 'PAYROLL_SPECIALIST';
      if (normalized.includes('LEGAL') && normalized.includes('POLICY') && normalized.includes('ADMIN')) return 'LEGAL_POLICY_ADMIN';
      if (normalized.includes('FINANCE')) return 'FINANCE_STAFF';
      return null;
  }
}

export function getPayrollPermissions(
  role: NormalizedSystemRole | null,
  resource: PayrollConfigResourceSlug,
): PayrollRolePermissions {
  // Default: no access
  if (!role) {
    return {
      canAccessModule: false,
      canSeeResource: false,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canApproveReject: false,
    };
  }

  // All payroll-related roles can open the Payroll Configuration module itself
  const base: PayrollRolePermissions = {
    canAccessModule: true,
    canSeeResource: false,
    canCreate: false,
    canEdit: false,
    canDelete: false,
    canApproveReject: false,
  };

  switch (resource) {
    case 'pay-grades': {
      // PAYROLL_SPECIALIST: create, view, update
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'pay-types': {
      // PAYROLL_SPECIALIST: create, view, update
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'allowances': {
      // PAYROLL_SPECIALIST: create, view, update
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'tax-rules': {
      // LEGAL_POLICY_ADMIN: create, view, update
      return {
        ...base,
        canSeeResource: role === 'LEGAL_POLICY_ADMIN' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'LEGAL_POLICY_ADMIN' || role === 'SYSTEM_ADMIN',
        canEdit: role === 'LEGAL_POLICY_ADMIN' || role === 'SYSTEM_ADMIN',
        canDelete: false,
        canApproveReject: false,
      };
    }

    case 'payroll-policies': {
      // PAYROLL_SPECIALIST: create, view, update
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'signing-bonuses': {
      // PAYROLL_SPECIALIST: create, view, update
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'termination-resignation-benefits': {
      // PAYROLL_SPECIALIST: create, view, update (benefits)
      // PAYROLL_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'PAYROLL_MANAGER' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'DEPARTMENT_HEAD' || role === 'HR_MANAGER',
        canDelete: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'PAYROLL_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'insurance-brackets': {
      // PAYROLL_SPECIALIST: create, view, update
      // HR_MANAGER: approve, reject, delete
      return {
        ...base,
        canSeeResource: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER' || role === 'DEPARTMENT_HEAD' || role === 'SYSTEM_ADMIN',
        canCreate: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canEdit: role === 'PAYROLL_SPECIALIST' || role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canDelete: role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
        canApproveReject: role === 'HR_MANAGER' || role === 'SYSTEM_ADMIN',
      };
    }

    case 'company-wide-settings': {
      // SYSTEM_ADMIN: create and edit
      const canSee = role === 'SYSTEM_ADMIN';
      const canManage = role === 'SYSTEM_ADMIN';
      return {
        ...base,
        canSeeResource: canSee,
        canCreate: canManage,
        canEdit: canManage,
        canDelete: false,
        canApproveReject: false,
      };
    }

    default:
      return base;
  }
}
