import { backendClients } from './backend-clients.js';

describe('backendClients', () => {
  it('should work', () => {
    expect(backendClients()).toEqual('backend-clients');
  });
});
