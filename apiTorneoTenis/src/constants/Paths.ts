/**
 * Express router paths go here.
 */


export default {
  Base: '/api',
  Tenistas: {
    Base: '/tenistas',
    Get: '', // GET
    ById: '/:id',
    Add: '', // POST
    Update: '', // PATCH
    Delete: '/:id', // DELETE
  },
  Partidos: {
    Base: '/partidos',
    Get: '', // GET
    Byid: '/:id',
    Add: '', // POST
    Update: '', // PATCH
    Delete: '/:id', // DELETE
  },
} as const;