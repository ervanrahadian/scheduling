import { getAxiosInstance } from ".";

export const getPublishedShifts = async (query: any) => {
  const api = getAxiosInstance();
  const { data } = await api.get(`/published-shift?${query}`);

  return data;
};

export const getPublishedShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.get(`/published-shift/${id}`);
  return data;
};

export const createPublishedShifts = async (payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.post("/published-shift", payload);
  return data;
};

export const updatePublishedShiftById = async (id: string, payload: any) => {
  const api = getAxiosInstance();
  const { data } = await api.patch(`/published-shift/${id}`, payload);
  return data;
};

export const deletePublishedShiftById = async (id: string) => {
  const api = getAxiosInstance();
  const { data } = await api.delete(`/published-shift/${id}`);
  return data;
};
