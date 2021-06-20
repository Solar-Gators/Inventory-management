import React from 'react'

export default function ResultsFooter({ total, current, selectPage }) {

    //Prevent a new page from being selected twice selecting twice 
    let resultRefreshing = false
    let raceConditionSelectPage = (selected) => {
        console.log(resultRefreshing, "SELECTING") 
        if (!resultRefreshing) {
            resultRefreshing = true
            selectPage(selected)
        }
    }


    let footer = [
        <i
            onClick={() => { if (current !== 0) raceConditionSelectPage(current - 1)} }
            className={`fas fa-arrow-left pr-3 ${ current !== 0 ? 'result-footer-selected' : ''}`} />
    ]

    //in case the inventory happen to be updated
    if (current > total) {
        current = total
    }

    let loopTotal = total
    let totalOffset = 0

    //handle shifting of numbers for large page count
    if (total > 5) {
        loopTotal = 5

        if (current > 3) {
            //if the remaining pages are less than 3
            totalOffset = total - current <= 3
                ? total - 5 //set the offset to the last 5 pages
                : current - 2 //otherwise shift by 2
        }
    }

    //create number range
    for (let i = 0; i < loopTotal; i++) {
        let currentIndex = totalOffset + i
        footer.push(
            <span
                onClick={() => raceConditionSelectPage(currentIndex)}
                className={`px-2 ${currentIndex !== current ? 'result-footer-to-select' : 'result-footer-selected'}`} style={{fontSize: '20px'}}>
                {currentIndex + 1}
            </span>
        )
    }
    footer.push(
        <i
            onClick={() => { if (current !== total - 1) raceConditionSelectPage(current + 1)}}
            className={`fas fa-arrow-right pl-3 pb-4 ${ current !== total - 1 ? 'result-footer-to-select' : 'result-footer-selected'}`}></i>
    )

    return <React.Fragment>
        {footer}
    </React.Fragment>

}
