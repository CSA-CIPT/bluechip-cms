export class QuestionGroup {
    constructor(
        public id: number,
        public title: string
    ) {}
}

export class HelpQuestionAnswer {
    constructor(
        public groupId: number,
        public title: string,
        public contents: QuestionAnswer[]
    ) {}

}

export class CreateHelpQuestionAnswer{
    constructor(
        public id: number,
        public question: string,
    ) {}
}

export class QuestionAnswer {
    constructor(
        public questionGroupId: number,
        public questionId: number,
        public question: string,
        public answer: string,
        public type: string
    ){}
}
