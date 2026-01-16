const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('auth_token');
};

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getAuthToken();
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options?.headers,
  };

  // Add authorization header if token exists
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    // Handle 401 Unauthorized - token might be expired
    if (response.status === 401) {
      // Clear auth data and redirect to login
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new ApiError(response.status, error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Catalog
  getCatalog: (params?: { lang?: string; include_counts?: string; active_only?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    if (params?.include_counts) queryParams.append('include_counts', params.include_counts);
    if (params?.active_only) queryParams.append('active_only', params.active_only);
    const query = queryParams.toString();
    return fetchApi<{ categories: any[] }>(`/catalog${query ? `?${query}` : ''}`);
  },

  getCategoryBySlug: (slug: string, params?: { lang?: string; include_children?: string; include_texts?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    if (params?.include_children) queryParams.append('include_children', params.include_children);
    if (params?.include_texts) queryParams.append('include_texts', params.include_texts);
    const query = queryParams.toString();
    return fetchApi<any>(`/catalog/${slug}${query ? `?${query}` : ''}`);
  },

  // News
  getNews: (params?: { page?: number; limit?: number; lang?: string; sort?: string; order?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.lang) queryParams.append('lang', params.lang);
    if (params?.sort) queryParams.append('sort', params.sort);
    if (params?.order) queryParams.append('order', params.order);
    const query = queryParams.toString();
    return fetchApi<{ news: any[]; pagination: any }>(`/news${query ? `?${query}` : ''}`);
  },

  getNewsById: (id: string, params?: { lang?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    const query = queryParams.toString();
    return fetchApi<any>(`/news/${id}${query ? `?${query}` : ''}`);
  },

  createNews: (data: any) => {
    return fetchApi<any>('/news', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateNews: (id: string, data: any) => {
    return fetchApi<any>(`/news/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteNews: (id: string) => {
    return fetchApi<void>(`/news/${id}`, {
      method: 'DELETE',
    });
  },

  // Timeline
  getTimelinePeriods: (params?: { lang?: string; include_events?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    if (params?.include_events) queryParams.append('include_events', params.include_events);
    const query = queryParams.toString();
    return fetchApi<{ periods: any[] }>(`/timeline/periods${query ? `?${query}` : ''}`);
  },

  getTimelineEvents: (params?: { period_id?: string; category?: string; lang?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.period_id) queryParams.append('period_id', params.period_id);
    if (params?.category) queryParams.append('category', params.category);
    if (params?.lang) queryParams.append('lang', params.lang);
    const query = queryParams.toString();
    return fetchApi<{ events: any[] }>(`/timeline/events${query ? `?${query}` : ''}`);
  },

  // Editions
  getEditions: (params?: { is_active?: string; lang?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.is_active) queryParams.append('is_active', params.is_active);
    if (params?.lang) queryParams.append('lang', params.lang);
    const query = queryParams.toString();
    return fetchApi<{ editions: any[] }>(`/editions${query ? `?${query}` : ''}`);
  },

  getEditionById: (id: string, params?: { lang?: string; include_texts?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.lang) queryParams.append('lang', params.lang);
    if (params?.include_texts) queryParams.append('include_texts', params.include_texts);
    const query = queryParams.toString();
    return fetchApi<any>(`/editions/${id}${query ? `?${query}` : ''}`);
  },

  // Karchag - Main Categories
  getKarchagMainCategories: (params?: { is_active?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.is_active) queryParams.append('is_active', params.is_active);
    const query = queryParams.toString();
    return fetchApi<{ categories: any[] }>(`/karchag/main-categories${query ? `?${query}` : ''}`);
  },

  getKarchagMainCategoryById: (id: string) => {
    return fetchApi<any>(`/karchag/main-categories/${id}`);
  },

  createKarchagMainCategory: (data: any) => {
    return fetchApi<any>('/karchag/main-categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateKarchagMainCategory: (id: string, data: any) => {
    return fetchApi<any>(`/karchag/main-categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteKarchagMainCategory: (id: string) => {
    return fetchApi<void>(`/karchag/main-categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Karchag - Sub Categories
  getKarchagSubCategories: (params?: { main_category_id?: string; is_active?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.main_category_id) queryParams.append('main_category_id', params.main_category_id);
    if (params?.is_active) queryParams.append('is_active', params.is_active);
    const query = queryParams.toString();
    return fetchApi<{ categories: any[] }>(`/karchag/sub-categories${query ? `?${query}` : ''}`);
  },

  getKarchagSubCategoryById: (id: string) => {
    return fetchApi<any>(`/karchag/sub-categories/${id}`);
  },

  createKarchagSubCategory: (data: any) => {
    return fetchApi<any>('/karchag/sub-categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateKarchagSubCategory: (id: string, data: any) => {
    return fetchApi<any>(`/karchag/sub-categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteKarchagSubCategory: (id: string) => {
    return fetchApi<void>(`/karchag/sub-categories/${id}`, {
      method: 'DELETE',
    });
  },

  // Karchag - Texts
  getKarchagTexts: (params?: { sub_category_id?: string; is_active?: string }) => {
    const queryParams = new URLSearchParams();
    if (params?.sub_category_id) queryParams.append('sub_category_id', params.sub_category_id);
    if (params?.is_active) queryParams.append('is_active', params.is_active);
    const query = queryParams.toString();
    return fetchApi<{ texts: any[] }>(`/karchag/texts${query ? `?${query}` : ''}`);
  },

  getKarchagTextById: (id: string) => {
    return fetchApi<any>(`/karchag/texts/${id}`);
  },

  createKarchagText: (data: any) => {
    return fetchApi<any>('/karchag/texts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  updateKarchagText: (id: string, data: any) => {
    return fetchApi<any>(`/karchag/texts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  deleteKarchagText: (id: string) => {
    return fetchApi<void>(`/karchag/texts/${id}`, {
      method: 'DELETE',
    });
  },
};

export { ApiError };
export default api;
