export class QuestionGroup {
    constructor(
        public id: number,
        public title: string
    ) {}
}

export class HelpQuestionAnswer {
    constructor(
        public title: string,
        public contents: QuestionAnswer[]
    ) {}

}

export class QuestionAnswer {
    constructor(
        public questionId: number,
        public question: string,
        public answer: string,
        public type: string
    ){}
}
