// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// Get stored token
const getToken = () => {
    return localStorage.getItem('authToken');
};

// Set token
const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Remove token
const removeToken = () => {
    localStorage.removeItem('authToken');
};

// Get current user
const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

// Set current user
const setCurrentUser = (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
};

// Remove current user
const removeCurrentUser = () => {
    localStorage.removeItem('currentUser');
};

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
    const token = getToken();
    
    const config = {
        method: options.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        }
    };

    if (options.body) {
        config.body = JSON.stringify(options.body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }

        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Authentication API
const authAPI = {
    register: async (email, password, name) => {
        const data = await apiRequest('/auth/register', {
            method: 'POST',
            body: { email, password, name }
        });
        if (data.token) {
            setToken(data.token);
            setCurrentUser(data.user);
        }
        return data;
    },

    login: async (email, password) => {
        const data = await apiRequest('/auth/login', {
            method: 'POST',
            body: { email, password }
        });
        if (data.token) {
            setToken(data.token);
            setCurrentUser(data.user);
        }
        return data;
    },

    logout: () => {
        removeToken();
        removeCurrentUser();
    },

    getProfile: async () => {
        return await apiRequest('/auth/profile');
    },

    isAuthenticated: () => {
        return !!getToken();
    }
};

// Products API
const productsAPI = {
    getAll: async (params = {}) => {
        const queryString = new URLSearchParams(params).toString();
        return await apiRequest(`/products${queryString ? '?' + queryString : ''}`);
    },

    getById: async (id) => {
        return await apiRequest(`/products/${id}`);
    },

    getByCategory: async (category) => {
        return await apiRequest(`/products/category/${category}`);
    },

    create: async (productData) => {
        return await apiRequest('/products', {
            method: 'POST',
            body: productData
        });
    },

    update: async (id, productData) => {
        return await apiRequest(`/products/${id}`, {
            method: 'PUT',
            body: productData
        });
    },

    delete: async (id) => {
        return await apiRequest(`/products/${id}`, {
            method: 'DELETE'
        });
    }
};

// Cart API
const cartAPI = {
    get: async () => {
        return await apiRequest('/cart');
    },

    add: async (productId, quantity = 1) => {
        return await apiRequest('/cart', {
            method: 'POST',
            body: { productId, quantity }
        });
    },

    update: async (cartId, quantity) => {
        return await apiRequest(`/cart/${cartId}`, {
            method: 'PUT',
            body: { quantity }
        });
    },

    remove: async (cartId) => {
        return await apiRequest(`/cart/${cartId}`, {
            method: 'DELETE'
        });
    },

    clear: async () => {
        return await apiRequest('/cart', {
            method: 'DELETE'
        });
    }
};

// Orders API
const ordersAPI = {
    create: async () => {
        return await apiRequest('/orders', {
            method: 'POST'
        });
    },

    getAll: async () => {
        return await apiRequest('/orders');
    },

    getById: async (orderId) => {
        return await apiRequest(`/orders/${orderId}`);
    },

    updateStatus: async (orderId, status) => {
        return await apiRequest(`/orders/${orderId}/status`, {
            method: 'PATCH',
            body: { status }
        });
    }
};

// Export API modules
window.API = {
    auth: authAPI,
    products: productsAPI,
    cart: cartAPI,
    orders: ordersAPI,
    getCurrentUser,
    getToken
};
