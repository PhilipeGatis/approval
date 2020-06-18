/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RightMenuMutationVariables = {
    approvalId: string;
    approved: boolean;
};
export type RightMenuMutationResponse = {
    readonly approve: {
        readonly id: string;
        readonly isApproved: boolean;
    };
};
export type RightMenuMutation = {
    readonly response: RightMenuMutationResponse;
    readonly variables: RightMenuMutationVariables;
};



/*
mutation RightMenuMutation(
  $approvalId: String!
  $approved: Boolean!
) {
  approve(approved: {approvalId: $approvalId, approved: $approved}) {
    id
    isApproved
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "approvalId",
            "type": "String!"
        } as any),
        ({
            "defaultValue": null,
            "kind": "LocalArgument",
            "name": "approved",
            "type": "Boolean!"
        } as any)
    ], v1 = [
        ({
            "alias": null,
            "args": [
                {
                    "fields": [
                        {
                            "kind": "Variable",
                            "name": "approvalId",
                            "variableName": "approvalId"
                        },
                        {
                            "kind": "Variable",
                            "name": "approved",
                            "variableName": "approved"
                        }
                    ],
                    "kind": "ObjectValue",
                    "name": "approved"
                }
            ],
            "concreteType": "Approver",
            "kind": "LinkedField",
            "name": "approve",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isApproved",
                    "storageKey": null
                }
            ],
            "storageKey": null
        } as any)
    ];
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "RightMenuMutation",
            "selections": (v1 /*: any*/),
            "type": "Mutation"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "RightMenuMutation",
            "selections": (v1 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "RightMenuMutation",
            "operationKind": "mutation",
            "text": "mutation RightMenuMutation(\n  $approvalId: String!\n  $approved: Boolean!\n) {\n  approve(approved: {approvalId: $approvalId, approved: $approved}) {\n    id\n    isApproved\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '2a4c28817de9e6a84d374e0340901ef4';
export default node;
