export const mkstore = {
  alerts: {
    alerts: [
      {
        _id: '66851fdb905d2df27e9c02b6',
        session_id: 'session_id_01',
        stage: 0,
        title: 'Layer shift detected',
        description: 'Material overflow detected during printing.',
        type: 2,
        status: 0,
        action: [],
        created_at: '2024-07-03T09:54:35.531Z',
        __v: 0
      },
      {
        _id: '66851fdb905d2df27e9c02b9',
        session_id: 'session_id_02',
        stage: 2,
        title: 'Support structure missing',
        description: 'Material overflow detected during printing.',
        type: 1,
        status: 0,
        action: [],
        created_at: '2024-07-03T09:54:35.531Z',
        __v: 0
      },
      {
        _id: '66851fdb905d2df27e9c02af',
        session_id: 'session_id_03',
        stage: 3,
        title: 'Support structure missing',
        description: 'A layer shift has been detected in the print.',
        type: 0,
        status: 0,
        action: [],
        created_at: '2024-07-03T09:54:35.531Z',
        __v: 0
      },
      {
        _id: '66851fdb905d2df27e9c02a3',
        session_id: 'session_id_03',
        stage: 3,
        title: 'Support structure missing',
        description: 'A layer shift has been detected in the print.',
        type: 3,
        status: 0,
        action: [],
        created_at: '2024-07-03T09:54:35.531Z',
        __v: 0
      }
    ],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: '1',
    unresolvedCount: 4
  },
  sessions: {
    sessions: [
      {
        _id: 'session_id_01',
        name: 'Session 01',
        description: 'Description for session 01',
        workstation_id: 'workstation_1',
        client_id: 'client_1',
        status: 1,
        stages: [
          {
            stage: 0,
            status: 2,
            _id: '668477039684e2071a9f9c3a'
          },
          {
            stage: 1,
            status: 0,
            _id: '668477039684e2071a9f9c3b'
          },
          {
            stage: 2,
            status: 0,
            _id: '668477039684e2071a9f9c3c'
          },
          {
            stage: 3,
            status: 0,
            _id: '668477039684e2071a9f9c3d'
          }
        ],
        created_at: '2024-07-02T21:54:11.420Z',
        created_by: 'creator_1',
        operator: 'operator_1',
        has_build_plan: false,
        has_stl_files: false,
        last_updated: '2024-07-04T00:12:31.584Z',
        __v: 0
      },
      {
        _id: 'session_id_03',
        name: 'Session 3',
        description: 'Description for session 3',
        workstation_id: 'workstation_4',
        client_id: 'client_4',
        status: 1,
        stages: [
          {
            stage: 0,
            status: 2,
            _id: '668477039684e2071a9f9c49'
          },
          {
            stage: 1,
            status: 1,
            _id: '668477039684e2071a9f9c4a'
          },
          {
            stage: 2,
            status: 0,
            _id: '668477039684e2071a9f9c4b'
          },
          {
            stage: 3,
            status: 0,
            _id: '668477039684e2071a9f9c4c'
          }
        ],
        created_at: '2024-07-02T21:54:11.420Z',
        created_by: 'creator_4',
        operator: 'operator_4',
        has_build_plan: true,
        has_stl_files: true,
        last_updated: '2024-07-02T21:54:11.439Z',
        __v: 0
      },
      {
        _id: 'session_id_02',
        name: 'Session 2',
        description: 'Description for session 2',
        workstation_id: 'workstation_5',
        client_id: 'client_5',
        status: 1,
        stages: [
          {
            stage: 0,
            status: 2,
            _id: '668477039684e2071a9f9c4e'
          },
          {
            stage: 1,
            status: 1,
            _id: '668477039684e2071a9f9c4f'
          },
          {
            stage: 2,
            status: 0,
            _id: '668477039684e2071a9f9c50'
          },
          {
            stage: 3,
            status: 0,
            _id: '668477039684e2071a9f9c51'
          }
        ],
        created_at: '2024-07-02T21:54:11.420Z',
        created_by: 'creator_5',
        operator: 'operator_5',
        has_build_plan: false,
        has_stl_files: true,
        last_updated: '2024-07-02T21:54:11.439Z',
        __v: 0
      }
    ],
    loading: false,
    error: null,
    totalPages: 1,
    currentPage: '1'
  },
  auth: {
    user: {
      userId: '6683b535b887f13aa0c7e82d',
      role: 0,
      email: 'admin_03@cogniman.eu',
      iat: 1720083703,
      exp: 1722675703
    },
    error: null,
    loginAttempts: 0,
    maxAttemptsReached: false,
    success: null,
    isAuthenticated: true
  },
  user: {
    error: null,
    success: null
  }
};