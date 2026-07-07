import { api } from "@/service/api";
import { create } from "zustand";

export type SchoolStatus = {
  ACTIVE: "ACTIVE";
  INACTIVE: "INACTIVE";
};

export const SCHOOL_STATUS: SchoolStatus = {
  ACTIVE: "ACTIVE",
  INACTIVE: "INACTIVE",
};

export type School = {
  id: string;
  name: string;
  inn: string;
  phone_number: string;
  email: string;
  region_id: number;
  district_id: number;
  address: string;
  max_students_limit: number;
  sport_types: number[];
  status: keyof SchoolStatus;
  createdAt: string;
  updatedAt: string;
};

export type CreateSchool = {
  name: string;
  inn: string;
  phone_number: string;
  email: string;
  region_id: number;
  district_id: number;
  address: string;
  max_students_limit: number;
  sport_types: number[];
};

export type UpdateSchool = Partial<CreateSchool>;

export type SchoolFilter = {
  page?: number;
  limit?: number;
  search?: string;
  status?: keyof SchoolStatus;
  region_id?: number;
  district_id?: number;
  sort?: string;
  order?: "asc" | "desc";
};

type SchoolsStore = {
  schools: School[];
  school: School | null;

  total: number;
  page: number;
  limit: number;

  loading: boolean;
  error: string | null;

  filters: SchoolFilter;

  setFilters: (filters: Partial<SchoolFilter>) => void;

  resetFilters: () => void;

  getSchools: (filters?: SchoolFilter) => Promise<void>;

  getSchool: (id: string) => Promise<void>;

  createSchool: (data: CreateSchool) => Promise<boolean>;

  updateSchool: (id: string, data: UpdateSchool) => Promise<boolean>;

  deleteSchool: (id: string) => Promise<boolean>;

  clearSchool: () => void;
};

export const useSchoolsStore = create<SchoolsStore>((set, get) => ({
  schools: [],
  school: null,

  total: 0,
  page: 1,
  limit: 10,

  loading: false,
  error: null,

  filters: {
    page: 1,
    limit: 10,
    search: "",
    status: undefined,
    region_id: undefined,
    district_id: undefined,
    sort: "createdAt",
    order: "asc",
  },

  setFilters: (filters) =>
    set((state) => ({
      filters: {
        ...state.filters,
        ...filters,
      },
    })),

  resetFilters: () =>
    set({
      filters: {
        page: 1,
        limit: 10,
        search: "",
        status: undefined,
        region_id: undefined,
        district_id: undefined,
        sort: "createdAt",
        order: "asc",
      },
    }),

  getSchools: async (newFilters) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const filters = newFilters ?? get().filters;

      const res = await api.get("/schools", {
        params: filters,
      });

      const response = res.data.data;

      set({
        schools: response.list,
        total: response.total,
        page: response.page,
        limit: response.limit,
      });
    } catch (error: unknown) {
      let message = "Schools yuklanmadi";

      if (error instanceof Error) {
        message = error.message;
      }

      set({
        error: message,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  getSchool: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      const res = await api.get(`/schools/${id}`);

      set({
        school: res.data.data,
      });
    } catch (error: unknown) {
      let message = "Schools Topilmadi";

      if (api.defaults && error instanceof Error) {
        message = error.message;
      }

      set({
        error: message,
      });
    } finally {
      set({
        loading: false,
      });
    }
  },

  createSchool: async (data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await api.post("/schools", data);

      await get().getSchools();

      return true;
    } catch (error: unknown) {
      let message = "School yaratilmadi";

      if (error instanceof Error) {
        message = error.message;
      }

      set({
        error: message,
      });

      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },

  updateSchool: async (id, data) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await api.patch(`/schools/${id}`, data);

      await get().getSchools();

      return true;
    } catch (error: unknown) {
      let message = "School yangilanmadi";

      if (error instanceof Error) {
        message = error.message;
      }

      set({
        error: message,
      });

      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },

  deleteSchool: async (id) => {
    try {
      set({
        loading: true,
        error: null,
      });

      await api.delete(`/schools/${id}`);

      await get().getSchools();

      return true;
    } catch (error: unknown) {
      let message = "School o'chirilmadi";

      if (error instanceof Error) {
        message = error.message;
      }

      set({
        error: message,
      });

      return false;
    } finally {
      set({
        loading: false,
      });
    }
  },

  clearSchool: () =>
    set({
      school: null,
    }),
}));
