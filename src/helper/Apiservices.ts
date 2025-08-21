const baseUrl = 'http://10.254.202.144:3000/api/';

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
