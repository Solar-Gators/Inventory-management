import axios from './libs/axios'

/**
 * Runs a search for a particular page and query
 * 
 * @param {string} query search query 
 * @param {string} page page number
 */
export function search(query, page) {
    return axios.get('/api/inventory/search', {
        params: {
            search: query,
            pageNumber: page
        }
    })
}

/**
 * Finds inventory by and id
 * 
 * @param {string | number} id 
 */
export function findOne(id) {
    return axios.get('/api/inventory', {
        params: {
            id: id
        }
    })
}

/**
 * Creates inventory items
 * 
 * @param {string[]} inventory 
 */
export function create(inventory) {
    return axios.post('/api/inventory', {
        inventory: inventory
    })
}
