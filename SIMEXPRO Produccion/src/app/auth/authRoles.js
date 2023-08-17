/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin', 'Gerente de Operaciones'],
  staff: ['admin', 'staff','Gerente de Operaciones'],
  user: ['admin', 'staff', 'user','Gerente de Operaciones'],
  onlyGuest: [],
};


export default authRoles;
