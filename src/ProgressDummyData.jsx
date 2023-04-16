const DummyProgress = {
    1: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
    2: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
    3: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
    4: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
    5: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
    6: [
        { //correct answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        },
        { //total answers
            rlgl: 0,
            tug: 0,
            sugar: 0
        }
    ],
};

export function getProgress(unitNumber) {
    return DummyProgress[unitNumber];
}