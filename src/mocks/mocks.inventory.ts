import sandbox from "./sandbox"
import * as inventory from "../models/inventory"

export const searchResponse = [
    {
        "_id": "1",
        "name": "3/8'' Socket",
        "description": "For 3/8'' Drive (Short)",
        "quantity": 1,
        "subSystem": "",
        "system": "Mechanical",
        "location": "Tool Chest Top",
        "img": "",
        "lastUpdated": "2020-11-22T16:22:04.836Z"
    },
    {
        "_id": "2",
        "name": "13/16'' Socket ",
        "description": "For 3/8'' Drive (Long)",
        "quantity": 2,
        "subSystem": "",
        "system": "Mechanical",
        "location": "Tool Chest Top",
        "img": "",
        "lastUpdated": "2020-11-22T16:22:04.826Z"
    }
]

export function search() {
    return sandbox.stub(inventory, "search").returns(Promise.resolve({ results: searchResponse, totalPages: 1 }))
}

export function findOne() {
    return sandbox.stub(inventory, "findOne").returns(Promise.resolve(searchResponse[0]))
}

export function edit() {
    return sandbox.stub(inventory, "edit").returns(Promise.resolve({
        success: true,
        message: "success"
    }))
}
