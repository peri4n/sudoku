import {Constraints} from "../Constraints";
import {Either} from "fp-ts/lib/Either";

export interface Rule {

    evaluate(constraints: Constraints): Either<String, Constraints>

}

