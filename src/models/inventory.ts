import axios from './libs/axios'


export interface InventoryFields {
    "name": string,
    "description": string,
    "quantity": number,
    "subSystem": string,
    "system": string,
    "location": string,
    "image": string
}

export interface InventoryItem extends InventoryFields {
    "_id": string,
    "lastUpdated": string
}

/**
 * Runs a search for a particular page and query
 * 
 * @param {string} query search query 
 * @param {string} page page number
 */
export function search(query, page): Promise<{ results: InventoryItem[], totalPages: number }> {
    return axios.get('/api/inventory/search', {
        params: {
            search: query,
            pageNumber: page
        }
    }).then((response) => response.data)
}

/**
 * Finds inventory by and id
 * 
 * @param {string | number} id 
 */
export function findOne(id): Promise<InventoryItem> {
    return axios.get('/api/inventory', {
        params: {
            id: id
        }
    }).then((response) => response.data)
}

/**
 * Creates inventory items
 * 
 * @param {InventoryFields[]} inventory 
 */
export function create(inventory: InventoryFields[]) {
    return axios.post('/api/inventory', {
        inventory: inventory
    }).then((response) => response.data)
}

/**
 * Edits an inventory item
 * 
 * @param {InventoryItem} inventory 
 */
export function edit(inventory: InventoryItem): Promise<{ message: string, success: boolean }> {
    return axios.put('/api/inventory', {
        inventory: inventory
    }).then((response) => response.data)
}

/**
 * Removes an inventory item
 * 
 * @param {string} id 
 */
export function remove(id: string) {
    return axios.delete('/api/inventory', {
        data: {
            id: id
        }
    }).then((response) => response.data)
}
