import AccordionItem from "./AccordionItem";
import {getUnit} from "../../unitData";
import {getProgress} from "../../ProgressDummyData";
import {BarChart} from "./BarChart";
import Chart from "chart.js/auto";
import {CategoryScale} from "chart.js";
import './Progress.css'

Chart.register(CategoryScale);

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

function getTotalCorrectQuestions() {
    let total = 0
    for (let i = 0; i < 6; i++) {
        let progress = getProgress(i + 1)
        total += progress[0].rlgl + progress[0].tug + progress[0].sugar
    }
    return total
}

function getTotalQuestions() {
    let total = 0
    for (let i = 0; i < 6; i++) {
        let progress = getProgress(i + 1)
        total += progress[1].rlgl + progress[1].tug + progress[1].sugar
    }
    return total
}

function getTotalAccuracy() {
    return Math.round(getTotalCorrectQuestions() / getTotalQuestions() * 100)
}

function getChartData() {
    let rlgl_data = []
    let tug_data = []
    let sugar_data = []
    for (let i = 0; i < 6; i++) {
        let correct = getProgress(i + 1)[0]
        rlgl_data.push(correct.rlgl)
        tug_data.push(correct.tug)
        sugar_data.push(correct.sugar)
    }
    return {
        labels: ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5', 'Unit 6'],
        datasets: [
            {
                label: 'Red Light Green Light',
                data: rlgl_data,
                color: '#FF0000',
                stack: 'Game 1'
            },
            {
                label: 'Tug of War',
                data: tug_data,
                color: '#0000FF',
                stack: 'Game 2'
            },
            {
                label: 'Sugar Honeycomb',
                data: sugar_data,
                color: '#00FF00',
                stack: 'Game 3'
            }
        ]
    }
}


function Progress() {
    return(
        <div className='progress-container'>
            <div className='left-progress-section'>
                <article className='upper-progress-section'>
                    <span className='total-answers'> {getTotalQuestions()} </span>
                    <span className='total-text'>Correctly
                        Answered
                        Questions</span>
                    <span className='total-accuracy'> {getTotalAccuracy()}% </span>
                    <span className='accuracy-text'>Accuracy</span>
                </article>
                <div className='chart-progress-section'>
                    <BarChart chartData={getChartData()}></BarChart>
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