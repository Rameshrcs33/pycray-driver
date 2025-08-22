const baseUrl = 'https://api-pycray-backend.onrender.com/api/';

export const URL = {
  getuser: (val: string) => {
    return baseUrl + 'users?role=' + val;
  },
  updateuser: () => {
    return baseUrl + 'users/fcm-token';
  },

  getride: () => {
    return baseUrl + 'booking';
  },

  updateride: (id: any) => {
    return baseUrl + `booking/${id}/updateride`;
  },
};
