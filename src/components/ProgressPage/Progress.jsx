import AccordionItem from "./AccordionItem";
import {getUnit} from "../../unitData";
import {getProgress} from "../../ProgressDummyData";
import './Progress.css'

function getAccuracy(correct, total) {
    return (total > 0) ? Math.round((correct / total) * 100) : 0
}

function getUnitData(unitNum) {
    let unitName = getUnit(unitNum).name
    let progress = getProgress(unitNum)
    let correct = progress[0]
    let total = progress[1]

    let rlgl = 'Red Light Green Light: \n' + correct.rlgl + ' Correct; ' + getAccuracy(correct.rlgl, total.rlgl) + '% Accuracy'
    let tug = '\n Tug of War Correct: \n' + correct.tug + ' Correct; ' + getAccuracy(correct.tug, total.tug) + '% Accuracy'
    let sugar = '\n Sugar Honeycombs: \n' + correct.sugar + ' Correct; ' + getAccuracy(correct.sugar, total.sugar) + '% Accuracy'

    return {
        unit: unitName,
        progress: rlgl + tug + sugar
    }
}

function Progress() {
    return(
        <div className='progress-container'>
            <div className='left-progress-section'>
                <div className='upper-progress-section'>
                    <span className='total-answers'>96</span>
                    <span>Correctly
                        Answered
                        Questions</span>
                    <span className='total-accuracy'>13</span>
                    <span>Accuracy</span>
                </div>
                <div className='chart-progress-section'>
                    <img src='../../SharedImages/backArrow.png' alt='something'></img>
                </div>
            </div>
            <div className='right-progress-section'>
                <ul className="accordion">
                    <li><AccordionItem results={getUnitData(1)}></AccordionItem></li>
                    <li><AccordionItem results={getUnitData(2)}></AccordionItem></li>
                    <li><AccordionItem results={getUnitData(3)}></AccordionItem></li>
                    <li><AccordionItem results={getUnitData(4)}></AccordionItem></li>
                    <li><AccordionItem results={getUnitData(5)}></AccordionItem></li>
                    <li><AccordionItem results={getUnitData(6)}></AccordionItem></li>
                </ul>
            </div>
        </div>
    )
}

export default Progress