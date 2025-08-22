const API_BASE_URL = 'https://students.netoservices.ru/fe-diplom';

function buildQuery(params = {}) {
    const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '');
    if (entries.length === 0) return '';
    const search = new URLSearchParams();
    for (const [key, value] of entries) {
        search.append(key, String(value));
    }
    return `?${search.toString()}`;
}

async function handleResponse(response) {
    if (!response.ok) {
        const text = await response.text().catch(() => '');
        throw new Error(text || `HTTP ${response.status}`);
    }
    return response.json();
}

// GET /routes/last
export async function getLastRoutes() {
    const res = await fetch(`${API_BASE_URL}/routes/last`, {
        method: 'GET'
    });
    return handleResponse(res);
}

// GET /routes
export async function searchRoutes(params = {}) {
    const res = await fetch(`${API_BASE_URL}/routes${buildQuery(params)}`, {
        method: 'GET'
    });
    return handleResponse(res);
}

// GET /routes/{id}/seats
export async function getRouteSeats(routeId, params = {}) {
    if (!routeId) throw new Error('routeId is required');
    const res = await fetch(`${API_BASE_URL}/routes/${routeId}/seats${buildQuery(params)}`, {
        method: 'GET'
    });
    return handleResponse(res);
}

// GET /routes/cities
export async function searchCities(name) {
    const res = await fetch(`${API_BASE_URL}/routes/cities${buildQuery({ name })}`, {
        method: 'GET'
    });
    return handleResponse(res);
}

// POST /order
export async function createOrder(payload) {
    const res = await fetch(`${API_BASE_URL}/order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    });
    return handleResponse(res);
}

// POST /subscribe (backend accepts POST and ignores params; keep email in query for spec compatibility)
export async function subscribe(email) {
    const res = await fetch(`${API_BASE_URL}/subscribe${buildQuery({ email })}`, {
        method: 'POST'
    });
    return handleResponse(res);
}

export default {
    getLastRoutes,
    searchRoutes,
    getRouteSeats,
    searchCities,
    createOrder,
    subscribe
};
