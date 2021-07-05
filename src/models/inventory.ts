import axios from './libs/axios'


export interface InventoryFields {
    "name": string,
    "description": string,
    "quantity": number,
    "subSystem": string,
    "system": string,
    "location": string,
    "lastUpdated": string,
    "img": string
}

export interface InventoryItem extends InventoryFields {
    "_id": string,
}

/**
 * Runs a search for a particular page and query
 * 
 * @param {string} query search query 
 * @param {string} page page number
 */
export function search(query, page): Promise<InventoryItem[]> {
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
export function findOne(id): Promise<InventoryItem> {
    return axios.get('/api/inventory', {
        params: {
            id: id
        }
    })
}

/**
 * Creates inventory items
 * 
 * @param {InventoryFields[]} inventory 
 */
export function create(inventory: InventoryFields[]) {
    return axios.post('/api/inventory', {
        inventory: inventory
    })
}

/**
 * Edits an inventory item
 * 
 * @param {InventoryItem} inventory 
 */
export function edit(inventory: InventoryItem): Promise<{ message: string, valid: boolean }> {
    return axios.put('/api/inventory', {
        inventory: inventory
    })
}
