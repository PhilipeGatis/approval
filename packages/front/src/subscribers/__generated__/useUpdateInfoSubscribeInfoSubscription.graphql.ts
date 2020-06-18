/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type useUpdateInfoSubscribeInfoSubscriptionVariables = {
    approvalId: string;
};
export type useUpdateInfoSubscribeInfoSubscriptionResponse = {
    readonly updateInfoSubscription: {
        readonly approval: {
            readonly id: string;
            readonly dueDate: string;
        } | null;
        readonly approvers: ReadonlyArray<{
            readonly id: string;
            readonly isApproved: boolean;
        }> | null;
        readonly assets: ReadonlyArray<{
            readonly id: string;
            readonly asset: string;
            readonly assetUrl: string;
        }> | null;
        readonly notes: ReadonlyArray<{
            readonly id: string;
            readonly markup: unknown;
            readonly text: string;
            readonly createdAt: unknown;
            readonly createdBy: string;
        }> | null;
        readonly comments: ReadonlyArray<{
            readonly id: string;
            readonly note: {
                readonly id: string;
            };
            readonly text: string;
            readonly createdBy: string;
        }> | null;
    };
};
export type useUpdateInfoSubscribeInfoSubscription = {
    readonly response: useUpdateInfoSubscribeInfoSubscriptionResponse;
    readonly variables: useUpdateInfoSubscribeInfoSubscriptionVariables;
};



/*
subscription useUpdateInfoSubscribeInfoSubscription(
  $approvalId: String!
) {
  updateInfoSubscription(approvalId: $approvalId) {
    approval {
      id
      dueDate
    }
    approvers {
      id
      isApproved
    }
    assets {
      id
      asset
      assetUrl
    }
    notes {
      id
      markup
      text
      createdAt
      createdBy
    }
    comments {
      id
      note {
        id
      }
      text
      createdBy
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
    ], v1 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
    } as any), v2 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
    } as any), v3 = ({
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "createdBy",
        "storageKey": null
    } as any), v4 = [
        ({
            "alias": null,
            "args": [
                {
                    "kind": "Variable",
                    "name": "approvalId",
                    "variableName": "approvalId"
                }
            ],
            "concreteType": "UpdateInfo",
            "kind": "LinkedField",
            "name": "updateInfoSubscription",
            "plural": false,
            "selections": [
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Approval",
                    "kind": "LinkedField",
                    "name": "approval",
                    "plural": false,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "dueDate",
                            "storageKey": null
                        }
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
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isApproved",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Asset",
                    "kind": "LinkedField",
                    "name": "assets",
                    "plural": true,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "asset",
                            "storageKey": null
                        },
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assetUrl",
                            "storageKey": null
                        }
                    ],
                    "storageKey": null
                },
                {
                    "alias": null,
                    "args": null,
                    "concreteType": "Note",
                    "kind": "LinkedField",
                    "name": "notes",
                    "plural": true,
                    "selections": [
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "markup",
                            "storageKey": null
                        },
                        (v2 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                        },
                        (v3 /*: any*/)
                    ],
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
                        (v1 /*: any*/),
                        {
                            "alias": null,
                            "args": null,
                            "concreteType": "Note",
                            "kind": "LinkedField",
                            "name": "note",
                            "plural": false,
                            "selections": [
                                (v1 /*: any*/)
                            ],
                            "storageKey": null
                        },
                        (v2 /*: any*/),
                        (v3 /*: any*/)
                    ],
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
            "name": "useUpdateInfoSubscribeInfoSubscription",
            "selections": (v4 /*: any*/),
            "type": "Subscription"
        },
        "kind": "Request",
        "operation": {
            "argumentDefinitions": (v0 /*: any*/),
            "kind": "Operation",
            "name": "useUpdateInfoSubscribeInfoSubscription",
            "selections": (v4 /*: any*/)
        },
        "params": {
            "id": null,
            "metadata": {},
            "name": "useUpdateInfoSubscribeInfoSubscription",
            "operationKind": "subscription",
            "text": "subscription useUpdateInfoSubscribeInfoSubscription(\n  $approvalId: String!\n) {\n  updateInfoSubscription(approvalId: $approvalId) {\n    approval {\n      id\n      dueDate\n    }\n    approvers {\n      id\n      isApproved\n    }\n    assets {\n      id\n      asset\n      assetUrl\n    }\n    notes {\n      id\n      markup\n      text\n      createdAt\n      createdBy\n    }\n    comments {\n      id\n      note {\n        id\n      }\n      text\n      createdBy\n    }\n  }\n}\n"
        }
    } as any;
})();
(node as any).hash = 'a719f051361c6a2d4d5b773233bbcbae';
export default node;
