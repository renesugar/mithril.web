import { schema } from 'normalizr';

export const role = new schema.Entity('roles');
export const client = new schema.Entity('clients');

export const userRole = new schema.Entity('userRoles', {
  client_id: client,
  role_id: role,
});
export const userFactor = new schema.Entity('userFactors');

export const user = new schema.Entity('users', {
  roles: [userRole],
  factors: [userFactor],
});

export const clientType = new schema.Entity('clientTypes');
export const token = new schema.Entity('tokens');
export const approval = new schema.Entity('approvals');

