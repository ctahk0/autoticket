export class TblPravilo {
    constructor(
        public id: number,
        public opis: string,
        public kvota1: number,
        public kvota2: number,
        public razlika: number
    ) { }
}

// export class TblTiket {
//     constructor(
//         public gameid: number,
//         public pocetak: Date,
//         public domacin: string,
//         public gost: string,
//         public tip: string,
//         public kvota: number,
//         public trenkvota: number,
//         public pravilo: string,
//         public razlika: number,
//         public profit: number
//     ) { }
// }
