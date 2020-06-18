/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ToolQueryVariables = {
    approvalId: string;
};
export type ToolQueryResponse = {
    readonly approval: {
        readonly id: string;
        readonly dueDate: string;
        readonly isCanApprove: boolean;
        readonly assets: ReadonlyArray<{
            readonly assetUrl: string;
            readonly asset: string;
        }> | null;
        readonly approvers: ReadonlyArray<{
            readonly name: string;
            readonly isApproved: boolean;
        }> | null;
        readonly notes: ReadonlyArray<{
            readonly id: string;
            readonly createdBy: string;
            readonly comments: ReadonlyArray<{
                readonly id: string;
                readonly text: string;
            }> | null;
        }> | null;
    } | null;
};
export type ToolQuery = {
    readonly response: ToolQueryResponse;
    readonly variables: ToolQueryVariables;
};



/*
query ToolQuery(
  $approvalId: String!
) {
  approval(approvalId: $approvalId) {
    id
    dueDate
    isCanApprove
    assets {
      assetUrl
      asset
      id
    }
    approvers {
      name
      isApproved
      id
    }
    notes {
      id
      createdBy
      comments {
        id
        text
      }
    }
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
        } as any)
    ], v1 = [
        ({
            "kind": "Variable",
            "name": "approvalId",
            "variableName": "approvalId"
        } as any)
    ], v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "dueDate",
        "storageKey": null
    } as any), v4 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isCanApprove",
        "storageKey": null
    } as any), v5 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "assetUrl",
        "storageKey": null
    } as any), v6 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "asset",
        "storageKey": null
    } as any), v7 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
    } as any), v8 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isApproved",
        "storageKey": null
    } as any), v9 = ({
        "alias": null,
        "args": null,
        "concreteType": "Note",
        "kind": "LinkedField",
        "name": "notes",
        "plural": true,
        "selections": [
            (v2 /*: any*/),
            {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "createdBy",
                "storageKey": null
            },
            {
                "alias": null,
                "args": null,
                "concreteType": "Comment",
                "kind": "LinkedField",
                "name": "comments",
                "plural": true,
                "selections": [
                    (v2 /*: any*/),
                    {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                    }
                ],
                "storageKey": null
            }
        ],
        "storageKey": null
    } as any);
    return {
        "fragment": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Fragment",
            "metadata": null,
            "name": "ToolQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Approval",
                    "kind": "LinkedField",
                    "name": "approval",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        (v3 /*: any*/),
                        (v4 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Asset",
                            "kind": "LinkedField",
                            "name": "assets",
                            "plural": true,
                            "selections": [
                                (v5 /*: any*/),
                                (v6 /*: any*/)
                            ],
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Approver",
                            "kind": "LinkedField",
                            "name": "approvers",
                            "plural": true,
                            "selections": [
                                (v7 /*: any*/),
                                (v8 /*: any*/)
                            ],
                            "storageKey": null
                        },
                        (v9 /*: any*/)
                    ],
                    "storageKey": null
                }
            ],
            "type": "Query"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "ToolQuery",
            "selections": [
                {
                    "alias": null,
                    "args": (v1 /*: any*/),
                    "concreteType": "Approval",
                    "kind": "LinkedField",
                    "name": "approval",
                    "plural": false,
                    "selections": [
                        (v2 /*: any*/),
                        (v3 /*: any*/),
                        (v4 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Asset",
                            "kind": "LinkedField",
                            "name": "assets",
                            "plural": true,
                            "selections": [
                                (v5 /*: any*/),
                                (v6 /*: any*/),
                                (v2 /*: any*/)
                            ],
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Approver",
                            "kind": "LinkedField",
                            "name": "approvers",
                            "plural": true,
                            "selections": [
                                (v7 /*: any*/),
                                (v8 /*: any*/),
                                (v2 /*: any*/)
                            ],
                            "storageKey": null
                        },
                        (v9 /*: any*/)
                    ],
                    "storageKey": null
                }
            ]
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "ToolQuery",
            "operationKind": "query",
            "text": "query ToolQuery(\n  $approvalId: String!\n) {\n  approval(approvalId: $approvalId) {\n    id\n    dueDate\n    isCanApprove\n    assets {\n      assetUrl\n      asset\n      id\n    }\n    approvers {\n      name\n      isApproved\n      id\n    }\n    notes {\n      id\n      createdBy\n      comments {\n        id\n        text\n      }\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = '6768b4645b7d26ac773a43665f96879b';
export default node;
