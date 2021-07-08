import React from 'react'
import SearchInventory from '../components/Results/SearchInventory'

export default function SearchResults(props) {
    return <SearchInventory search={props.match.params.search ?? ""} />
}
