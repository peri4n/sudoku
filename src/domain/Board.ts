type Grid = number[][]

export class Board {

    private static readonly DIM = 9

    private readonly grid: Grid;

    constructor(grid: Grid) {
        this.grid = grid
    }

    private static emptyGrid: Grid = [[], [], [], [], [], [], [], [], []]

    at(row: number, col: number): number {
        return this.grid[row][col]
    }

    set(row: number, col: number, n: number): Board {
        const copy = this.grid.map(c => c.slice())
        copy[row][col] = n
        return new Board(copy)
    }

    static empty(): Board {
        return new Board(Board.emptyGrid)
    }

    isFinished(): boolean {
        for (let i = 0; i < Board.DIM; i++) {
            for (let j = 0; j < Board.DIM; j++) {
                if (this.grid[i][j] === undefined) {
                    return false
                }
            }
        }
        return true;
    }

}
