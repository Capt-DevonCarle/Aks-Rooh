import api, { ApiError } from './api';

describe('api client', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('sends bearer tokens without leaking the token as a fetch option', async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ entries: [] }),
    });

    await api.entries('session-token');

    expect(global.fetch).toHaveBeenCalledWith(
      'http://127.0.0.1:4000/api/entries',
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: 'Bearer session-token' }),
      }),
    );
    expect(global.fetch.mock.calls[0][1]).not.toHaveProperty('token');
  });

  it('preserves the HTTP status when the API rejects a request', async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Session expired.' }),
    });

    await expect(api.entries('session-token')).rejects.toEqual(
      expect.objectContaining({
        name: 'ApiError',
        message: 'Session expired.',
        status: 401,
      }),
    );
  });

  it('returns null for successful no-content responses', async () => {
    global.fetch.mockResolvedValue({ ok: true, status: 204 });

    await expect(api.deleteEntry('session-token', 'entry-id')).resolves.toBeNull();
  });
});
